"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const forgotPassword = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/auth/forgot-password", {
				email,
			});
			toast.success(response.data.message);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='max-w-md mx-auto'>
				<div className='w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
					<div className='space-y-2 text-center'>
						<h1 className='text-3xl font-bold'>Forgot Password</h1>
						<p className='text-gray-500 dark:text-gray-400'>
							Enter your registered email address to <br /> get
							reset password link
						</p>
					</div>
					<form className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='test@example.com'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<Button
							type='button'
							onClick={forgotPassword}
							className='w-full'>
							{loading ? "Sending..." : "Send Reset Link"}
						</Button>
					</form>
					<div>
						<span>Remember password: </span>{" "}
						<Link
							href={"/login"}
							className='text-blue-500 font-semibold'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
