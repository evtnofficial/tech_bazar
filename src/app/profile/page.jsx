"use client";
import React, { useContext } from "react";
import ProfileLayout from "@/components/profile-layout";
import { AuthContext } from "../../../context/authContext";

export default function ProfilePage() {
	const { user } = useContext(AuthContext);

	return (
		<ProfileLayout isAdmin={user?.role === "admin"}>
			<h1 className='text-2xl font-bold mb-4'>Profile</h1>
			<div className='bg-white shadow rounded-lg p-6'>
				<p>
					<strong>Name:</strong> {user?.username}
				</p>
				<p>
					<strong>Email:</strong> {user?.email}
				</p>
				<p>
					<strong>Role:</strong> {user?.role}
				</p>
			</div>
		</ProfileLayout>
	);
}
