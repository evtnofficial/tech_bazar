"use client";

import { useContext, useEffect, useState } from "react";
import ProfileLayout from "@/components/profile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "../../../../context/authContext";
import axios from "axios";

export default function UpdateProfilePage() {
	const { user } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		userId: "",
		username: "",
		email: "",
	});

	// Prefill form data when the user context is available
	useEffect(() => {
		if (user) {
			setFormData({
				userId: user._id,
				username: user.username,
				email: user.email,
			});
		}
	}, [user]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.put("/api/auth/update", formData);
			console.log("Profile updated successfully:", response.data.user);

			localStorage.removeItem("user");
			localStorage.setItem("user", JSON.stringify(response.data.user));
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.error("Error updating profile:", error);
		}
	};

	return (
		<ProfileLayout isAdmin={user?.role === "admin"}>
			<h1 className='text-2xl font-bold mb-4'>Update Profile</h1>
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow rounded-lg p-6'>
				<div className='space-y-4'>
					<div>
						<Label htmlFor='username'>Name</Label>
						<Input
							id='username'
							name='username'
							value={formData.username}
							onChange={handleInputChange}
							placeholder='Enter your name'
						/>
					</div>
					<div>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							name='email'
							type='email'
							value={formData.email}
							onChange={handleInputChange}
							placeholder='Enter your email'
							disabled={isLoading}
						/>
					</div>
					<Button type='submit'>
						{isLoading ? "Updating....." : "Update Profile"}
					</Button>
				</div>
			</form>
		</ProfileLayout>
	);
}
