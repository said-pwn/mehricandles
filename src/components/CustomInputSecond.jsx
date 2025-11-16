import { useState } from "react";

export default function NameInput({ label, name, value, onChange, required }) {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;

    // Проверка: только буквы и пробелы
    if (/[^a-zA-Zа-яА-ЯёЁ\s]/.test(val)) {
      setError("Только буквы и пробелы");
    } else {
      setError("");
      onChange(e);
    }
  };

  const handleBlur = () => {
    if (required && !value) {
      setError("Поле не может быть пустым");
    }
  };

  return (
    <div className="space-y-1 w-full">
      <label className="text-sm font-medium text-gray-700">
        {label}{required && " *"}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        placeholder="Введите фамилию"
        className={`w-full px-4 py-3 border rounded-xl bg-gray-50 
          focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
          transition-all placeholder-gray-400 ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
