# SELLIZI Project Structure

## Directory Overview

```
sellizi/
├── public/                      # Static assets
│   ├── icon-*.png              # PWA icons (various sizes)
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service worker
│
├── src/                        # Source code
│   ├── components/             # Reusable components
│   │   └── ProgressBar.tsx     # Page transition progress bar
│   │
│   ├── lib/                    # Libraries & utilities
│   │   ├── ashtechpay.ts      # Ashtechpay API integration
│   │   ├── constants.ts        # App constants & configurations
│   │   └── supabase.ts         # Supabase client setup
│   │
│   ├── pages/                  # Page components
│   │   ├── AllPages.tsx        # Consolidated page exports
│   │   │
│   │   ├── auth/               # Authentication pages
│   │   │   ├── WelcomePage.tsx
│   │   │   ├── SignInPage.tsx
│   │   │   ├── SignUpPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   │
│   │   ├── buyer/              # Buyer space pages
│   │   │   ├── BuyerLayout.tsx
│   │   │   ├── BuyerDashboard.tsx
│   │   │   ├── BuyerProducts.tsx
│   │   │   ├── BuyerProductView.tsx
│   │   │   └── ExternalProductAccess.tsx
│   │   │
│   │   ├── seller/             # Seller space pages
│   │   │   ├── SellerLayout.tsx
│   │   │   ├── SellerDashboard.tsx
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   └── AnalyticsOverview.tsx
│   │   │   │
│   │   │   ├── products/
│   │   │   │   ├── ProductsList.tsx
│   │   │   │   └── ProductUpload.tsx
│   │   │   │
│   │   │   ├── orders/
│   │   │   │   └── OrdersList.tsx
│   │   │   │
│   │   │   ├── customers/
│   │   │   │   └── CustomersList.tsx
│   │   │   │
│   │   │   ├── marketing/
│   │   │   │   └── MarketingHub.tsx
│   │   │   │
│   │   │   ├── settings/
│   │   │   │   └── StoreSettings.tsx
│   │   │   │
│   │   │   └── profile/
│   │   │       └── ProfileSettings.tsx
│   │   │
│   │   ├── admin/              # Admin space pages
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   │
│   │   │   ├── users/
│   │   │   │   └── UserManagement.tsx
│   │   │   │
│   │   │   ├── transactions/
│   │   │   │   └── TransactionsList.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │       └── SystemSettings.tsx
│   │   │
│   │   └── shared/             # Shared pages
│   │       ├── Support.tsx
│   │       ├── Notifications.tsx
│   │       ├── Help.tsx
│   │       ├── Terms.tsx
│   │       └── Privacy.tsx
│   │
│   ├── store/                  # State management (Zustand)
│   │   ├── authStore.ts        # Authentication state
│   │   ├── themeStore.ts       # Theme state
│   │   └── notificationStore.ts # Notifications state
│   │
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # App entry point
│
├── supabase/                   # Supabase configuration
│   ├── schema.sql              # Database schema
│   │
│   └── functions/              # Edge functions
│       ├── ashtechpay-collect/
│       │   └── index.ts
│       ├── ashtechpay-webhook/
│       │   └── index.ts
│       ├── ashtechpay-countries/
│       │   └── index.ts
│       ├── ashtechpay-fees/
│       │   └── index.ts
│       └── ashtechpay-status/
│           └── index.ts
│
├── index.html                  # HTML entry point
├── package.json                # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite config
├── tailwind.config.js         # Tailwind config
│
├── README.md                   # Main documentation
├── DEPLOYMENT.md              # Deployment guide
├── FEATURES.md                # Complete features list
├── API.md                     # API documentation
└── PROJECT_STRUCTURE.md       # This file
```

## Key Files Explained

### Frontend Core

#### `src/App.tsx`
Main application component with routing setup. Handles:
- Route configuration for all three spaces (Buyer, Seller, Admin)
- Authentication initialization
- Service worker registration
- Loading states

#### `src/main.tsx`
Application entry point that:
- Renders the root React component
- Sets up StrictMode
- Mounts to DOM

### State Management

#### `src/store/authStore.ts`
Manages authentication state using Zustand:
- User session
- Profile data
- Sign in/out functions
- Session persistence

#### `src/store/themeStore.ts`
Theme management:
- Dark/Light mode toggle
- LocalStorage persistence
- DOM class manipulation

#### `src/store/notificationStore.ts`
Notification state:
- Notification list
- Unread count
- Panel visibility
- CRUD operations

### Libraries & Utilities

#### `src/lib/supabase.ts`
Supabase client configuration:
- Client initialization
- TypeScript types
- Database interface

#### `src/lib/ashtechpay.ts`
Payment integration service:
- Payment collection
- Country/operator fetching
- Fee calculation
- Transaction status checking
- Payment flow detection

