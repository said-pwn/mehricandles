// src/components/FeaturedProducts.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, Star } from "lucide-react";
import apiService from "../services/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await apiService.getProducts();
      // Показываем хиты продаж, новинки или первые 4 товара
      const featured = data
        .filter(p => p.isBestseller || p.isNew || p.isOnSale)
        .slice(0, 4);
      
      if (featured.length < 4) {
        const additional = data
          .filter(p => !featured.find(f => f.id === p.id))
          .slice(0, 4 - featured.length);
        setProducts([...featured, ...additional]);
      } else {
        setProducts(featured);
      }
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toLocaleString("ru-RU", { useGrouping: true });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Популярные товары</h2>
          <p className="text-gray-600">Выберите из нашей коллекции лучших свечей</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square w-full bg-gray-100 relative overflow-hidden">
                {product.imageSrc ? (
                  <img
                    alt={product.imageAlt || product.name}
                    src={product.imageSrc}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <span>Нет изображения</span>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {product.isBestseller && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg flex items-center gap-1">
                      <Flame size={12} />
                      Хит
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg flex items-center gap-1">
                      <Sparkles size={12} />
                      Новинка
                    </span>
                  )}
                </div>
                {product.isOnSale && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg flex items-center gap-1">
                    <Star size={12} />
                    Акция
                  </span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {product.name || "Товар"}
                </h3>
                
                {product.category && (
                  <p className="text-xs text-indigo-600 mb-2">{product.category}</p>
                )}
                
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xl font-bold text-gray-900">
                    {formatPrice(product.price)} сум
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Смотреть весь каталог
          </Link>
        </div>
      </div>
    </section>
  );
}

