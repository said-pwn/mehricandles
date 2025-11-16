import { Link, useParams } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { useContext, useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCandleLight } from "react-icons/gi";
import apiService from "../services/api";
import { products as defaultProducts } from "../data/products";
import { AlignLeft, StickyNote } from "lucide-react";

export default function CandleDetails() {
  const { id } = useParams();
  const { texts } = useContext(LanguageContext);
  const [added, setAdded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");

  const loadProduct = useCallback(async () => {
    try {
      const productId = typeof id === 'string' ? parseInt(id) : id;
      const data = await apiService.getProduct(productId);
      if (data) {
        setProduct(data);
      } else {
        // Fallback на дефолтные продукты
        const defaultProduct = defaultProducts.find(p => {
          const pId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
          return pId === productId;
        }) || defaultProducts[0];
        setProduct(defaultProduct);
      }
    } catch (error) {
      console.error("Ошибка загрузки товара:", error);
      const productId = typeof id === 'string' ? parseInt(id) : id;
      const defaultProduct = defaultProducts.find(p => {
        const pId = typeof p.id === 'string' ? parseInt(p.id) : p.id;
        return pId === productId;
      }) || defaultProducts[0];
      setProduct(defaultProduct);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (loading || !product) {
    return <div className="text-center py-12">{texts.loading}</div>;
  }

  // ✅ Добавляем товар в корзину
  const handleAddToCart = () => {
    if (!product || !product.id) {
      toast.error(texts.productNotFoundError || "Ошибка: товар не найден");
      return;
    }

    // Если у товара есть набор типов, требуем выбор
    if (Array.isArray(product.types) && product.types.length > 0 && !selectedType) {
      toast.error(texts.pleaseSelectType);
      return;
    }

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = savedCart.find((item) => item.id === product.id && (!product.types || item.type === selectedType));

    let updatedCart;
    if (existing) {
      updatedCart = savedCart.map((item) =>
        item.id === product.id && (!product.types || item.type === selectedType)
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      const cartItem = { ...product, quantity: 1 };
      if (selectedType) cartItem.type = selectedType;
      updatedCart = [...savedCart, cartItem];
    }

    // ✅ сохраняем в localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAdded(true);

    // ✅ показываем тост с иконкой
    toast.success(
      <div className="flex items-center gap-2">
        <GiCandleLight/>
        <span>{texts.added}</span>
      </div>,
      {
       position: isMobile ? "top-right" : "bottom-right",
autoClose: 1800,
hideProgressBar: true,
closeButton: false,
pauseOnHover: false,
draggable: true,
style: {
fontSize: "14px",
padding: "6px 10px",
borderRadius: "8px",
width: isMobile ? "fit-content" : "auto",
marginTop: isMobile ? "10px" : "0",
},
theme: "colored",
      }
    );

    // ✅ Отправляем ивент для обновления Cart и Navbar
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: updatedCart }));

    // убираем "Добавлено!" через 2 сек
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white">
      <ToastContainer />
      <div className="pt-6">
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Фото */}
            <div className="flex justify-center items-start">
              <div className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl shadow-md bg-gray-100">
                {product.imageSrc ? (
                  <img
                    alt={product.imageAlt || product.name || "Товар"}
                    src={product.imageSrc}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <span>{texts.noImage}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Инфо */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name || "Товар"}
              </h1>
              {product.price && (
                <p className="mt-4 text-2xl text-gray-900">
                  {product.price.toLocaleString("ru-RU", { useGrouping: true })} {texts.count}
                </p>
              )}

              {/* Product Details */}
              <div className="mt-6 space-y-2">
                {product.category && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{texts.categoryLabel}</span> {product.category}
                  </p>
                )}
                {product.aroma && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{texts.aromaLabel}</span> {product.aroma}
                  </p>
                )}
                {product.burnTime && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{texts.burnTimeLabel}</span> {product.burnTime}
                  </p>
                )}
                {product.waxComposition && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{texts.waxCompositionLabel}</span> {product.waxComposition}
                  </p>
                )}
                {product.cottonWick && (
                  <p className="text-sm text-green-600 font-semibold">{texts.cottonWickLabel}</p>
                )}
                {product.size && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{texts.sizeLabel}</span> {product.size}
                  </p>
                )}
                {product.color && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{texts.colorLabel}</span> {product.color}
                  </p>
                )}
                {product.shape && (
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{texts.shapeLabel}</span> {product.shape}
                  </p>
                )}
              </div>

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.isBestseller && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    🔥 {texts.hit}
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ✨ {texts.new2}
                  </span>
                )}
                {product.isOnSale && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ {texts.sale}
                  </span>
                )}
              </div>

              <div className="mt-8">
                {Array.isArray(product.types) && product.types.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{texts.selectTypeLabel}</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">{texts.selectPlaceholder}</option>
                      {product.types.map((t, idx) => (
                        <option key={idx} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex w-full items-center justify-center rounded-md px-8 py-3 text-base font-medium transition ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {added ? texts.aded : texts.Add}
                </button>

                <Link
                  to="/catalog"
                  className="text-center w-full rounded-md border border-indigo-600 px-8 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  {texts.back}
                </Link>
              </div>
            </div>
          </div>

         
 <div className="mt-10 mb-5 max-w-3xl">
  {product.description && (
    <div className="bg-gray-300 border border-gray-300  rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="flex items-center text-lg font-semibold text-black mb-3">
       
         <AlignLeft className="w-5 h-5 text-indigo-900 mr-2" />
        {texts.description}
      </h3>
      <p className="text-black  leading-relaxed whitespace-pre-line">
        {product.description}
      </p>
    </div>
  )}



            {product.highlights && product.highlights.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">{texts.highlights}</h3>
                <ul
                  role="list"
                  className="list-disc space-y-2 pl-4 text-sm text-gray-600 mt-4"
                >
                  {product.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.details && (
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">{texts.details}</h2>
                <p className="mt-4 mb-10 text-sm text-gray-600">
                  {product.details}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
