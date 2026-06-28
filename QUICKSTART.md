# SELLIZI Quick Start Guide

Get your SELLIZI platform up and running in 30 minutes!

## ⚡ Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Vercel account (free tier works)
- Ashtechpay API key (contact Ashtechpay)
- Git installed

## 🚀 Step-by-Step Setup

### 1. Clone & Install (2 minutes)

```bash
# If starting from scratch
git clone <your-repo-url>
cd sellizi
npm install
```

### 2. Supabase Setup (10 minutes)

#### A. Create Project
1. Go to https://supabase.com
2. Click "New Project"
3. Choose organization, name it "SELLIZI"
4. Choose a strong database password
5. Select closest region
6. Wait for project to initialize (~2 minutes)

#### B. Setup Database
1. Go to SQL Editor
2. Copy entire contents of `supabase/schema.sql`
3. Paste and click "Run"
4. Verify success message

#### C. Get Credentials
1. Go to Project Settings > API
2. Copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key
3. Keep these safe!

### 3. Local Development (3 minutes)

```bash
# Create environment file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# Paste your URL and keys from step 2C
```

Your `.env.local` should look like:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
VITE_VAPID_PUBLIC_KEY=  # Leave empty for now
```

### 4. Test Locally (1 minute)

```bash
npm run dev
```

Open http://localhost:5173 - you should see the welcome page!

### 5. Deploy Edge Functions (5 minutes)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project (get ref from dashboard URL)
supabase link --project-ref your-project-ref

# Deploy all functions
cd supabase/functions
supabase functions deploy ashtechpay-collect
supabase functions deploy ashtechpay-webhook
supabase functions deploy ashtechpay-countries
supabase functions deploy ashtechpay-fees
supabase functions deploy ashtechpay-status
```

### 6. Create Admin User (2 minutes)

1. Sign up normally at http://localhost:5173/signup
2. Use your email
3. Go to Supabase Dashboard > SQL Editor
4. Run:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your@email.com';
```

### 7. Configure Ashtechpay (3 minutes)

Get your API key from Ashtechpay, then:

```sql
UPDATE admin_settings 
SET value = '"YOUR_ASHTECHPAY_API_KEY"'
WHERE key = 'ashtechpay_api_key';
```

### 8. Deploy to Vercel (5 minutes)

#### A. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/sellizi.git
git push -u origin main
```

#### B. Import to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SUPABASE_SERVICE_ROLE_KEY`
5. Click "Deploy"
6. Wait ~2 minutes

### 9. Setup Push Notifications (Optional - 2 minutes)

1. Go to https://vapidkeys.com/
2. Generate keys
3. Add public key to Vercel env vars
4. Add to database:

```sql
UPDATE admin_settings 
SET value = '"YOUR_VAPID_PUBLIC_KEY"'
WHERE key = 'vapid_public_key';
```

### 10. Test Production (2 minutes)

Visit your Vercel URL (e.g., sellizi.vercel.app):
- ✅ Sign up as seller
- ✅ Upload a test product
- ✅ Access admin at /adminentry
- ✅ Test payment flow
- ✅ Check notifications work

## 🎉 Done!

Your SELLIZI platform is now live!

## 📱 Test PWA Installation

### On Android (Chrome)
1. Open your site
2. Click menu (3 dots)
3. Click "Add to Home screen"
4. Accept

### On iOS (Safari)
1. Open your site
2. Click Share button
3. Click "Add to Home Screen"
4. Accept

## 🔧 Common Issues

### "Supabase connection failed"
- Check environment variables
- Verify Supabase URL and keys
- Check if project is paused (free tier)

### "Edge function not found"
- Redeploy functions
- Check function names
- Verify project is linked

### "Payment failed"
- Verify Ashtechpay API key
- Check supported countries
- Test with valid operator

### "Can't access admin panel"
- Verify role is set to 'admin'
- Clear browser cache
- Check RLS policies

## 📚 Next Steps

1. **Customize Design**: Edit colors in `tailwind.config.js`
2. **Add Products**: Upload 15+ product types
3. **Configure Store**: Set up delivery, currencies, etc.
4. **Marketing**: Enable marketing tools
5. **Go Live**: Share your store link!

## 🆘 Need Help?

- **Documentation**: Read README.md, FEATURES.md, API.md
- **Email Support**: honestansah@gmail.com
- **Supabase Docs**: https://supabase.com/docs
- **Ashtechpay Docs**: https://github.com/honest2370/Ashtechpay-API-

## 📊 Monitor Your Store

### Supabase Dashboard
- Database Activity
- Edge Function Logs
- Storage Usage
- Auth Events

### Vercel Dashboard
- Deployment Status
- Analytics
- Error Logs
- Performance

## 🔒 Security Tips

1. **Never commit** `.env.local` to Git
2. **Rotate keys** every 6 months
3. **Enable 2FA** on all accounts
4. **Monitor** failed login attempts
5. **Backup** database weekly

## 💡 Pro Tips

- Use test mode for Ashtechpay during development
- Set up staging environment (free Vercel project)
- Enable email notifications for orders
- Monitor Edge Function logs
- Cache frequently accessed data
- Optimize images before upload

---

**Estimated Total Time: 30-35 minutes**

**Difficulty: Beginner-Friendly**

**Cost: $0 (Free tiers work perfectly)**

---

Built with ❤️ by the SELLIZI Team

Happy Selling! 🚀
