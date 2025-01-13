"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../context/authContext";

export default function LoginPage() {
	const router = useRouter();
	const { setUser } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		general: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = { ...errors };

		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address.";
			isValid = false;
		}

		if (formData.password.length < 1) {
			newErrors.password = "Password is required.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			setIsLoading(true);
			try {
				const response = await axios.post("/api/auth/login", formData);
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.user)
				);
				setUser(response?.data?.user);
				toast.success(response.data.message);

				// Redirect to home page after successful login
				router.push("/");
			} catch (error) {
				setIsLoading(false);
				toast.error(error.response.data.message);
				setErrors((prev) => ({
					...prev,
					general: "Login failed. Please try again.",
				}));
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='max-w-md mx-auto'>
				<h1 className='text-3xl font-bold mb-6 text-center'>
					Log In to Tech Bazar
				</h1>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							name='email'
							type='email'
							placeholder='john@example.com'
							value={formData.email}
							onChange={handleInputChange}
						/>
						{errors.email && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.email}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							name='password'
							type='password'
							value={formData.password}
							onChange={handleInputChange}
						/>
						{errors.password && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.password}
							</p>
						)}
					</div>
					{errors.general && (
						<p className='text-sm text-red-500'>{errors.general}</p>
					)}
					<Button
						type='submit'
						className='w-full'
						disabled={isLoading}>
						{isLoading ? "Logging in..." : "Log In"}
					</Button>
				</form>
				<div className='mt-4 text-center'>
					<Link
						href='/forgot-password'
						className='text-sm text-primary hover:underline'>
						Forgot your password?
					</Link>
				</div>
				<p className='mt-4 text-center text-sm text-gray-600'>
					Don't have an account?{" "}
					<Link
						href='/register'
						className='font-medium text-primary hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
