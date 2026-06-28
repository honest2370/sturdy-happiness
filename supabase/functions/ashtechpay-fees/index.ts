// Supabase Edge Function: Get Ashtechpay Fees
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ASHTECHPAY_API_URL = 'https://ashtechpay.top/v1';

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: settings } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'ashtechpay_api_key')
      .single();

    const apiKey = settings?.value as string;

    const response = await fetch(`${ASHTECHPAY_API_URL}/fees`, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
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
