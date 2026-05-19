export default function ReasonOption({ label, value, checked, onChange }) {
  if (!label) return <div className="p-4 invisible" />; // Grid spacer

  return (
    <label className={`flex items-center space-x-3 p-4 border cursor-pointer transition-all group ${
      checked ? "bg-white/10 border-olive" : "bg-white/5 border-white/10"
    }`}>
      <input
        type="radio"
        name="reason"
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-olive w-4 h-4"
      />
      <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
        checked ? "text-white" : "text-white/70"
      }`}>
        {label}
      </span>
    </label>
  );
}