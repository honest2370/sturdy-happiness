# SELLIZI API Documentation

## Supabase Edge Functions

All Edge Functions are deployed to Supabase and accessed via:
```
https://gffzzhbvqorepaycpcqz.supabase.co/functions/v1/{function-name}
```

### Authentication

All requests require a valid Supabase session token in the Authorization header:
```
Authorization: Bearer YOUR_SESSION_TOKEN
```

---

## Payment Functions

### 1. Collect Payment

**Endpoint:** `POST /ashtechpay-collect`

Initiates a mobile money payment collection.

**Request Body:**
```json
{
  "amount": 5000,
  "currency": "XAF",
  "phone": "670000000",
  "operator": "MTN Mobile Money",
  "country_code": "CM",
  "reference": "ORDER-001",
  "otp": "123456",
  "notify_url": "https://yoursite.com/webhook"
}
```

**Success Response (202):**
```json
{
  "transaction_id": "8f3e1c2d-...",
  "reference": "ORDER-001",
  "status": "pending",
  "amount": 5000,
  "credited_amount": 4750,
  "fee_amount": 250,
  "currency": "XAF",
  "operator": "MTN Mobile Money",
  "phone": "670000000",
  "country_code": "CM",
  "created_at": "2026-03-15T14:00:00Z"
}
```

**OTP Required Response (400):**
```json
{
  "error": "otp_required",
  "message": "OTP required. Dial #144*82# to get your OTP code.",
  "ussd_code": "#144*82#"
}
```

**Wave Flow Response (202):**
```json
{
  "transaction_id": "8f3e1c2d-...",
  "flow": "wave",
  "wave_url": "https://wave.com/pay/...",
  "status": "pending"
}
```

---

### 2. Payment Webhook

**Endpoint:** `POST /ashtechpay-webhook`

Receives payment status updates from Ashtechpay (automatically configured).

**Webhook Payload:**
```json
{
  "event": "payment.completed",
  "transaction_id": "8f3e1c2d-...",
  "reference": "ORDER-001",
  "status": "completed",
  "amount": 4750,
  "total_amount": 5000,
  "currency": "XAF",
  "type": "deposit",
  "phone": "670000000",
  "timestamp": "2026-03-15T14:02:17.000Z"
}
```

**Events:**
- `payment.completed` - Payment successful
- `payment.failed` - Payment failed
- `payout.completed` - Withdrawal successful
- `payout.failed` - Withdrawal failed

---

### 3. Get Countries

**Endpoint:** `GET /ashtechpay-countries`

Retrieves list of supported countries and operators.

**Response:**
```json
[
  {
    "code": "CM",
    "name": "Cameroun",
    "currency": "XAF",
    "operators": ["MTN Mobile Money", "Orange Money"]
  },
  {
    "code": "SN",
    "name": "Senegal",
    "currency": "XOF",
    "operators": ["Free Money", "Orange Money", "Wave"]
  }
]
```

---

### 4. Get Fee Schedule

**Endpoint:** `GET /ashtechpay-fees`

Retrieves fee schedule for all supported countries.

**Response:**
```json
[
  {
    "country_code": "CM",
    "country_name": "Cameroun",
    "currency": "XAF",
    "deposit_fee_pct": 3.5,
    "withdrawal_fee_pct": 1.5,
    "transfer_fee_pct": 1.0,
    "total_fee_pct": 5.5
  }
]
```

---

### 5. Check Transaction Status

**Endpoint:** `POST /ashtechpay-status`

Checks the status of a transaction.

**Request Body:**
```json
{
  "transaction_id": "8f3e1c2d-..."
}
```

**Response:**
```json
{
  "transaction_id": "8f3e1c2d-...",
  "reference": "ORDER-001",
  "status": "success",
  "amount": 5000,
  "credited_amount": 4750,
  "fee_amount": 250,
  "currency": "XAF",
  "phone": "670000000",
  "created_at": "2026-03-15T14:00:00Z",
  "confirmed_at": "2026-03-15T14:02:17Z"
}
```

