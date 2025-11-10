import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../services/api";

export default function OrderForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    delivery: "",
    payment: "",
    comment: "",
    date: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const total = calculateTotal();
      const order = {
        ...formData,
        items: cartItems,
        total,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      // Сохраняем заказ в localStorage/MockAPI
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      order.id = Date.now();
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Отправляем в Telegram (если сервер доступен)
      try {
        await fetch("http://localhost:5000/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        console.log("Telegram отправка не удалась, но заказ сохранен");
      }

      // Очищаем корзину
      localStorage.removeItem("cart");
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: [] }));

      toast.success("✅ Заказ успешно оформлен!");
      
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        delivery: "",
        payment: "",
        comment: "",
        date: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("❌ Ошибка при оформлении заказа.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Корзина пуста</h2>
        <p className="text-gray-600 mb-6">Добавьте товары в корзину перед оформлением заказа</p>
        <a
          href="/catalog"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Перейти в каталог
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Оформление заказа</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ваш заказ</h3>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  {(item.price * item.quantity).toLocaleString("ru-RU")} сум
                </p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Итого:</span>
              <span className="text-2xl font-bold text-gray-900">
                {calculateTotal().toLocaleString("ru-RU")} сум
              </span>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4"
        >

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Имя *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Фамилия</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Номер телефона *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+998901234567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Способ доставки *</label>
            <select
              name="delivery"
              value={formData.delivery}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Выберите способ</option>
              <option>Самовывоз</option>
              <option>Курьером</option>
              <option>Почтой</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Способ оплаты *</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Выберите способ</option>
              <option>Наличными</option>
              <option>Картой</option>
              <option>Перевод на карту</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Дата отправки *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Комментарий к заказу</label>
            <textarea
              name="comment"
              rows="3"
              value={formData.comment}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-colors ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            }`}
          >
            {loading ? "Оформление..." : "Оформить заказ"}
          </button>
        </form>
      </div>
    </div>
  );
}
