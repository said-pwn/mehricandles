import { useEffect, useContext, useState } from "react";
import {
Dialog,
DialogBackdrop,
DialogPanel,
DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function Cart({ open, setOpen }) {
const { texts } = useContext(LanguageContext);

const [products, setProducts] = useState(() => {
try {
const saved = localStorage.getItem("cart");
return saved ? JSON.parse(saved) : [];
} catch {
return [];
}
});

if (typeof open !== "boolean") return null;

// Слушаем обновления корзины из других компонентов
useEffect(() => {
const handleCartUpdate = (e) => {
setProducts(e.detail);
localStorage.setItem("cart", JSON.stringify(e.detail));
};
window.addEventListener("cartUpdated", handleCartUpdate);
return () => window.removeEventListener("cartUpdated", handleCartUpdate);
}, []);

// Сохраняем корзину в localStorage при изменении (только когда изменяется через UI корзины)
useEffect(() => {
if (products.length > 0 || localStorage.getItem("cart")) {
localStorage.setItem("cart", JSON.stringify(products));
}
}, [products]);

const handleRemove = (id) => {
const updated = products.filter((item) => item.id !== id);
setProducts(updated);
localStorage.setItem("cart", JSON.stringify(updated));
window.dispatchEvent(new CustomEvent("cartUpdated", { detail: updated }));
};

const handleQuantityChange = (id, type) => {
const updated = products.map((item) => {
if (item.id === id) {
const newQuantity =
type === "increase"
? item.quantity + 1
: Math.max(1, item.quantity - 1);
return { ...item, quantity: newQuantity };
}
return item;
});
setProducts(updated);
localStorage.setItem("cart", JSON.stringify(updated));
window.dispatchEvent(new CustomEvent("cartUpdated", { detail: updated }));
};

const total = products.reduce(
(sum, item) => sum + item.price * item.quantity,
0
);

const formatPrice = (price) =>
price.toLocaleString("ru-RU", { useGrouping: true });

return ( <div> <Dialog open={open} onClose={setOpen} className="relative z-10"> <DialogBackdrop className="fixed inset-0 bg-gray-500/60 backdrop-blur-sm transition-opacity duration-300" />


    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
          <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full">
            <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl rounded-l-2xl">
              <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  {texts.cart}
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {products.length === 0 ? (
                  <p className="text-gray-500 text-center mt-10">
                    {texts.cartEmpty || texts.empty}
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                          <img
                            alt={product.imageAlt}
                            src={product.imageSrc}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={product.href}>{product.name}</a>
                            </h3>
                            <p className="ml-4">
                              {formatPrice(product.price)} {texts.count}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>

                          <div className="flex flex-1 items-end justify-between text-sm mt-2">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    "decrease"
                                  )
                                }
                                className="p-1 border rounded hover:bg-gray-100 text-gray-600"
                              >
                                <FaMinus size={10} />
                              </button>
                              <p className="text-gray-800 w-6 text-center">
                                {product.quantity}
                              </p>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    "increase"
                                  )
                                }
                                className="p-1 border rounded hover:bg-gray-100 text-gray-600"
                              >
                                <FaPlus size={10} />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemove(product.id)}
                              className="font-medium text-red-500 hover:text-red-600 transition"
                            >
                              {texts.remove}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {products.length > 0 && (
                <div className="border-t mb-15 md:mb-0 border-gray-200 px-6 py-4 bg-gray-50">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>{texts.total}</p>
                    <p>{formatPrice(total)} {texts.count}</p>
                  </div>
                  
                  <div className="mt-5">
                    <Link
                      to="/checkout"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 shadow transition"
                    >
                      {texts.checkout || "Оформить заказ"}
                    </Link>
                  </div>
                  <div className="mt-6 flex  justify-center text-center text-sm text-gray-500">
                    <p>
                      {texts.or}{" "}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {texts.continue} →
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </div>
  </Dialog>
</div>


);
}
