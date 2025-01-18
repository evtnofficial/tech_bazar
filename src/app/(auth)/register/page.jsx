"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		username: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = { ...errors };

		if (formData.username.length < 3) {
			newErrors.username = "Username must be at least 3 characters.";
			isValid = false;
		}

		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address.";
			isValid = false;
		}

		if (formData.phone.length < 8) {
			newErrors.phone = "Phone No. is Required.";
			isValid = false;
		}
		if (formData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters.";
			isValid = false;
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (validateForm()) {
				setIsLoading(true);
				const response = await axios.post(
					"/api/auth/register",
					formData
				);
				if (response.data.success) {
					toast.success(res.data.message);
					setIsLoading(false);
					// Redirect to home page after successful registration
					router.push("/login");
				}
			}
		} catch (error) {
			setIsLoading(false);
			toast.error(error.response.data.message);
			console.log(error);
		}
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='max-w-md mx-auto'>
				<h1 className='text-3xl font-bold mb-6 text-center'>
					Create an Account
				</h1>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<Label htmlFor='username'>Username</Label>
						<Input
							id='username'
							name='username'
							placeholder='johndoe'
							value={formData.username}
							onChange={handleInputChange}
						/>
						{errors.username && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.username}
							</p>
						)}
					</div>
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
						<Label htmlFor='phone'>Phone</Label>
						<Input
							id='phone'
							name='phone'
							type='text'
							placeholder='+91 1234567890'
							value={formData.phone}
							onChange={handleInputChange}
						/>
						{errors.phone && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.phone}
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
					<div>
						<Label htmlFor='confirmPassword'>
							Confirm Password
						</Label>
						<Input
							id='confirmPassword'
							name='confirmPassword'
							type='password'
							value={formData.confirmPassword}
							onChange={handleInputChange}
						/>
						{errors.confirmPassword && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.confirmPassword}
							</p>
						)}
					</div>
					<Button
						type='submit'
						className='w-full'
						disabled={isLoading}>
						{isLoading ? "Registering..." : "Register"}
					</Button>
				</form>
				<p className='mt-4 text-center text-sm text-gray-600'>
					Already have an account?{" "}
					<Link
						href='/login'
						className='font-medium text-primary hover:underline'>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}
