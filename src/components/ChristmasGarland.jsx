import React from "react";

const bulbs = ["red", "yellow", "green", "blue", "purple", "orange"];

export default function ChristmasGarland() {
  return (
    <div className="w-full flex justify-center items-center py-4 relative">
      
      {/* Проволока гирлянды */}
      <div className="absolute top-3 w-full h-1 bg-gray-800 rounded-full z-0"></div>
    
      {/* Лампочки */}
      <div className="relative flex justify-between w-full max-w-3xl px-4 z-10">
        {bulbs.map((color, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full bg-${color}-500 shadow-lg animate-pulse`}
            style={{
              animationDelay: `${index * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
