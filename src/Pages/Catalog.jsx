// src/Pages/Catalog.jsx
import { Link, useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Search, Filter, SortAsc, SortDesc, X, Star, Sparkles, Flame } from "lucide-react";
import { LanguageContext } from "../context/LanguageContext";
import apiService from "../services/api";
// removed defaultProducts fallback to ensure site uses only API data

export default function Catalog() {
  const { texts } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "default");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Обновляем URL при изменении фильтров
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (sortBy !== "default") params.set("sort", sortBy);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, sortBy]);

  const loadData = async () => {
    try {
      // Load products first (critical path)
      try {
        const productsData = await apiService.getProducts();
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (e) {
        console.error("Ошибка загрузки товаров:", e);
        setProducts([]);
      }

      // Load categories independently (non-blocking)
      try {
        const categoriesData = await apiService.getCategories();
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (e) {
        console.warn("Категории недоступны, продолжаем без них:", e);
        setCategories([]);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toLocaleString("ru-RU", { useGrouping: true });
  };

  // Фильтрация и сортировка
  let filteredProducts = products.filter((product) => {
    const matchesSearch = !searchTerm || 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.aroma?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      product.category === selectedCategory ||
      (selectedCategory === "bestseller" && product.isBestseller) ||
      (selectedCategory === "new" && product.isNew) ||
      (selectedCategory === "sale" && product.isOnSale);
    
    return matchesSearch && matchesCategory;
  });

  // Сортировка
  if (sortBy === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortBy === "name-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  } else if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB - dateA;
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{texts.loadingCatalog}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{texts.category || "Каталог"}</h1>
          <p className="text-gray-600">{texts.findPerfectCandle}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={texts.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="default">{texts.poumolchaniyu}</option>
                <option value="price-asc">{texts.sortByPriceAsc}</option>
                <option value="price-desc">{texts.sortByPriceDesc}</option>
                <option value="name-asc">{texts.sortByNameAsc}</option>
                <option value="newest">{texts.sortByNewest}</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={20} />
                
              </button>
            </div>
          </div>

          {/* Category Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === "all"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {texts.allProducts}
                </button>
                <button
                  onClick={() => setSelectedCategory("bestseller")}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedCategory === "bestseller"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Flame size={16} />
                  {texts.hit}
                </button>
                <button
                  onClick={() => setSelectedCategory("new")}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedCategory === "new"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Sparkles size={16} />
                  {texts.new || "Новинки"}
                </button>
                <button
                  onClick={() => setSelectedCategory("sale")}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    selectedCategory === "sale"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Star size={16} />
                  {texts.sales}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          {texts.foundProducts}: {filteredProducts.length}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
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
                      <span>{texts.noImage}</span>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.isBestseller && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                        <Flame size={12} className="inline mr-1" />
                        {texts.hit2 || "Хит"}
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                        <Sparkles size={12} className="inline mr-1" />
                        {texts.new2 || "Новинка"}
                      </span>
                    )}
                  </div>
                  {product.isOnSale && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                      <Star size={12} className="inline mr-1" />
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
                  
                  {product.aroma && (
                    <p className="text-sm text-gray-600 mb-2">Аромат: {product.aroma}</p>
                  )}
                  
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xl font-bold text-gray-900">
                      {formatPrice(product.price)} {texts.count}
                    </p>
                    {product.burnTime && (
                      <p className="text-xs text-gray-500">⏱ {product.burnTime}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg mb-2">{texts.notFound}</p>
            <p className="text-gray-500 text-sm">{texts.tryChangeFilters}</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSortBy("default");
              }}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {texts.resetFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
