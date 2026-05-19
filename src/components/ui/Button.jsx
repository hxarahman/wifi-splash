export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-olive py-4 mt-4 text-white font-bold uppercase tracking-[0.2em] hover:bg-cab-black hover:text-olive border-olive border transition-all duration-300 animate-pulse-glow cursor-pointer"
    >
      {children}
    </button>
  );
}