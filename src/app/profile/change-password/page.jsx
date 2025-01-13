"use client";

import { useContext, useState } from "react";
import ProfileLayout from "@/components/profile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "../../../../context/authContext";

export default function ChangePasswordPage() {
	const { user } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Implement change password logic here
		console.log("Changing password:", formData);
	};

	return (
		<ProfileLayout isAdmin={user?.role === "admin"}>
			<h1 className='text-2xl font-bold mb-4'>Change Password</h1>
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow rounded-lg p-6'>
				<div className='space-y-4'>
					<div>
						<Label htmlFor='currentPassword'>
							Current Password
						</Label>
						<Input
							id='currentPassword'
							name='currentPassword'
							type='password'
							value={formData.currentPassword}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<Label htmlFor='newPassword'>New Password</Label>
						<Input
							id='newPassword'
							name='newPassword'
							type='password'
							value={formData.newPassword}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<Label htmlFor='confirmPassword'>
							Confirm New Password
						</Label>
						<Input
							id='confirmPassword'
							name='confirmPassword'
							type='password'
							value={formData.confirmPassword}
							onChange={handleInputChange}
						/>
					</div>
					<Button type='submit'>Change Password</Button>
				</div>
			</form>
		</ProfileLayout>
	);
}
