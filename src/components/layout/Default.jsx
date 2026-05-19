import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import heroVideo from "../../assets/videos/hero-video.mp4";

export default function DefaultLayout() {
	return (
		<main className="relative min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
			<video
				className="absolute inset-0 h-full w-full object-cover"
				autoPlay
				loop
				muted
				playsInline
			>
				<source src={heroVideo} type="video/mp4"></source>
			</video>
			<div className="absolute inset-0 h-full w-full bg-black/50"></div>
			<div className="w-[90vw] md:w-[70vw] lg:w-[40vw] 2xl:w-[30vw] backdrop-blur-md bg-black/55 p-6 md:p-9 rounded-2xl shadow-soft border border-white/10 ring-1 ring-white/5 relative">
				<div className="w-full flex flex-col gap-8">
					<Header />
					<Outlet />
					<Footer />
				</div>
			</div>
		</main>
	);
}