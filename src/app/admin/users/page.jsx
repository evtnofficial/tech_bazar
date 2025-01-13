"use client";
import ProfileLayout from "@/components/profile-layout";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	// const users = [
	// 	{ id: "1", name: "John Doe", email: "john@example.com", role: "user" },
	// 	{
	// 		id: "2",
	// 		name: "Jane Smith",
	// 		email: "jane@example.com",
	// 		role: "admin",
	// 	},
	// 	{
	// 		id: "3",
	// 		name: "Bob Johnson",
	// 		email: "bob@example.com",
	// 		role: "user",
	// 	},
	// ];

	const getAllUsers = async () => {
		try {
			setLoading(true);
			const response = await axios.get("/api/admin/allusers");
			setUsers(response.data.users || []);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<ProfileLayout isAdmin={true}>
			<h1 className='text-2xl font-bold mb-4'>All Users</h1>
			<div className='bg-white shadow rounded-lg overflow-hidden'>
				<table className='min-w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								ID
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Role
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{users.map((user) => (
							<tr key={user._id}>
								<td className='px-6 py-4 whitespace-nowrap'>
									{user._id}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{user.username}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{user.email}
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									{user.role}
								</td>
								<td className='px-6 py-4 whitespace-nowrap space-x-2'>
									<Button size='sm'>Edit</Button>
									<Button size='sm' variant='destructive'>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</ProfileLayout>
	);
}
