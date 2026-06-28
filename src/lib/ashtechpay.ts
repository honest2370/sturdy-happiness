// Ashtechpay Payment Integration Service
import { supabase } from './supabase';

const EDGE_FUNCTION_URL = 'https://gffzzhbvqorepaycpcqz.supabase.co/functions/v1';

export interface PaymentRequest {
  amount: number;
  currency: string;
  phone: string;
  operator: string;
  country_code: string;
  reference?: string;
  otp?: string;
  notify_url?: string;
}

export interface PaymentResponse {
  transaction_id: string;
  reference: string;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  credited_amount: number;
  fee_amount: number;
  currency: string;
  operator: string;
  phone: string;
  country_code: string;
  created_at: string;
  flow?: 'wave' | 'ussd_push' | 'otp_sms' | 'otp_ussd';
  wave_url?: string;
}

export interface OTPRequiredResponse {
  error: 'otp_required';
  message: string;
  ussd_code: string | null;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  operators: string[];
}

export interface FeeSchedule {
  country_code: string;
  country_name: string;
  currency: string;
  deposit_fee_pct: number;
  withdrawal_fee_pct: number;
  transfer_fee_pct: number;
  total_fee_pct: number;
}

class AshtechpayService {
  /**
   * Initiate a payment collection
   */
  async collectPayment(request: PaymentRequest): Promise<PaymentResponse | OTPRequiredResponse> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${EDGE_FUNCTION_URL}/ashtechpay-collect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (response.status === 400 && data.error === 'otp_required') {
        return data as OTPRequiredResponse;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Payment failed');
      }

      return data as PaymentResponse;
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  }

  /**
   * Get list of supported countries and operators
   */
  async getCountries(): Promise<Country[]> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${EDGE_FUNCTION_URL}/ashtechpay-countries`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }

  /**
   * Get fee schedule for all countries
   */
  async getFees(): Promise<FeeSchedule[]> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${EDGE_FUNCTION_URL}/ashtechpay-fees`, {
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch fees');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching fees:', error);
      throw error;
    }
  }

  /**
   * Check transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<PaymentResponse> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${EDGE_FUNCTION_URL}/ashtechpay-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ transaction_id: transactionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to check transaction status');
      }

      return await response.json();
    } catch (error) {
      console.error('Error checking transaction status:', error);
      throw error;
    }
  }

  /**
   * Calculate net amount after fees
   */
  calculateNetAmount(grossAmount: number, countryCode: string, fees: FeeSchedule[]): {
    gross: number;
    fee: number;
    net: number;
    fee_pct: number;
  } {
    const feeSchedule = fees.find(f => f.country_code === countryCode);
    
    if (!feeSchedule) {
      return {
        gross: grossAmount,
        fee: 0,
        net: grossAmount,
        fee_pct: 0,
      };
    }

    const feeAmount = Math.round(grossAmount * feeSchedule.total_fee_pct / 100);
    
    return {
      gross: grossAmount,
      fee: feeAmount,
      net: grossAmount - feeAmount,
      fee_pct: feeSchedule.total_fee_pct,
    };
  }

  /**
   * Detect payment flow type
   */
  detectPaymentFlow(response: PaymentResponse | OTPRequiredResponse): {
    type: 'wave' | 'ussd_push' | 'otp_sms' | 'otp_ussd';
    data?: any;
  } {
    if ('error' in response && response.error === 'otp_required') {
      if (response.ussd_code) {
        return { type: 'otp_ussd', data: { ussdCode: response.ussd_code } };
      }
      return { type: 'otp_sms' };
    }

    if ('flow' in response && response.flow === 'wave') {
      return { type: 'wave', data: { waveUrl: response.wave_url } };
    }

    return { type: 'ussd_push' };
  }
}

export const ashtechpay = new AshtechpayService();
