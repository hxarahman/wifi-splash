export default function Input({ type, name, placeholder, onChange, value }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      className="w-full bg-transparent border-b border-white/20 p-4 text-sm font-sans text-off-white focus:border-olive focus:placeholder:opacity-50 outline-none transition-all placeholder:text-white/30 uppercase tracking-[0.2em]"
      onChange={onChange}
    />
  );
}