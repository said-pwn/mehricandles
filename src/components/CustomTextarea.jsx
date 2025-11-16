import { useState } from "react";

export default function CustomTextarea({ label, name, value, onChange, required, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full space-y-1">
      {/* Плавающий label */}
      <label
        className={`absolute left-4 top-3 text-gray-500 text-sm transition-all 
          ${isFocused || value ? "-translate-y-3 text-xs text-indigo-600 bg-gray-50 px-1" : "ыв"}`}
      >
        {label}{required && " *"}
      </label>

      <textarea
        name={name}
        rows="3"
        value={value}
        onChange={onChange}
        placeholder={isFocused || value ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 pt-5 pb-3 border border-gray-300 rounded-xl bg-gray-50 
          text-gray-900 resize-none transition-all
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
      />

      {/* Подсказка под полем */}
      <div className="text-xs text-gray-400 mt-1">
        {placeholder && !(isFocused || value) && placeholder}
      </div>
    </div>
  );
}
