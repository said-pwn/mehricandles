import { useState } from "react";
import uzFlag from "../assets/uzb.png"; // путь к флагу

export default function PhoneInput({ label, name, value, onChange }) {
  const [error, setError] = useState("");

  // Форматирование с пробелами: "XX XXX XX XX"
  const formatNumber = (val) => {
    let digits = val.replace(/\D/g, "").slice(0, 9); // max 9 цифр
    let formatted = "";
    if (digits.length > 0) formatted += digits.substring(0, 2);
    if (digits.length >= 3) formatted += " " + digits.substring(2, 5);
    if (digits.length >= 6) formatted += " " + digits.substring(5, 7);
    if (digits.length >= 8) formatted += " " + digits.substring(7, 9);
    return formatted;
  };

  const handleChange = (e) => {
    let val = e.target.value;
    val = val.replace(/\D/g, ""); // оставляем только цифры
    onChange({ target: { name, value: val } });

    if (val.length < 9) {
      setError("Введите полный номер телефона");
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-1 w-full">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className={`flex items-center border rounded-xl px-3 py-2 transition-all
        ${error ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50"} 
        focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent`}>
        <img src={uzFlag} alt="UZ" className="w-6 h-4 mr-2 rounded-sm" />
        <span className="text-gray-700 font-semibold mr-1">+998</span>
        <input
          type="text"
          name={name}
          value={formatNumber(value)}
          onChange={handleChange}
          placeholder="99 123 45 67"
          className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-400"
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
