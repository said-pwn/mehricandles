import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiService from "../services/api";
import { LanguageContext } from "../context/LanguageContext";
import CustomSelect from "../components/CustomSelect";
import CustomDatePicker from "../components/CustomDate";
import CustomInput from "../components/CustomInput";
import CustomTextarea from "../components/CustomTextarea";
import PhoneInput from "../components/PhoneInput";
import CustomInputSecond from "../components/CustomInputSecond";




function SuccessModal({ open, order, onClose }) {
  if (!open) return null;
    const { texts } = useContext(LanguageContext);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h3 className="text-2xl font-bold">{texts.orderPlacedTitle}</h3>
          <p className="opacity-90 mt-1">{texts.orderPlacedDesc}</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">{texts.firstName}</p>
              <p className="font-semibold text-gray-900">{order?.firstName} {order?.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500">{texts.phone}</p>
              <p className="font-semibold text-gray-900">{order?.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">{texts.deliveryMethod}</p>
              <p className="font-semibold text-gray-900">{order?.delivery || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500">{texts.paymentMethod}</p>
              <p className="font-semibold text-gray-900">{order?.payment || "—"}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-2">{texts.orderContents}</p>
            <div className="space-y-2 max-h-48 overflow-auto pr-1">
              {order?.items?.map((it) => (
                <div key={it.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">{it.name} × {it.quantity}</span>
                  <span className="font-semibold">{(it.price * it.quantity).toLocaleString("ru-RU")} {texts.count}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-3 mt-3 border-t">
              <span className="text-gray-600">{texts.total}</span>
              <span className="text-xl font-bold text-gray-900">{(order?.total || 0).toLocaleString("ru-RU")} {texts.count}</span>
            </div>
          </div>

          {order?.comment && (
            <div className="bg-white rounded-xl border p-4">
              <p className="text-sm text-gray-500">{texts.orderComment}</p>
              <p className="text-gray-900 mt-1">{order.comment}</p>
            </div>
          )}
        </div>
        <div className="p-6 pt-0 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">{texts.close}</button>
          <a href="/catalog" className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">{texts.toCatalog}</a>
        </div>
      </div>
    </div>
  );
}

export default function OrderForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    delivery: "",
    payment: "",
    comment: "",
    date: "",
    connectMethod: "",
    connectMethodComment: "",
  });
  const [successOpen, setSuccessOpen] = useState(false);
const [lastOrder, setLastOrder] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { texts } = useContext(LanguageContext);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const ErrorText = ({ children }) => (
  <p className="text-red-500 text-sm mt-1 font-medium">
    {children}
  </p>
);


 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const total = calculateTotal();
    const order = {
      ...formData,
      items: cartItems,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Сохраняем локально
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    order.id = Date.now();
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // === ОТПРАВКА В TELEGRAM ===
    const serverUrl =
      (typeof import.meta !== "undefined" &&
        import.meta.env &&
        import.meta.env.VITE_API_SERVER)
        ? import.meta.env.VITE_API_SERVER
        : "https://botttttew-1.onrender.com/api/order";

    try {
      const res = await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: "+998" + formData.phone.replace(/\D/g, ""),
    delivery: formData.delivery,
    payment: formData.payment,
    date: formData.date,
    comment: formData.comment,
    connectMethod: formData.connectMethod,
    connectMethodComment: formData.connectMethodComment,
    items: cartItems, // <--- исправлено
    total: calculateTotal(), // <--- исправлено
  }),
      });

      if (!res.ok) {
        throw new Error(texts.serverResponseError);
      }
    } catch (err) {
      console.error("Ошибка отправки в Telegram:", err);
      toast.error(texts.telegramErrorToast);
    }

    // Очищаем корзину
    localStorage.removeItem("cart");
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: [] }));

    toast.success(texts.orderSuccessToast);
    setLastOrder(order);
    setSuccessOpen(true);

    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      delivery: "",
      payment: "",
      comment: "",
      date: "",
      connectMethod: "",
    });

  } catch (error) {
    console.error("Ошибка:", error);
    toast.error(texts.orderErrorToast);
  } finally {
    setLoading(false);
  }
};

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{texts.empty}</h2>
        <p className="text-gray-600 mb-6">{texts.emptyCartPrompt}</p>
        <a
          href="/catalog"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {texts.goToCatalog}
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{texts.checkoutTitle}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{texts.yourOrder}</h3>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{texts.quantity} {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  {(item.price * item.quantity).toLocaleString("ru-RU")} {texts.count}
                </p>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">{texts.total}:</span>
              <span className="text-2xl font-bold text-gray-900">
                {calculateTotal().toLocaleString("ru-RU")} {texts.count}
              </span>
            </div>
          </div>
        </div>

        {/* Order Form */}
  <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-6">

  <CustomInput 
    label={texts.firstName}
    name="firstName"
    required
    value={formData.firstName}
    onChange={handleChange}
  />

<CustomInputSecond 
    value={formData.lastName}
    onChange={handleChange}
    required
    label={texts.lastName}
    name="lastName"/>

<PhoneInput
  label="Телефон"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  required
/>



  <CustomSelect 
    label={texts.deliveryMethod}
    value={formData.delivery}
    required
    options={[texts.deliveryOptionCourier, texts.deliveryOptionPost]}
    onChange={(val) => setFormData({ ...formData, delivery: val })}
  />

  <CustomSelect 
    label={texts.paymentMethod}
    value={formData.payment}
    required
    options={[texts.paymentOptionCardTransfer]}
    onChange={(val) => setFormData({ ...formData, payment: val })}
  />

  <CustomDatePicker
    label={texts.shippingDate}
    required
    value={formData.date}
    onChange={(val) => setFormData({ ...formData, date: val })}
  />

  <CustomTextarea
    label={texts.orderComment}
    value={formData.comment}
    name="comment"
    onChange={handleChange}
  />

  <CustomSelect
    label={texts.chooseMethodc}
    required
    value={formData.connectMethod}
    options={[texts.tg, texts.inst, texts.phoneCall]}
    onChange={(val) => setFormData({ ...formData, connectMethod: val })}
  />

  <CustomTextarea
    label={texts.commentPlaceholder}
    name="connectMethodComment"
    required
    value={formData.connectMethodComment}
    onChange={handleChange}
  />

  <button
    type="submit"
    disabled={loading}
    className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all
      ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
    `}
  >
    {loading ? texts.submitProcessing : texts.checkout}
  </button>

</form>


      </div>

<SuccessModal
  open={successOpen}
  order={lastOrder || {}}
  onClose={() => {
    setSuccessOpen(false);
    setLastOrder(null);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      delivery: "",
      payment: "",
      comment: "",
      date: "",
      connectMethod: "",
      connectMethodComment: "",
    });
    navigate("/");
  }}
/>
    </div>
  );
}
