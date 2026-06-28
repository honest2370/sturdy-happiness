import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Download, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

export default function BuyerDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ total: 0, recent: 0 });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const { data: purchases } = await supabase
        .from('purchases')
        .select('*, products(*)')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (purchases) {
        setRecentProducts(purchases);
        setStats({
          total: purchases.length,
          recent: purchases.filter(p => {
            const date = new Date(p.created_at);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return date > weekAgo;
          }).length,
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">My Dashboard</h1>
        <p className="text-slate-400">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
          <ShoppingBag className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-2xl font-bold text-white mb-1">{stats.total}</p>
          <p className="text-slate-400 text-sm">Total Purchases</p>
        </div>
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
          <Download className="w-8 h-8 text-green-400 mb-3" />
          <p className="text-2xl font-bold text-white mb-1">{stats.recent}</p>
          <p className="text-slate-400 text-sm">This Week</p>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Purchases</h2>
          <Link to="/buyer/products" className="text-blue-400 text-sm hover:text-blue-300">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentProducts.length === 0 ? (
          <div className="bg-slate-900 rounded-xl p-8 text-center border border-slate-800">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 mb-4">No purchases yet</p>
            <Link
              to="/marketplace"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentProducts.map((purchase) => (
              <Link
                key={purchase.id}
                to={`/buyer/products/${purchase.product_id}`}
                className="block bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    {purchase.products?.cover_image ? (
                      <img src={purchase.products.cover_image} alt="" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Package className="w-8 h-8 text-slate-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-1">{purchase.products?.name}</h3>
                    <p className="text-slate-400 text-sm">{purchase.products?.type}</p>
                  </div>
                  <Eye className="w-5 h-5 text-slate-500" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/support"
          className="bg-slate-900 rounded-lg p-4 text-center border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <div className="text-2xl mb-2">💬</div>
          <p className="text-white font-medium text-sm">Support</p>
        </Link>
        <Link
          to="/help"
          className="bg-slate-900 rounded-lg p-4 text-center border border-slate-800 hover:border-slate-700 transition-colors"
        >
          <div className="text-2xl mb-2">📚</div>
          <p className="text-white font-medium text-sm">Help Center</p>
        </Link>
      </div>
    </div>
  );
}
