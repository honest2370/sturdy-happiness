# 🚀 SELLIZI - Advanced Fintech Digital Commerce Platform

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E.svg)](https://supabase.com)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8.svg)](https://web.dev/progressive-web-apps/)

A sophisticated, production-ready Progressive Web App (PWA) for selling and managing digital products across 16 African countries with mobile money payment integration via Ashtechpay.

![SELLIZI Platform](https://via.placeholder.com/1200x600/0F172A/3B82F6?text=SELLIZI+-+Digital+Commerce+Platform)

---

## 🚀 Features

### Three-Space Architecture
- **Buyer Space**: Simple product viewing and access
- **Seller Space**: 40+ seller tools and features
- **Admin Space**: 30+ comprehensive system management tools

### Core Features
- ✅ PWA (installable, offline-capable, splash screens)
- ✅ Supabase backend (Auth, Database, Storage, Edge Functions, Realtime)
- ✅ Ashtechpay payment integration (16 African countries)
- ✅ Dark/Light theme with localStorage persistence
- ✅ Pull-to-refresh gesture support
- ✅ Page caching and navigation
- ✅ Progress bar on page transitions
- ✅ Hidden scrollbars (fintech aesthetics)
- ✅ Real-time notifications with VAPID push
- ✅ File upload support in support tickets
- ✅ Multi-language support

### Authentication
- Email/password sign in/up
- Google OAuth
- Forgot password flow
- Role-based access (buyer/seller/admin)

### Payment Integration
- Ashtechpay API for mobile money
- Supports 16 African countries
- Multiple operators per country
- USSD Push, OTP SMS, OTP USSD, Wave flows
- Real-time webhooks

### Product Types (15+)
1. E-books / PDFs
2. Digital Accounts
3. Proxy Accounts (protocol, server, port, auth)
4. Video Courses (chapters, modules, links)
5. Software / Tools
6. Templates / Themes
7. Music / Audio
8. Stock Photos/Videos
9. Membership Access
10. Digital Services
11. Crypto Wallet Access
12. Gaming Accounts
13. Social Media Accounts
14. VPN Access
15. Digital Gift Cards

### Seller Tools (40+ Features)
- Dashboard with analytics
- Revenue & sales charts
- Product management
- Order tracking
- Customer management
- Marketing hub
- Email campaigns
- Affiliate system
- Link tracking
- Discount codes
- Store customization
- Payment settings
- Delivery automation
- And 30+ more...

### Admin Tools (30+ Features)
- System dashboard
- User management
- Transaction monitoring
- Payment gateway settings
- Broadcast messaging
- Support ticket management
- AI API key management (Grok, Gemini, Claude)
- Fee configuration
- Country/operator management
- Analytics & reporting
- And 20+ more...

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions, Realtime)
- **Payment**: Ashtechpay API
- **PWA**: Workbox, Service Workers
- **Routing**: React Router v6
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd sellizi
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables (create `.env.local`):
\`\`\`env
VITE_SUPABASE_URL=https://gffzzhbvqorepaycpcqz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZnp6aGJ2cW9yZXBheWNwY3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTY2NDksImV4cCI6MjA5ODEzMjY0OX0.whvGvJMzJ-JCV0fhE8xfb9mAO4JuWZgMEVydXvpPE7I
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZnp6aGJ2cW9yZXBheWNwY3F6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjU1NjY0OSwiZXhwIjoyMDk4MTMyNjQ5fQ.bwYpANWSiKVz4elDY9192m3BLYH_KPx37t80ahID-8Y
VITE_VAPID_PUBLIC_KEY=<your-vapid-key>
VITE_ASHTECHPAY_API_KEY=<your-ashtechpay-key>
\`\`\`

4. Run development server:
\`\`\`bash
npm run dev
\`\`\`

5. Build for production:
\`\`\`bash
npm run build
\`\`\`

## 🗄️ Database Setup

### 1. Run the SQL schema in Supabase SQL Editor:
\`\`\`sql
-- See supabase/schema.sql
\`\`\`

### 2. Deploy Edge Functions:
\`\`\`bash
cd supabase/functions
supabase functions deploy ashtechpay-collect
supabase functions deploy ashtechpay-webhook
supabase functions deploy ashtechpay-countries
supabase functions deploy ashtechpay-fees
supabase functions deploy ashtechpay-status
\`\`\`

## 🚀 Deployment to Vercel

1. Push code to GitHub

2. Import project to Vercel

3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_SERVICE_ROLE_KEY`
   - `VITE_VAPID_PUBLIC_KEY`
   - `VITE_ASHTECHPAY_API_KEY`

4. Deploy!

## 📱 Access Points

- **Welcome Page**: `/`
- **Buyer Login**: `/signin` (redirects to buyer space)
- **Seller Sign Up**: `/signup` (redirects to seller space)
- **External Product Access**: `/external-access/:productId`
- **Admin Panel**: `/adminentry`

## 🔐 Default Admin Access

Create an admin account manually in Supabase:
\`\`\`sql
UPDATE profiles SET role = 'admin' WHERE email = 'honestansah@gmail.com';
\`\`\`

## 📝 Ashtechpay Integration

The payment system is integrated via Supabase Edge Functions:
- `ashtechpay-collect`: Initiate payments
- `ashtechpay-webhook`: Handle payment confirmations
- `ashtechpay-countries`: Fetch supported countries
- `ashtechpay-fees`: Get fee schedules
- `ashtechpay-status`: Check transaction status

All functions are self-contained and production-ready.

## 🎨 Design Philosophy

- **Fintech Aesthetics**: Clean, professional, trustworthy
- **No Emojis**: All icons are SVG-based
- **Mobile-First**: Optimized for mobile screens
- **Hidden Scrollbars**: Smooth, minimal UI
- **Dark Mode Default**: With light mode toggle
- **Responsive**: Adapts to all screen sizes

## 📊 Database Schema

See `supabase/schema.sql` for complete database schema including:
- Users & Profiles
- Products (15+ types)
- Orders & Transactions
- Support Tickets
- Notifications
- Analytics
- Admin Settings

## 🔔 Push Notifications

Set up VAPID keys for push notifications:
1. Generate VAPID keys: https://vapidkeys.com/
2. Add public key to environment variables
3. Configure in admin settings

## 📧 Support Email

Default: honestansah@gmail.com (editable by admin in system settings)

## 🤝 Contributing

This is a production-ready application. For modifications:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For technical support, contact: honestansah@gmail.com

---

Built with ❤️ using React, Supabase, and Ashtechpay
