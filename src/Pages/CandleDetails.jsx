import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GiCandleHolder, GiCandleLight } from "react-icons/gi";
import { MdLocalFireDepartment } from "react-icons/md";
// import { FaCandle } from "react-icons/fa6"; // просто замена FaCandles

export default function CandleDetails() {
  const location = useLocation();
  const { texts } = useContext(LanguageContext);
  const [added, setAdded] = useState(false);

  const product = {
    id: 101,
    name: "Candle 1",
    price: 10000,
    href: "#",
    color: "White",
    quantity: 1,
    imageSrc: "https://i.ibb.co/bfhswYk/IMG-5487.jpg",
    imageAlt: "Model wearing plain white basic tee.",
    description:
      "The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options.",
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      "The 6-Pack includes two black, two white, and two heather gray Basic Tees.",
  };

  // ✅ Добавляем товар в корзину
  const handleAddToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = savedCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existing) {
      updatedCart = savedCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...savedCart, { ...product, quantity: 1 }];
    }

    // ✅ сохраняем в localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAdded(true);

const isMobile = window.innerWidth < 640;

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

    // ✅ Отправляем ивент для обновления Cart
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
              <div className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl shadow-md">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Инфо */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <p className="mt-4 text-2xl text-gray-900">
                {product.price.toLocaleString("ru-RU")} сум
              </p>

              <div className="mt-10 flex flex-col gap-4">
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

          {/* Описание */}
          <div className="mt-16 max-w-3xl">
            <p className="text-base text-gray-900">{product.description}</p>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <ul
                role="list"
                className="list-disc space-y-2 pl-4 text-sm text-gray-600 mt-4"
              >
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <p className="mt-4 mb-10 text-sm text-gray-600">
                {product.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
