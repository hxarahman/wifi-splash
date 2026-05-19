export default function LimitReached() {
    return (
        <div className="px-10 py-2 md:p-14 text-center space-y-8 animate-in fade-in zoom-in">
            <header className="space-y-4">
                <div className="inline-block bg-red-500/80 px-3 py-1 animate-sticker-pop">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-white uppercase">
                        Limit Reached
                    </span>
                </div>
                <h1 className="font-accent text-5xl text-off-white uppercase leading-none">
                    Come Back <br />
                    <span className="text-olive">Tomorrow</span>
                </h1>
            </header>

            <div className="py-4 border-y border-white/5 space-y-2">
                <p className="text-white/60 text-[10px] uppercase tracking-[0.3em]">
                    Your daily WiFi limit has been reached
                </p>
                <p className="text-off-white text-sm">
                    Free WiFi resets at midnight
                </p>
            </div>

            <div className="space-y-3">
                <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">
                    Have an order ID?
                </p>
                <a
                    href="http://192.168.9.1:2050/"
                    className="block w-full bg-olive py-4 text-white font-bold uppercase tracking-[0.2em] hover:bg-off-white hover:text-black transition-all"
                >
                    Use Order ID to Extend
                </a>
            </div>
        </div>
    );
}