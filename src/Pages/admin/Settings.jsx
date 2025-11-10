// src/Pages/admin/Settings.jsx
import { useState } from "react";
import { Save, Bell, Globe, CreditCard, Mail } from "lucide-react";
import { toast } from "react-toastify";

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: "MehriCandles",
    siteDescription: "Роскошные свечи ручной работы",
    email: "",
    phone: "",
    telegram: "",
    instagram: "",
    currency: "сум",
    freeShippingThreshold: 500000,
    notifications: true,
    emailNotifications: true,
  });

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
    toast.success("Настройки сохранены");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings test</h1>
        <p className="text-gray-600 mt-2">test</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Globe size={24} />
          Общие настройки
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название сайта
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание сайта
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange("siteDescription", e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Валюта
            </label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="сум">Сум</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Settings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Mail size={24} />
          Контактная информация
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Телефон
            </label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telegram
            </label>
            <input
              type="text"
              value={settings.telegram}
              onChange={(e) => handleChange("telegram", e.target.value)}
              placeholder="@username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram
            </label>
            <input
              type="text"
              value={settings.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="@username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Shipping Settings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard size={24} />
          Настройки доставки
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Порог бесплатной доставки (сум)
          </label>
          <input
            type="number"
            value={settings.freeShippingThreshold}
            onChange={(e) => handleChange("freeShippingThreshold", parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Bell size={24} />
          Уведомления
        </h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange("notifications", e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Включить уведомления</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange("emailNotifications", e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Email уведомления</span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          <Save size={20} />
          Сохранить настройки
        </button>
      </div>
    </div>
  );
}

