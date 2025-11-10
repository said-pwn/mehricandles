// src/components/admin/CategoryModal.jsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import apiService from "../../services/api";
import { toast } from "react-toastify";

export default function CategoryModal({ isOpen, onClose, category, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    seoSlug: "",
    metaDescription: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name || "",
          type: category.type || "",
          description: category.description || "",
          seoSlug: category.seoSlug || "",
          metaDescription: category.metaDescription || "",
        });
      } else {
        setFormData({
          name: "",
          type: "",
          description: "",
          seoSlug: "",
          metaDescription: "",
        });
      }
    }
  }, [isOpen, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (category && category.id) {
        const result = await apiService.updateCategory(category.id, formData);
        if (result) {
          toast.success("Категория обновлена");
          onSave();
        } else {
          toast.error("Ошибка: категория не найдена");
        }
      } else {
        const result = await apiService.createCategory(formData);
        if (result) {
          toast.success("Категория создана");
          onSave();
        } else {
          toast.error("Ошибка при создании категории");
        }
      }
    } catch (error) {
      console.error("Ошибка при сохранении категории:", error);
      toast.error("Ошибка при сохранении категории");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {category ? "Редактировать категорию" : "Добавить категорию"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип категории
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Выберите тип</option>
              <option value="aroma">По запаху</option>
              <option value="size">По размеру</option>
              <option value="shape">По форме</option>
              <option value="color">По цвету</option>
              <option value="purpose">По назначению</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Slug
            </label>
            <input
              type="text"
              value={formData.seoSlug}
              onChange={(e) => setFormData({ ...formData, seoSlug: e.target.value })}
              placeholder="aromatic-candles"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Мета-описание
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Сохранение..." : category ? "Обновить" : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

