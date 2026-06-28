// Supabase Edge Function: Handle Ashtechpay Webhooks
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const payload = await req.json();
    const {
      event,
      transaction_id,
      reference,
      amount,
      total_amount,
      currency,
      status,
    } = payload;

    console.log('Webhook received:', payload);

    if (event === 'payment.completed') {
      // Update order status
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({
          status: 'completed',
          ashtechpay_transaction_id: transaction_id,
          completed_at: new Date().toISOString(),
        })
        .eq('id', reference)
        .select('*, products(*)')
        .single();

      if (orderError) throw orderError;

      if (order) {
        // Create purchase record
        await supabase.from('purchases').insert({
          user_id: order.buyer_id,
          product_id: order.product_id,
          order_id: order.id,
          access_data: order.products.data,
        });

        // Update product purchase count
        await supabase.rpc('increment_product_purchases', {
          product_id: order.product_id,
        });

        // Send notification to buyer
        await supabase.from('notifications').insert({
          user_id: order.buyer_id,
          type: 'payment',
          title: 'Payment Confirmed',
          message: `Your payment for ${order.products.name} has been confirmed!`,
          data: { order_id: order.id, transaction_id },
        });

        // Send notification to seller
        await supabase.from('notifications').insert({
          user_id: order.products.seller_id,
          type: 'order',
          title: 'New Sale',
          message: `You received a new order for ${order.products.name}!`,
          data: { order_id: order.id, amount, currency },
        });
      }
    } else if (event === 'payment.failed') {
      // Update order status to failed
      await supabase
        .from('orders')
        .update({
          status: 'failed',
          ashtechpay_transaction_id: transaction_id,
        })
        .eq('id', reference);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
