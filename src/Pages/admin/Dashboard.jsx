// src/Pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import { DollarSign, ShoppingCart, Package, Clock, TrendingUp, TrendingDown, Download, BarChart3 } from "lucide-react";
import apiService from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await apiService.getStatistics();
      setStats(data || {
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        pendingOrders: 0,
        ordersByStatus: {
          pending: 0,
          processing: 0,
          shipped: 0,
          delivered: 0,
        },
      });
    } catch (error) {
      console.error("Ошибка загрузки статистики:", error);
      setStats({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        pendingOrders: 0,
        ordersByStatus: {
          pending: 0,
          processing: 0,
          shipped: 0,
          delivered: 0,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Нет данных для отображения</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Общая выручка",
      value: `${(stats?.totalRevenue || 0).toLocaleString("ru-RU")} сум`,
      icon: DollarSign,
      color: "bg-green-500",
      trend: "+12%",
    },
    {
      title: "Всего заказов",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "bg-blue-500",
      trend: "+8%",
    },
    {
      title: "Товаров",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "bg-purple-500",
      trend: "+5%",
    },
    {
      title: "Ожидают обработки",
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: "bg-orange-500",
      trend: "-3%",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Статистика продаж</h1>
        <p className="text-gray-600 mt-2">Обзор вашего бизнеса</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {card.trend.startsWith("+") ? (
                      <TrendingUp className="text-green-500" size={16} />
                    ) : (
                      <TrendingDown className="text-red-500" size={16} />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        card.trend.startsWith("+") ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {card.trend}
                    </span>
                  </div>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders by Status */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Заказы по статусам</h2>
          <button
            onClick={async () => {
              try {
                const [orders, products, categories] = await Promise.all([
                  apiService.getOrders(),
                  apiService.getProducts(),
                  apiService.getCategories(),
                ]);
                const data = {
                  orders,
                  products,
                  categories,
                  exportDate: new Date().toISOString(),
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `export-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
              } catch (error) {
                console.error("Ошибка экспорта:", error);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            <Download size={16} />
            Экспорт данных
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats?.ordersByStatus && Object.entries(stats.ordersByStatus).map(([status, count]) => (
            <div key={status} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600 capitalize mt-1">
                {status === "pending" && "Новые"}
                {status === "processing" && "В обработке"}
                {status === "shipped" && "Отправлены"}
                {status === "delivered" && "Доставлены"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Последние заказы</h2>
        <RecentOrders />
      </div>
    </div>
  );
}

function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await apiService.getOrders();
      const sorted = data.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      setOrders(sorted.slice(0, 5));
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Загрузка...</div>;
  }

  if (orders.length === 0) {
    return <p className="text-gray-600 text-center py-4">Нет заказов</p>;
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900">Заказ #{order.id}</p>
            <p className="text-sm text-gray-600">
              {order.firstName} {order.lastName || ""} • {order.phone}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(order.createdAt || Date.now()).toLocaleDateString("ru-RU")}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">
              {(order.total || 0).toLocaleString("ru-RU")} сум
            </p>
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "processing"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "shipped"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {order.status === "pending" && "Новый"}
              {order.status === "processing" && "В обработке"}
              {order.status === "shipped" && "Отправлен"}
              {order.status === "delivered" && "Доставлен"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

