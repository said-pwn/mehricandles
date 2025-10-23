import { useState } from "react";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    delivery: "",
    payment: "",
    comment: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Заказ успешно отправлен!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          delivery: "",
          payment: "",
          comment: "",
          date: "",
        });
      } else {
        console.error("Ошибка:", data);
        alert("❌ Ошибка при отправке данных.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("⚠️ Не удалось связаться с сервером.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-10 bg-black text-white p-6 rounded-xl space-y-6"
    >
      <h2 className="text-lg font-semibold">Оформление заказа</h2>

      <div>
        <label className="block text-sm mb-2">Имя</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Фамилия</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Номер телефона</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="+998"
          className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Способ доставки</label>
        <select
          name="delivery"
          value={formData.delivery}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Выберите способ</option>
          <option>Самовывоз</option>
          <option>Курьером</option>
          <option>Почтой</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-2">Способ оплаты</label>
        <select
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Выберите способ</option>
          <option>Наличными</option>
          <option>Картой</option>
          <option>Перевод на карту</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-2">Дата отправки</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm mb-2">Комментарий к заказу</label>
        <textarea
          name="comment"
          rows="3"
          value={formData.comment}
          onChange={handleChange}
          className="w-full rounded-md bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-md text-white font-semibold ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
        }`}
      >
        {loading ? "Отправка..." : "Отправить заказ"}
      </button>
    </form>
  );
}
