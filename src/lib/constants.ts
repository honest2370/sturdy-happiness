// African countries supported by Ashtechpay
export const AFRICAN_COUNTRIES = [
  { code: 'BJ', name: 'Benin', currency: 'XOF' },
  { code: 'BF', name: 'Burkina Faso', currency: 'XOF' },
  { code: 'CM', name: 'Cameroon', currency: 'XAF' },
  { code: 'CF', name: 'Central African Republic', currency: 'XAF' },
  { code: 'CG', name: 'Congo', currency: 'XAF' },
  { code: 'CI', name: "Côte d'Ivoire", currency: 'XOF' },
  { code: 'GA', name: 'Gabon', currency: 'XAF' },
  { code: 'GN', name: 'Guinea Conakry', currency: 'GNF' },
  { code: 'GQ', name: 'Equatorial Guinea', currency: 'XAF' },
  { code: 'GW', name: 'Guinea-Bissau', currency: 'XOF' },
  { code: 'ML', name: 'Mali', currency: 'XOF' },
  { code: 'NE', name: 'Niger', currency: 'XOF' },
  { code: 'CD', name: 'DR Congo', currency: 'CDF' },
  { code: 'SN', name: 'Senegal', currency: 'XOF' },
  { code: 'TD', name: 'Chad', currency: 'XAF' },
  { code: 'TG', name: 'Togo', currency: 'XOF' },
];

// Mobile money operators by country
export const MOBILE_OPERATORS = {
  BJ: ['Moov Money', 'MTN Mobile Money'],
  BF: ['Moov Money', 'Orange Money'],
  CM: ['MTN Mobile Money', 'Orange Money'],
  CF: ['Orange Money'],
  CG: ['Airtel Money', 'MTN Mobile Money'],
  CI: ['Moov Money', 'MTN', 'Orange Money', 'Wave'],
  GA: ['Airtel Money', 'Moov Money'],
  GN: ['MTN Mobile Money', 'Orange Money'],
  GQ: ['Orange Money'],
  GW: ['Orange Money'],
  ML: ['Moov Money', 'Orange Money'],
  NE: ['Airtel Money'],
  CD: ['Afrimoney', 'Airtel', 'Orange Money', 'Vodacom M-Pesa'],
  SN: ['Free Money', 'Orange Money', 'Wave'],
  TD: ['Airtel Money', 'Moov Money'],
  TG: ['Flooz (Moov)', 'T-Money'],
};

// Product types with their specific fields
export const PRODUCT_TYPES = [
  {
    id: 'ebook',
    name: 'E-book / PDF',
    fields: ['title', 'author', 'description', 'file', 'cover_image', 'pages', 'language', 'isbn'],
  },
  {
    id: 'account',
    name: 'Digital Account',
    fields: ['name', 'description', 'account_type', 'credentials', 'cover_image', 'instructions'],
  },
  {
    id: 'proxy_account',
    name: 'Proxy Account',
    fields: ['name', 'protocol', 'server', 'port', 'username', 'password', 'authenticated', 'instructions'],
  },
  {
    id: 'video_course',
    name: 'Video Course',
    fields: ['title', 'instructor', 'description', 'modules', 'chapters', 'duration', 'level', 'cover_image', 'preview_video'],
  },
  {
    id: 'software',
    name: 'Software / Tool',
    fields: ['name', 'version', 'description', 'license_key', 'download_link', 'platform', 'requirements', 'cover_image'],
  },
  {
    id: 'template',
    name: 'Template / Theme',
    fields: ['name', 'category', 'description', 'files', 'demo_url', 'compatible_with', 'cover_image'],
  },
  {
    id: 'music',
    name: 'Music / Audio',
    fields: ['title', 'artist', 'description', 'audio_file', 'duration', 'genre', 'bpm', 'cover_art'],
  },
  {
    id: 'stock_media',
    name: 'Stock Photos/Videos',
    fields: ['title', 'description', 'files', 'resolution', 'format', 'license_type', 'preview_image'],
  },
  {
    id: 'membership',
    name: 'Membership Access',
    fields: ['name', 'description', 'access_url', 'duration', 'features', 'instructions', 'cover_image'],
  },
  {
    id: 'service',
    name: 'Digital Service',
    fields: ['name', 'description', 'delivery_time', 'requirements', 'what_you_get', 'cover_image'],
  },
  {
    id: 'crypto_wallet',
    name: 'Crypto Wallet Access',
    fields: ['name', 'blockchain', 'wallet_address', 'private_key', 'seed_phrase', 'balance', 'instructions'],
  },
  {
    id: 'gaming_account',
    name: 'Gaming Account',
    fields: ['game_name', 'platform', 'username', 'password', 'level', 'items', 'rank', 'cover_image'],
  },
  {
    id: 'social_media',
    name: 'Social Media Account',
    fields: ['platform', 'username', 'password', 'followers', 'verification_status', 'email', 'cover_image'],
  },
  {
    id: 'vpn_access',
    name: 'VPN Access',
    fields: ['service_name', 'username', 'password', 'servers', 'duration', 'simultaneous_connections', 'instructions'],
  },
  {
    id: 'digital_card',
    name: 'Digital Gift Card',
    fields: ['brand', 'value', 'currency', 'code', 'pin', 'expiry_date', 'redemption_url', 'card_image'],
  },
];

// Notification types
export const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PAYMENT: 'payment',
  BROADCAST: 'broadcast',
  SYSTEM: 'system',
} as const;

// Support ticket statuses
export const TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const;

// Support email (editable by admin)
export const DEFAULT_SUPPORT_EMAIL = 'honestansah@gmail.com';

// VAPID public key for push notifications (to be set by admin)
export const VAPID_PUBLIC_KEY = process.env.VITE_VAPID_PUBLIC_KEY || '';
