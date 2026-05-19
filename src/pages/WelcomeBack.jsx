import React, { useEffect, useState } from "react";

export default function WelcomeBack() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		fetch("/status")
			.then((res) => res.json())
			.then((data) => setSession(data))
			.catch(() => setSession(null));
	}, []);

	const formatRemaining = (expiresAt) => {
		if (!expiresAt) return "Limited";
		const now = new Date();
		const expiry = new Date(expiresAt);
		const diffMs = expiry - now;
		if (diffMs <= 0) return "Expired";

		const totalMinutes = Math.floor(diffMs / 60000);
		if (totalMinutes < 60)
			return `${totalMinutes} Minute${totalMinutes !== 1 ? "s" : ""}`;
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		if (minutes === 0) return `${hours} Hour${hours !== 1 ? "s" : ""}`;
		return `${hours}h ${minutes}m`;
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
					Welcome <br />
					<span className="text-olive">Back</span>
				</h1>
			</header>

			<div className="py-4 border-y border-white/5 space-y-2">
				<p className="text-white/60 text-[10px] uppercase tracking-[0.3em]">
					{session ? formatRemaining(session.expires_at) : "—"} Remaining
				</p>
				<p className="text-off-white text-sm">
					You are connected to BLK CAB WiFi
				</p>
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
