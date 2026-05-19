import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layout/Default";
import Main from "./pages/Main";
import Success from "./pages/Success";
import WelcomeBack from './pages/WelcomeBack';
import NotFound from "./pages/NotFound";
import LimitReached from './pages/LimitReached';

export default function App() {
	const [authStatus, setAuthStatus] = useState(null); // null = loading

	useEffect(() => {
		fetch("/status")
			.then((res) => res.json())
			.then((data) => setAuthStatus(data.status))
			.catch(() => setAuthStatus("unauthenticated"));
	}, []);

	if (authStatus === null) {
		return null; // loading — show nothing briefly
	}

	return (
		<Router>
			<Routes>
				<Route path="/" element={<DefaultLayout />}>
					<Route
						index
						element={
							authStatus === "authenticated" ? <WelcomeBack /> : <Main />
						}
					/>
					<Route path="success" element={<Success />} />
					<Route path="*" element={<NotFound />} />
					<Route path="limit-reached" element={<LimitReached />} />
				</Route>
			</Routes>
		</Router>
	);
}