#### `src/lib/constants.ts`
Application constants:
- African countries list
- Mobile operators by country
- Product type definitions
- Notification types
- Support settings

### Pages Architecture

#### Authentication (`src/pages/auth/`)
- **WelcomePage**: Landing page with features showcase
- **SignInPage**: Email/password + Google OAuth sign in
- **SignUpPage**: Registration with country selection
- **ForgotPasswordPage**: Password reset flow

#### Buyer Space (`src/pages/buyer/`)
- **BuyerLayout**: Layout with bottom navigation
- **BuyerDashboard**: Purchase stats and recent items
- **BuyerProducts**: All purchased products
- **BuyerProductView**: Individual product access
- **ExternalProductAccess**: Email/PIN access for non-users

#### Seller Space (`src/pages/seller/`)
Comprehensive seller tools organized by category:
- **SellerLayout**: Navigation and menu
- **SellerDashboard**: Overview with key metrics
- **Analytics**: Deep analytics and reporting
- **Products**: Product management (list, upload, edit)
- **Orders**: Order tracking and management
- **Customers**: Customer database
- **Marketing**: Marketing tools hub
- **Settings**: Store configuration
- **Profile**: Seller profile settings

#### Admin Space (`src/pages/admin/`)
System administration:
- **AdminLayout**: Admin-specific layout
- **AdminDashboard**: System overview
- **Users**: User management
- **Transactions**: Payment monitoring
- **Settings**: System-wide configuration

#### Shared Pages (`src/pages/shared/`)
Common pages accessible from all spaces:
- **Support**: Ticket system
- **Notifications**: Notification center
- **Help**: Help documentation
- **Terms**: Terms of service
- **Privacy**: Privacy policy

### Database (Supabase)

#### `supabase/schema.sql`
Complete PostgreSQL schema:
- Tables: profiles, products, orders, purchases, support_tickets, support_messages, notifications, analytics, admin_settings, external_buyers
- Indexes for performance
- RLS policies for security
- Triggers for auto-updates
- Default admin settings

#### Edge Functions (`supabase/functions/`)

1. **ashtechpay-collect**: Initiate payments
2. **ashtechpay-webhook**: Handle payment callbacks
3. **ashtechpay-countries**: Fetch supported countries
4. **ashtechpay-fees**: Get fee schedules
5. **ashtechpay-status**: Check transaction status

Each function:
- Handles CORS
- Authenticates requests
- Interacts with Ashtechpay API
- Updates database
- Returns JSON responses

### PWA Configuration

#### `public/manifest.json`
PWA manifest with:
- App metadata
- Icons in multiple sizes
- Display mode
- Shortcuts
- Share target
- Theme colors

#### `public/sw.js`
Service worker for:
- Asset caching
- Offline support
- Push notifications
- Background sync

### Build Configuration

#### `vite.config.ts`
Vite configuration:
- React plugin
- Path aliases
- Build optimization
- Development server

#### `tsconfig.json`
TypeScript configuration:
- Strict mode
- Path mappings
- Target ES2020
- JSX support

#### `tailwind.config.js`
Tailwind CSS configuration:
- Custom colors
- Dark mode support
- Typography plugin
- Custom utilities

## Data Flow

### Authentication Flow
```
User → SignIn/SignUp → Supabase Auth → Store → Database → Route by Role
```

### Payment Flow
```
Buyer → Product → Checkout → Edge Function → Ashtechpay API → Webhook → Database → Notification
```

### Support Flow
```
User → Create Ticket → Database → Admin → Reply → Real-time Update → User
```

### Product Upload Flow
```
Seller → Form → Validate → Upload Files → Database → Products List
```

## Security Layers

1. **Row Level Security (RLS)**: Database-level access control
2. **Authentication**: Supabase Auth with JWT
3. **Edge Functions**: Server-side API key storage
4. **HTTPS**: All requests encrypted
5. **CORS**: Restricted origins
6. **Input Validation**: Client and server-side

## Scalability Considerations

- **Database Indexes**: Optimized queries
- **Edge Functions**: Serverless scaling
- **CDN**: Static asset delivery
- **Caching**: Service worker + browser cache
- **Code Splitting**: Lazy-loaded routes
- **Image Optimization**: Compressed assets

## Development Workflow

1. **Local Development**: `npm run dev`
2. **Type Checking**: Automatic with TypeScript
3. **Hot Reload**: Vite HMR
4. **Build**: `npm run build`
5. **Deploy**: Push to Vercel

## Production Deployment

1. Database setup (Supabase)
2. Edge functions deployment
3. Environment variables configuration
4. Frontend deployment (Vercel)
5. Domain configuration
6. SSL certificates (automatic)

---

This structure supports:
- ✅ Easy maintenance
- ✅ Clear separation of concerns
- ✅ Type safety
- ✅ Scalability
- ✅ Security
- ✅ Performance
