// src/Pages/admin/Customers.jsx
import { useState, useEffect } from "react";
import { Search, Mail, Phone, ShoppingBag, Eye } from "lucide-react";
import apiService from "../../services/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [customersData, ordersData] = await Promise.all([
        apiService.getCustomers(),
        apiService.getOrders(),
      ]);
      setCustomers(customersData || []);
      setOrders(ordersData || []);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      setCustomers([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getCustomerOrders = (customerId) => {
    return orders.filter((order) => order.customerId === customerId || order.phone === customerId);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка клиентов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Управление клиентами</h1>
        <p className="text-gray-600 mt-2">Список всех зарегистрированных клиентов</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Поиск по имени, телефону или email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const customerOrders = getCustomerOrders(customer.id || customer.phone);
          return (
            <div
              key={customer.id || customer.phone}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{customer.name || "Без имени"}</h3>
                  {customer.email && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Mail size={16} />
                      {customer.email}
                    </div>
                  )}
                  {customer.phone && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Phone size={16} />
                      {customer.phone}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 p-3 bg-indigo-50 rounded-lg">
                <ShoppingBag className="text-indigo-600" size={18} />
                <span className="text-sm text-gray-700">
                  Заказов: <span className="font-semibold">{customerOrders.length}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCustomer({ ...customer, orders: customerOrders })}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Eye size={16} />
                  Просмотр
                </button>
                {customer.phone && (
                  <a
                    href={`https://t.me/${customer.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Написать в Telegram"
                  >
                    <Phone size={16} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600">Клиенты не найдены</p>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCustomer.name || "Клиент"}
              </h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Контактная информация</h3>
                {selectedCustomer.email && (
                  <p className="text-gray-600">Email: {selectedCustomer.email}</p>
                )}
                {selectedCustomer.phone && (
                  <p className="text-gray-600">Телефон: {selectedCustomer.phone}</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  История заказов ({selectedCustomer.orders?.length || 0})
                </h3>
                {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCustomer.orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-900">Заказ #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.createdAt || Date.now()).toLocaleDateString("ru-RU")}
                            </p>
                            <p className="text-sm text-gray-600">Статус: {order.status}</p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            {order.total?.toLocaleString("ru-RU")} сум
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Заказов нет</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