---

## Database Tables

### Profiles

User profile information.

**Columns:**
- `id` (UUID) - Primary key, references auth.users
- `email` (TEXT) - User email
- `full_name` (TEXT) - Full name
- `username` (TEXT) - Unique username
- `phone` (TEXT) - Phone number
- `country` (TEXT) - Country code
- `avatar_url` (TEXT) - Avatar image URL
- `bio` (TEXT) - User bio
- `whatsapp` (TEXT) - WhatsApp number
- `role` (TEXT) - 'buyer', 'seller', or 'admin'
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `deleted_at` (TIMESTAMP) - Soft delete

**RLS Policies:**
- Public read access
- Users can update own profile
- Users can insert own profile

---

### Products

Digital products for sale.

**Columns:**
- `id` (UUID) - Primary key
- `seller_id` (UUID) - References profiles.id
- `type` (TEXT) - Product type
- `name` (TEXT) - Product name
- `description` (TEXT) - Description
- `price` (DECIMAL) - Price
- `currency` (TEXT) - Currency code
- `cover_image` (TEXT) - Cover image URL
- `data` (JSONB) - Product-specific data
- `status` (TEXT) - 'active', 'inactive', or 'deleted'
- `views` (INTEGER) - View count
- `purchases` (INTEGER) - Purchase count
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Indexes:**
- seller_id
- type
- status

**RLS Policies:**
- Public read for active products
- Sellers can manage own products

---

### Orders

Purchase orders.

**Columns:**
- `id` (UUID) - Primary key
- `buyer_id` (UUID) - References profiles.id
- `buyer_email` (TEXT) - Buyer email
- `buyer_name` (TEXT) - Buyer name
- `product_id` (UUID) - References products.id
- `amount` (DECIMAL) - Order amount
- `currency` (TEXT) - Currency code
- `status` (TEXT) - 'pending', 'completed', 'failed', 'refunded'
- `payment_method` (TEXT) - Payment method
- `transaction_id` (TEXT) - Internal transaction ID
- `ashtechpay_transaction_id` (TEXT) - Ashtechpay transaction ID
- `created_at` (TIMESTAMP)
- `completed_at` (TIMESTAMP)

**Indexes:**
- buyer_id
- product_id
- status

**RLS Policies:**
- Users can view own orders
- Sellers can view orders for their products

---

### Purchases

Buyer access to purchased products.

**Columns:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - References profiles.id
- `product_id` (UUID) - References products.id
- `order_id` (UUID) - References orders.id
- `access_pin` (TEXT) - PIN for external access
- `access_data` (JSONB) - Product access data
- `created_at` (TIMESTAMP)

**Indexes:**
- user_id
- product_id

**RLS Policies:**
- Users can view own purchases

---

### Support Tickets

Customer support tickets.

**Columns:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - References profiles.id
- `subject` (TEXT) - Ticket subject
- `status` (TEXT) - 'open', 'in_progress', 'resolved', 'closed'
- `priority` (TEXT) - 'low', 'medium', 'high', 'urgent'
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Indexes:**
- user_id
- status

**RLS Policies:**
- Users can view own tickets
- Users can create tickets

---

### Support Messages

Messages in support tickets.

**Columns:**
- `id` (UUID) - Primary key
- `ticket_id` (UUID) - References support_tickets.id
- `user_id` (UUID) - References profiles.id
- `message` (TEXT) - Message content
- `attachments` (JSONB) - File attachments
- `is_admin` (BOOLEAN) - Admin message flag
- `created_at` (TIMESTAMP)

**Indexes:**
- ticket_id

**RLS Policies:**
- Users can view messages for own tickets

---

### Notifications

User notifications.

