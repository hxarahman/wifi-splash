export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="mt-auto pt-6 flex flex-col items-center space-y-2">
			<p className="text-xs text-center tracking-[0.5em] uppercase text-white/60">
				© {year} BLK CAB®. <br />
				All rights reserved.
			</p>
		</footer>
	);
}
