// Supabase Edge Function: Initiate Ashtechpay Payment
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ASHTECHPAY_API_URL = 'https://ashtechpay.top/v1';

serve(async (req) => {
  try {
    // CORS headers
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get API key from admin settings
    const { data: settings } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'ashtechpay_api_key')
      .single();

    const apiKey = settings?.value as string;
    if (!apiKey) {
      throw new Error('Ashtechpay API key not configured');
    }

    const body = await req.json();
    const {
      amount,
      currency,
      phone,
      operator,
      country_code,
      reference,
      otp,
      notify_url,
    } = body;

    // Make request to Ashtechpay
    const response = await fetch(`${ASHTECHPAY_API_URL}/collect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        phone,
        operator,
        country_code,
        reference,
        otp,
        notify_url: notify_url || `${Deno.env.get('SUPABASE_URL')}/functions/v1/ashtechpay-webhook`,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});
