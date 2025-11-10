// src/components/CategoryFilter.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/api";

export default function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Категории</h3>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/catalog"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Все товары
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/catalog?category=${encodeURIComponent(category.name)}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition-colors text-sm font-medium"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

