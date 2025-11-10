// src/components/admin/ProductModal.jsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import apiService from "../../services/api";
import { toast } from "react-toastify";

export default function ProductModal({ isOpen, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageSrc: "",
    aroma: "",
    burnTime: "",
    waxComposition: "",
    cottonWick: false,
    isBestseller: false,
    isNew: false,
    isOnSale: false,
    seoSlug: "",
    metaDescription: "",
    color: "",
    size: "",
    shape: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCategories();
      if (product) {
        setFormData({
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          category: product.category || "",
          imageSrc: product.imageSrc || "",
          aroma: product.aroma || "",
          burnTime: product.burnTime || "",
          waxComposition: product.waxComposition || "",
          cottonWick: product.cottonWick || false,
          isBestseller: product.isBestseller || false,
          isNew: product.isNew || false,
          isOnSale: product.isOnSale || false,
          seoSlug: product.seoSlug || "",
          metaDescription: product.metaDescription || "",
          color: product.color || "",
          size: product.size || "",
          shape: product.shape || "",
        });
      } else {
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          imageSrc: "",
          aroma: "",
          burnTime: "",
          waxComposition: "",
          cottonWick: false,
          isBestseller: false,
          isNew: false,
          isOnSale: false,
          seoSlug: "",
          metaDescription: "",
          color: "",
          size: "",
          shape: "",
        });
      }
    }
  }, [isOpen, product]);

  const loadCategories = async () => {
    try {
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
      };

      if (product) {
        await apiService.updateProduct(product.id, productData);
        toast.success("Товар обновлен");
      } else {
        await apiService.createProduct(productData);
        toast.success("Товар создан");
      }
      onSave();
    } catch (error) {
      toast.error("Ошибка при сохранении товара");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? "Редактировать товар" : "Добавить товар"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                Цена (сум) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Описание *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL изображения
            </label>
            <input
              type="url"
              value={formData.imageSrc}
              onChange={(e) => setFormData({ ...formData, imageSrc: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категория
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Аромат
              </label>
              <input
                type="text"
                value={formData.aroma}
                onChange={(e) => setFormData({ ...formData, aroma: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Время горения
              </label>
              <input
                type="text"
                value={formData.burnTime}
                onChange={(e) => setFormData({ ...formData, burnTime: e.target.value })}
                placeholder="60 часов"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Состав воска
              </label>
              <input
                type="text"
                value={formData.waxComposition}
                onChange={(e) => setFormData({ ...formData, waxComposition: e.target.value })}
                placeholder="Соевый воск"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цвет
              </label>
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Размер
              </label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="200 мл"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Форма
              </label>
              <input
                type="text"
                value={formData.shape}
                onChange={(e) => setFormData({ ...formData, shape: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.cottonWick}
                onChange={(e) => setFormData({ ...formData, cottonWick: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Фитиль из хлопка</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isBestseller}
                onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Хит продаж</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Новинка</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isOnSale}
                onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Акция</span>
            </label>
          </div>

          {/* SEO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Slug
            </label>
            <input
              type="text"
              value={formData.seoSlug}
              onChange={(e) => setFormData({ ...formData, seoSlug: e.target.value })}
              placeholder="vanilnaya-svecha"
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

          {/* Actions */}
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
              {loading ? "Сохранение..." : product ? "Обновить" : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

