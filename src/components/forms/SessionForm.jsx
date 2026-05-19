import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ReasonOption from "../ui/ReasonOption";
import WifiTermsDialog from "../dialogs/WifiTermsDialog";
import { SessionApi } from "../../api";
import parsePhoneNumberFromString from "libphonenumber-js";

export default function SessionForm() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		phone: "",
		reason: "",
		code: "",
	});

	const [errors, setErrors] = useState({});
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [showTermsDialog, setShowTermsDialog] = useState(false);
	const [termsShake, setTermsShake] = useState(false);
	const [loading, setLoading] = useState(false);

	const reasons = [
		{ label: "Breakfast", value: "breakfast" },
		{ label: "Lunch", value: "lunch" },
		{ label: "Dinner", value: "dinner" },
		{ label: "Work / Other", value: "other" },
	];

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const triggerTermsError = () => {
		setTermsShake(true);
		setTimeout(() => setTermsShake(false), 500);
	};

	const validateForm = () => {
		let newErrors = {};

		const phone = parsePhoneNumberFromString(formData.phone, "AE");

		if (!formData.phone.trim()) {
			newErrors.phone = "PHONE NUMBER IS REQUIRED";
		} else if (!phone || !phone.isValid()) {
			newErrors.phone = "ENTER A VALID UAE PHONE NUMBER";
		}

		if (!formData.reason) {
			newErrors.reason = "PLEASE SELECT A REASON";
		}

		if (!acceptedTerms) {
			newErrors.terms = "PLEASE ACCEPT WIFI TERMS";
			triggerTermsError();
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			setLoading(true);
			try {
				const payload = {
					phone: formData.phone,
					reason: formData.reason,
				};

				if (formData.code.trim()) {
					payload.order_code = formData.code.trim();
				}

				const response = await SessionApi.createSession(payload);

				// Convert nanoseconds to minutes
				const durationMinutes = Math.floor(
					response.data.duration / 60_000_000_000,
				);

				window.location.href = `http://192.168.9.1:2050/success?duration=${durationMinutes}`;
				setLoading(false);
			} catch (err) {
				setLoading(false);
				if (err.response?.status === 403) {
					window.location.href = "http://192.168.9.1:2050/limit-reached";
					return;
				}
				if (err.response?.data?.field) {
					setErrors((prev) => ({
						...prev,
						[err.response.data.field]: err.response.data.message,
					}));
				} else if (err.response?.data?.message) {
					setErrors((prev) => ({ ...prev, code: err.response.data.message }));
				} else {
					setErrors((prev) => ({
						...prev,
						code: "SOMETHING WENT WRONG. PLEASE TRY AGAIN.",
					}));
				}
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
				<div className="flex flex-col gap-3">
					<Input
						name="phone"
						placeholder="PHONE NUMBER"
						value={formData.phone}
						onChange={handleChange}
						required
					/>

					{errors.phone && (
						<p className="text-[9px] text-red-500 uppercase tracking-widest pl-1">
							{errors.phone}
						</p>
					)}

					<Input
						name="code"
						placeholder="ORDER ID (OPTIONAL)"
						value={formData.code}
						onChange={handleChange}
					/>

					<p className="text-[9px] text-white/35 tracking-[0.2em] uppercase pl-1">
						ORDER ID UNLOCKS 6 HOURS
					</p>

					{errors.code && (
						<p className="text-[9px] text-white/70 uppercase tracking-widest pl-1">
							{errors.code}
						</p>
					)}
				</div>

				<div className="flex flex-col gap-3">
					<p className="text-[9px] text-white/40 tracking-[0.25em] uppercase font-bold text-left">
						Reason for visit
					</p>

					<div className="grid grid-cols-2 gap-2">
						{reasons.map((option, index) => (
							<ReasonOption
								key={index}
								label={option.label}
								checked={formData.reason === option.value}
								onChange={() =>
									setFormData({ ...formData, reason: option.value })
								}
							/>
						))}
					</div>

					{errors.reason && (
						<p className="text-[9px] text-red-500 uppercase tracking-widest text-left">
							{errors.reason}
						</p>
					)}
				</div>

				<div
					className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
						errors.terms
							? "border-red-500/70 bg-red-500/10"
							: "border-white/10 bg-white/5"
					} ${termsShake ? "animate-shake" : ""}`}
				>
					<input
						id="wifi-terms"
						type="checkbox"
						checked={acceptedTerms}
						onChange={(e) => {
							setAcceptedTerms(e.target.checked);
							if (errors.terms) {
								setErrors((prev) => ({ ...prev, terms: "" }));
							}
						}}
						className="h-4 w-4 accent-olive"
					/>

					<label
						htmlFor="wifi-terms"
						className={`text-[10px] uppercase tracking-[0.2em] ${
							errors.terms ? "text-red-300" : "text-white/60"
						}`}
					>
						I accept the guest{" "}
						<button
							type="button"
							onClick={() => setShowTermsDialog(true)}
							className="text-olive underline underline-offset-4 hover:text-white transition"
						>
							WiFi terms
						</button>
					</label>
				</div>

				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? (
						<span className="flex items-center justify-center gap-2">
							<svg
								className="animate-spin h-4 w-4 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8v8z"
								/>
							</svg>
							CONNECTING...
						</span>
					) : (
						"Connect to WiFi"
					)}
				</Button>
			</form>

			<WifiTermsDialog
				open={showTermsDialog}
				onClose={() => setShowTermsDialog(false)}
			/>
		</>
	);
}
