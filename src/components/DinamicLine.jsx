import React from "react";

export default function DynamicLine() {
  return (
    <div className="w-full h-10 overflow-hidden bg-gray-900 py-6 relative">
      {/* Контейнер для бегущей строки */}
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Двойное повторение текста для бесконечной прокрутки */}
        <span className="text-1xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-700  to-green-700 shadow-neon">
          {"Mehricandles.uz  ".repeat(20)}
        </span>
        {/* <span className="text-5xl font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-600  via-white to-green-600 shadow-neon">
          {"Mehricandles.uz  ".repeat(20)}
        </span> */}
      </div>

      {/* Кастомные стили */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            display: inline-flex;
            animation: marquee 50s linear infinite; /* быстрее */
          }

          
        `}
      </style>
    </div>
  );
}
