import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

export default function NameInput({ label, name, value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const { texts } = useContext(LanguageContext);

  const handleChange = (e) => {
    const val = e.target.value;

    // Проверка: только буквы и пробелы
    if (/[^a-zA-Zа-яА-ЯёЁ\s]/.test(val)) {
      setError(texts.onlyletters);
    } else {
      setError("");
      onChange(e);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      setError(`${texts.failednotempty}`);
    }
  };

  return (
    <div className="relative w-full space-y-1">
      <label
        className={`absolute left-4 top-3 text-gray-500 text-sm transition-all
          ${isFocused || value ? "-translate-y-3 text-xs text-indigo-600 bg-white px-1" : ""}`}
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        placeholder={isFocused || value ? texts.entersecond : ""}
        className={`w-full px-4 pt-5 pb-3 border rounded-xl bg-gray-50 
          outline-none text-gray-900 transition-all
          ${error ? "border-red-500" : "border-gray-300"} 
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
