import { useState, useEffect, useRef, useContext } from "react";
import { IoCalendar } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

export default function CustomDatePicker({ label, value, onChange, required }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const containerRef = useRef();
  const { texts } = useContext(LanguageContext);

  const today = new Date();

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue) {
      const parsed = new Date(inputValue);
      if (!isNaN(parsed)) setCurrentMonth(parsed);
    }
    onChange(inputValue);
  }, [inputValue]);

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleSelectDate = (day) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setInputValue(selected.toISOString().split("T")[0]);
    setOpen(false);
  };

  const renderDays = () => {
    const days = [];
    // пустые дни в начале месяца
    for (let i = 0; i < startDay; i++) days.push(<div key={"empty-" + i}></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth.getMonth() &&
        today.getFullYear() === currentMonth.getFullYear();

      const isSelected =
        inputValue === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          .toISOString()
          .split("T")[0];

      const isWeekend = [0, 6].includes(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).getDay());

      days.push(
        <button
          key={day}
          onClick={() => handleSelectDate(day)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all
            ${isSelected ? "bg-indigo-600 text-white shadow-lg" : ""}
            ${isToday && !isSelected ? "border-2 border-indigo-400 font-semibold text-indigo-600" : ""}
            ${isWeekend && !isSelected ? "text-red-400" : ""}
            hover:bg-indigo-100`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="relative w-full space-y-1" ref={containerRef}>
      <label className="text-sm font-medium text-gray-700">{label}{required && " *"}</label>
      <div className="relative">
        <input
          type="text"
          placeholder="YYYY-MM-DD"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setOpen(true)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 cursor-text focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <IoCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={22} />
      </div>

      {open && (
        <div className="absolute z-50 mt-2 bg-white border rounded-xl shadow-2xl p-4 w-full max-w-xs animate-fadeIn">
          <div className="flex justify-between items-center mb-3">
            <button onClick={prevMonth} className="p-1 hover:bg-gray-200 rounded-full transition">
              <FaChevronLeft />
            </button>
            <span className="font-semibold text-gray-700">
              {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
            </span>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-200 rounded-full transition">
              <FaChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 text-center mb-1 font-medium">
            {[texts.sun,texts.mon,texts.tue,texts.wed,texts.thu,texts.fri,texts.sat].map(d => <div key={d}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1 text-sm text-center">{renderDays()}</div>
        </div>
      )}
    </div>
  );
}
