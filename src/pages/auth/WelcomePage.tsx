import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, Globe, ChevronRight } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMzI4MzEiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEyek0wIDBoMTJ2MTJIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="relative max-w-md mx-auto px-6 pt-16 pb-24">
          {/* Logo */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl shadow-blue-500/20">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentWidth" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">SELLIZI</h1>
            <p className="text-slate-400 mt-2 text-center">Digital Commerce Platform</p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-12">
            <Feature
              icon={<Globe className="w-5 h-5" />}
              title="16 African Countries"
              description="Accept mobile money payments across Africa"
            />
            <Feature
              icon={<Shield className="w-5 h-5" />}
              title="Secure Payments"
              description="Bank-grade security for all transactions"
            />
            <Feature
              icon={<Zap className="w-5 h-5" />}
              title="Instant Delivery"
              description="Automated digital product delivery"
            />
            <Feature
              icon={<TrendingUp className="w-5 h-5" />}
              title="Real-time Analytics"
              description="Track sales, visitors, and conversions"
            />
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              to="/signup"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-between hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              <span>Start Selling on SELLIZI</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/signin"
              className="w-full bg-slate-800 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center hover:bg-slate-700 transition-all active:scale-[0.98] border border-slate-700"
            >
              Sign In to Your Account
            </Link>

            <Link
              to="/external-access/demo"
              className="w-full text-slate-400 px-6 py-3 rounded-xl font-medium flex items-center justify-center hover:text-white transition-all"
            >
              Access Purchased Products
            </Link>
          </div>

          {/* Footer Links */}
          <div className="mt-12 flex items-center justify-center gap-6 text-sm">
            <Link to="/help" className="text-slate-400 hover:text-white transition-colors">
              Help
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
              Terms
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800 backdrop-blur-sm">
      <div className="flex-shrink-0 w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
