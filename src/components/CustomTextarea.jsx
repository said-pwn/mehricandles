export default function CustomTextarea({ label, name, value, onChange, required, placeholder }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}{required && " *"}</label>
      <textarea
        name={name}
        rows="3"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 
        focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      ></textarea>
    </div>
  );
}