**Columns:**
- `id` (UUID) - Primary key
- `user_id` (UUID) - References profiles.id
- `type` (TEXT) - Notification type
- `title` (TEXT) - Title
- `message` (TEXT) - Message
- `data` (JSONB) - Additional data
- `read` (BOOLEAN) - Read status
- `created_at` (TIMESTAMP)

**Indexes:**
- user_id
- read

**RLS Policies:**
- Users can view own notifications
- Users can update own notifications

---

### Analytics

Analytics events.

**Columns:**
- `id` (UUID) - Primary key
- `seller_id` (UUID) - References profiles.id
- `product_id` (UUID) - References products.id
- `event_type` (TEXT) - Event type
- `data` (JSONB) - Event data
- `created_at` (TIMESTAMP)

**Indexes:**
- seller_id
- product_id
- event_type
- created_at

**RLS Policies:**
- Sellers can view own analytics

---

### Admin Settings

System-wide settings (admin only).

**Columns:**
- `key` (TEXT) - Primary key
- `value` (JSONB) - Setting value
- `updated_at` (TIMESTAMP)

**Default Settings:**
- `support_email` - Support contact email
- `ashtechpay_api_key` - Ashtechpay API key
- `vapid_public_key` - VAPID public key for push notifications
- `ai_api_keys` - AI service API keys (Grok, Gemini, Claude)

---

### External Buyers

External product access (no account required).

**Columns:**
- `id` (UUID) - Primary key
- `email` (TEXT) - Buyer email
- `pin` (TEXT) - Access PIN (5 digits)
- `created_at` (TIMESTAMP)

**Indexes:**
- email

---

## Client-Side API (ashtechpay.ts)

### Usage Example

```typescript
import { ashtechpay } from '@/lib/ashtechpay';

// Get supported countries
const countries = await ashtechpay.getCountries();

// Initiate payment
const result = await ashtechpay.collectPayment({
  amount: 5000,
  currency: 'XAF',
  phone: '670000000',
  operator: 'MTN Mobile Money',
  country_code: 'CM',
  reference: 'ORDER-001',
});

// Check if OTP required
const flow = ashtechpay.detectPaymentFlow(result);
if (flow.type === 'otp_sms') {
  // Prompt user for OTP
}

// Get fees
const fees = await ashtechpay.getFees();

// Calculate net amount
const calculation = ashtechpay.calculateNetAmount(5000, 'CM', fees);
console.log(calculation.net); // Amount after fees

// Check transaction status
const status = await ashtechpay.getTransactionStatus('transaction-id');
```

---

## Error Handling

All API functions throw errors that should be caught:

```typescript
try {
  const result = await ashtechpay.collectPayment(paymentData);
} catch (error) {
  console.error('Payment failed:', error.message);
  // Handle error
}
```

**Common Error Codes:**
- `400` - Bad request (missing/invalid parameters)
- `401` - Unauthorized (invalid/missing API key)
- `403` - Forbidden
- `404` - Not found
- `422` - Unprocessable (invalid country/operator)
- `429` - Rate limited
- `500` - Server error
- `502` - Gateway error

---

## Rate Limiting

Ashtechpay API has rate limiting. Handle `429` responses by:
1. Implementing exponential backoff
2. Showing user-friendly error messages
3. Caching frequently accessed data (countries, fees)

---

## Best Practices

1. **Cache Static Data**: Countries and fees rarely change
2. **Handle All Flows**: Support USSD Push, OTP SMS, OTP USSD, and Wave
3. **Verify Webhooks**: Always validate webhook signatures
4. **Respond Fast**: Return 200 immediately in webhooks
5. **Log Everything**: Keep audit trails of all transactions
6. **Test Thoroughly**: Test with all operators and countries
7. **Monitor Status**: Poll transaction status for pending payments
8. **Handle Failures**: Implement retry logic for failed payments

---

For complete Ashtechpay documentation, visit:
https://github.com/honest2370/Ashtechpay-API-
