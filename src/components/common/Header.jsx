import React from "react";

export default function Header() {
	return (
		<header className="flex flex-col items-center space-y-2 text-center">
			<h1 className="font-accent text-4xl text-off-white tracking-tighter uppercase leading-none">
				BLK <span className="text-olive">CAB</span>
			</h1>
			<div className="h-0.5 w-8 bg-olive"></div>
			<p className="text-[9px] tracking-[0.4em] uppercase text-white/60">
				(People & Coffee)
			</p>
		</header>
	);
}
