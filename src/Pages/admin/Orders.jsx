// src/Pages/admin/Orders.jsx
import { useState, useEffect } from "react";
import { Search, Download, Eye, CheckCircle, XCircle, Clock, Truck } from "lucide-react";
import apiService from "../../services/api";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await apiService.getOrders();
      setOrders(data || []);
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      toast.success("Статус заказа обновлен");
      loadOrders();
    } catch (error) {
      toast.error("Ошибка при обновлении статуса");
    }
  };

  const handleDownloadPDF = (order) => {
    // Генерация PDF чека
    const date = new Date(order.createdAt || Date.now());
    const content = `
═══════════════════════════════════════
        ЧЕК ЗАКАЗА #${order.id}
═══════════════════════════════════════
Дата: ${date.toLocaleDateString("ru-RU")} ${date.toLocaleTimeString("ru-RU")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
КЛИЕНТ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Имя: ${order.firstName}
Фамилия: ${order.lastName || "—"}
Телефон: ${order.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ТОВАРЫ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${order.items?.map((item, index) => 
  `${index + 1}. ${item.name || "Товар"}
   Количество: ${item.quantity} шт.
   Цена: ${(item.price || 0).toLocaleString("ru-RU")} сум
   Сумма: ${((item.price || 0) * (item.quantity || 1)).toLocaleString("ru-RU")} сум`
).join("\n\n") || "Нет товаров"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ИТОГО: ${(order.total || 0).toLocaleString("ru-RU")} сум
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Доставка: ${order.delivery || "—"}
Оплата: ${order.payment || "—"}
${order.date ? `Дата отправки: ${order.date}` : ""}
${order.comment ? `Комментарий: ${order.comment}` : ""}

═══════════════════════════════════════
    Спасибо за ваш заказ!
═══════════════════════════════════════
    `;
    
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `order-${order.id}-${date.toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Чек скачан");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Новый";
      case "processing":
        return "В обработке";
      case "shipped":
        return "Отправлен";
      case "delivered":
        return "Доставлен";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm) ||
      order.id?.toString().includes(searchTerm);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка заказов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Управление заказами</h1>
        <p className="text-gray-600 mt-2">Просмотр и управление всеми заказами</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск по имени, телефону или ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Все статусы</option>
          <option value="pending">Новые</option>
          <option value="processing">В обработке</option>
          <option value="shipped">Отправлены</option>
          <option value="delivered">Доставлены</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Клиент</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Телефон</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Сумма</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Статус</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Дата</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.firstName} {order.lastName || ""}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.phone}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {order.total?.toLocaleString("ru-RU")} сум
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(order.createdAt || Date.now()).toLocaleDateString("ru-RU")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Просмотр"
                      >
                        <Eye size={18} />
                      </button>
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="pending">Новый</option>
                        <option value="processing">В обработке</option>
                        <option value="shipped">Отправлен</option>
                        <option value="delivered">Доставлен</option>
                      </select>
                      <button
                        onClick={() => handleDownloadPDF(order)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Скачать чек"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600">Заказы не найдены</p>
          <p className="text-black">В данный момент заказы отправляются в тг бота</p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">Заказ #{selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Информация о клиенте</h3>
                <p className="text-gray-600">Имя: {selectedOrder.firstName}</p>
                <p className="text-gray-600">Фамилия: {selectedOrder.lastName || "—"}</p>
                <p className="text-gray-600">Телефон: {selectedOrder.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Доставка и оплата</h3>
                <p className="text-gray-600">Доставка: {selectedOrder.delivery || "—"}</p>
                <p className="text-gray-600">Оплата: {selectedOrder.payment || "—"}</p>
                <p className="text-gray-600">Дата: {selectedOrder.date || "—"}</p>
              </div>
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Товары</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-700">{item.name} x{item.quantity}</span>
                        <span className="font-semibold text-gray-900">
                          {(item.price * item.quantity).toLocaleString("ru-RU")} сум
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-lg font-bold text-gray-900">
                  Итого: {selectedOrder.total?.toLocaleString("ru-RU")} сум
                </p>
              </div>
              {selectedOrder.comment && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Комментарий</h3>
                  <p className="text-gray-600">{selectedOrder.comment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

