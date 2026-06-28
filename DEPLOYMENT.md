# SELLIZI Deployment Guide

## Prerequisites

- Supabase Account
- Vercel Account
- Ashtechpay API Key

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to https://supabase.com
2. Create a new project
3. Note your project URL and API keys

### 1.2 Run Database Schema

1. Go to SQL Editor in Supabase Dashboard
2. Copy and paste the contents of `supabase/schema.sql`
3. Run the SQL script
4. Verify all tables are created

### 1.3 Deploy Edge Functions

Install Supabase CLI:
\`\`\`bash
npm install -g supabase
\`\`\`

Login to Supabase:
\`\`\`bash
supabase login
\`\`\`

Link your project:
\`\`\`bash
supabase link --project-ref YOUR_PROJECT_REF
\`\`\`

Deploy functions:
\`\`\`bash
supabase functions deploy ashtechpay-collect
supabase functions deploy ashtechpay-webhook
supabase functions deploy ashtechpay-countries
supabase functions deploy ashtechpay-fees
supabase functions deploy ashtechpay-status
\`\`\`

### 1.4 Configure Authentication

1. Go to Authentication > Providers
2. Enable Email provider
3. Enable Google OAuth (optional):
   - Get OAuth credentials from Google Cloud Console
   - Add to Supabase Auth settings

### 1.5 Set Admin API Keys

Run in SQL Editor:
\`\`\`sql
UPDATE admin_settings 
SET value = '"YOUR_ASHTECHPAY_API_KEY"'
WHERE key = 'ashtechpay_api_key';
\`\`\`

### 1.6 Create Admin User

Sign up normally, then run:
\`\`\`sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'honestansah@gmail.com';
\`\`\`

## Step 2: Vercel Deployment

### 2.1 Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
\`\`\`

### 2.2 Import to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables (see below)
5. Deploy

### 2.3 Environment Variables

Add these in Vercel dashboard:

\`\`\`env
VITE_SUPABASE_URL=https://gffzzhbvqorepaycpcqz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZnp6aGJ2cW9yZXBheWNwY3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTY2NDksImV4cCI6MjA5ODEzMjY0OX0.whvGvJMzJ-JCV0fhE8xfb9mAO4JuWZgMEVydXvpPE7I
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZnp6aGJ2cW9yZXBheWNwY3F6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjU1NjY0OSwiZXhwIjoyMDk4MTMyNjQ5fQ.bwYpANWSiKVz4elDY9192m3BLYH_KPx37t80ahID-8Y
VITE_VAPID_PUBLIC_KEY=YOUR_VAPID_PUBLIC_KEY
\`\`\`

## Step 3: Generate VAPID Keys

1. Go to https://vapidkeys.com/
2. Generate new keys
3. Add public key to Vercel environment variables
4. Add both keys to admin settings in database:

\`\`\`sql
UPDATE admin_settings 
SET value = '"YOUR_VAPID_PUBLIC_KEY"'
WHERE key = 'vapid_public_key';
\`\`\`

## Step 4: Configure Ashtechpay

1. Get API key from Ashtechpay
2. Update in Supabase (see Step 1.5)
3. Test payment flow

## Step 5: Post-Deployment

### 5.1 Test Application

- Sign up as seller
- Create products
- Test payment flow
- Access admin panel at /adminentry

### 5.2 PWA Installation

On mobile:
- Open in Chrome/Safari
- Click "Add to Home Screen"
- App will install as standalone

### 5.3 Configure Support

1. Login as admin
2. Go to System Settings
3. Update support email
4. Configure AI API keys (optional)

## Step 6: Custom Domain (Optional)

1. Add domain in Vercel
2. Configure DNS records
3. Update in admin settings

## Troubleshooting

### Database Issues
- Check RLS policies are enabled
- Verify user has correct role
- Check foreign key constraints

### Payment Issues
- Verify Ashtechpay API key
- Check Edge Function logs
- Test with supported countries/operators

### Auth Issues
- Verify Supabase URL and keys
- Check email templates
- Test OAuth redirect URLs

## Support

For issues, contact: honestansah@gmail.com

## Production Checklist

- [ ] Database schema deployed
- [ ] Edge functions deployed
- [ ] RLS policies enabled
- [ ] Admin user created
- [ ] Ashtechpay API key configured
- [ ] VAPID keys generated
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] PWA tested on mobile
- [ ] Payment flow tested
- [ ] Support system tested

---

Your SELLIZI application is now ready for production!
