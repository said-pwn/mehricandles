// src/Pages/admin/Categories.jsx
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Tag } from "lucide-react";
import apiService from "../../services/api";
import { toast } from "react-toastify";
import CategoryModal from "../../components/admin/CategoryModal";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await apiService.getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту категорию?")) return;
    
    try {
      await apiService.deleteCategory(id);
      toast.success("Категория удалена");
      loadCategories();
    } catch (error) {
      toast.error("Ошибка при удалении категории");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка категорий...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Управление категориями</h1>
          <p className="text-gray-600 mt-2">Создание и редактирование категорий</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          <Plus size={20} />
          Добавить категорию
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Поиск категорий..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Tag className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{category.name || "Без названия"}</h3>
                    {category.type && (
                      <p className="text-sm text-gray-600">Тип: {category.type}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {category.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
              )}

              {category.seoSlug && (
                <p className="text-xs text-gray-500 mb-4">Slug: {category.seoSlug}</p>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Edit size={16} />
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
          <Tag className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 text-lg mb-2">Нет категорий</p>
          <p className="text-gray-500 text-sm mb-4">Создайте первую категорию, нажав кнопку "Добавить категорию"</p>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 text-lg">Категории не найдены</p>
          <p className="text-gray-500 text-sm mt-2">Попробуйте изменить поисковый запрос</p>
        </div>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSave={() => {
          loadCategories();
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
      />
    </div>
  );
}

