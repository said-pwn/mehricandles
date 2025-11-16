import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function CustomSelect({ label, value, options, onChange, required }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}{required && " *"}</label>

      <div
        onClick={() => setOpen(!open)}
        className={`border px-4 py-3 rounded-xl bg-gray-50 cursor-pointer flex justify-between items-center
        ${open ? "ring-2 ring-indigo-500 border-transparent bg-white" : ""}
        `}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "—"}
        </span>
        <IoChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="mt-1 bg-white rounded-xl shadow-xl border overflow-hidden">
          {options.map((opt, i) => (
            <div
              key={i}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-indigo-50 cursor-pointer text-gray-800"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
