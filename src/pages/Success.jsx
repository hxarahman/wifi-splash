import React from "react";

export default function Success() {
	const params = new URLSearchParams(window.location.search);
	const minutes = parseInt(params.get("duration") || "0");

	const formatWifiDuration = (minutes) => {
		if (!minutes || minutes <= 0) return "Limited";
		const units = [
			{ limit: 60, value: 1, label: "Minute" },
			{ limit: 1440, value: 60, label: "Hour" },
			{ limit: Infinity, value: 1440, label: "Day" },
		];
		const unit = units.find((u) => minutes < u.limit);
		const amount = minutes / unit.value;
		const formatted = Number.isInteger(amount) ? amount : amount.toFixed(1);
		return `${formatted} ${unit.label}${amount > 1 ? "s" : ""}`;
	};

	return (
		<div className="px-10 py-2 md:p-14 text-center space-y-8 animate-in fade-in zoom-in">
			<header className="space-y-4">
				<div className="inline-block bg-olive px-3 py-1 animate-sticker-pop">
					<span className="text-[10px] font-bold tracking-[0.3em] text-white uppercase">
						Connected
					</span>
				</div>
				<h1 className="font-accent text-5xl text-off-white uppercase leading-none">
					Enjoy Your <br />
					<span className="text-olive">Coffee</span>
				</h1>
			</header>

			<div className="py-4 border-y border-white/5 space-y-2">
				<p className="text-white/60 text-[10px] uppercase tracking-[0.3em]">
					{formatWifiDuration(minutes)} Free WiFi
				</p>
				<p className="text-off-white text-sm">Welcome to BLK CAB Coffee</p>
			</div>
			<a
				href="https://blkcab.com/menu"
				className="block w-full bg-olive py-4 text-white font-bold uppercase tracking-[0.2em] hover:bg-off-white hover:text-black transition-all"
			>
				Visit our Menu
			</a>
		</div>
	);
}
