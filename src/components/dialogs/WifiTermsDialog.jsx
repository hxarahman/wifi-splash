import { X } from "lucide-react";

export default function WifiTermsDialog({ open, onClose }) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
			<div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-black/85 p-6 shadow-2xl text-off-white">
				<button
					type="button"
					onClick={onClose}
					className="absolute right-4 top-4 text-white/50 hover:text-olive transition"
				>
					<X size={20} />
				</button>

				<h2 className="font-accent text-2xl uppercase tracking-tight mb-4">
					WiFi Terms
				</h2>

				<div className="space-y-3 text-sm leading-relaxed text-white/70">
					<p>
						Order ID unlocks up to{" "}
						<span className="text-olive font-semibold">6 hours</span> of free
						WiFi access.
					</p>

					<p>
						By connecting to BLK CAB guest WiFi, you agree to use the network
						responsibly and legally.
					</p>

					<ul className="list-disc pl-5 space-y-2">
						<li>Standard guest access may be limited to 60 minutes.</li>
						<li>WiFi is intended for customers inside the café only.</li>
						<li>Illegal activity, abuse, spam, or network misuse is prohibited.</li>
						<li>BLK CAB is not responsible for device security or data loss.</li>
					</ul>
				</div>

				<button
					type="button"
					onClick={onClose}
					className="mt-6 w-full rounded-xl bg-olive py-3 text-xs font-bold uppercase tracking-[0.25em] text-black transition hover:opacity-90"
				>
					Close
				</button>
			</div>
		</div>
	);
}