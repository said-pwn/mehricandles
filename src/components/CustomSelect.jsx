import { useState, useRef, useEffect, useContext } from "react";
import { IoChevronDown } from "react-icons/io5";
import { LanguageContext } from "../context/LanguageContext";

export default function CustomSelect({ label, value, options, onChange, required }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef();
  const { texts } = useContext(LanguageContext);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-1 relative w-full" ref={containerRef}>
      <label className="text-sm font-medium text-gray-700">{label}{required && " *"}</label>

      <div
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 border rounded-xl bg-gray-50 flex justify-between items-center cursor-pointer
          transition-all ${open ? "ring-2 ring-indigo-500 border-transparent bg-white" : "border-gray-300"}
        `}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || texts.chooseselect}
        </span>
        <IoChevronDown className={`text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown */}
      <div
        className={`absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border max-h-60 overflow-auto transition-all
        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => {
              onChange(opt);
              setOpen(false);
            }}
            className={`px-4 py-3 cursor-pointer transition-colors duration-200
              hover:bg-indigo-50 ${opt === value ? "bg-indigo-100 font-semibold" : ""}
            `}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}
