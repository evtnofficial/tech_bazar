"use client";

import { useEffect, useState } from "react";
import ProfileLayout from "@/components/profile-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState([]);
	const [editingUser, setEditingUser] = useState(null);

	const handleEditChange = (e) => {
		if (editingUser) {
			setEditingUser({
				...editingUser,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleRoleChange = (value) => {
		if (editingUser) {
			setEditingUser({
				...editingUser,
				role: value,
			});
		}
	};

	const handleEditSubmit = async () => {
		if (editingUser) {
			const payload = {
				userId: editingUser._id,
				username: editingUser.username,
				email: editingUser.email,
				role: editingUser.role,
			};

			try {
				setLoading(true);
				const response = await axios.put(
					"/api/admin/update-users",
					payload
				);
				if (response.data?.success) {
					toast.success(response.data?.message);
					getAllUsers();
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}
	};

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
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>S.No.</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Join Date</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user, index) => (
							<TableRow key={user._id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{user.username}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									{new Date(user.createdAt).toDateString()}
								</TableCell>
								<TableCell>
									<Dialog>
										<DialogTrigger asChild>
											<Button
												size='sm'
												onClick={() =>
													setEditingUser(user)
												}>
												Edit
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Edit User
												</DialogTitle>
											</DialogHeader>
											{editingUser && (
												<form
													onSubmit={(e) => {
														e.preventDefault();
														handleEditSubmit();
													}}
													className='space-y-4'>
													<div>
														<Label htmlFor='name'>
															Name
														</Label>
														<Input
															id='name'
															name='username'
															value={
																editingUser.username
															}
															onChange={
																handleEditChange
															}
														/>
													</div>
													<div>
														<Label htmlFor='email'>
															Email
														</Label>
														<Input
															id='email'
															name='email'
															type='email'
															value={
																editingUser.email
															}
															onChange={
																handleEditChange
															}
														/>
													</div>
													<div>
														<Label htmlFor='role'>
															Role
														</Label>
														<Select
															onValueChange={
																handleRoleChange
															}
															defaultValue={
																editingUser.role
															}>
															<SelectTrigger>
																<SelectValue placeholder='Select role' />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value='user'>
																	User
																</SelectItem>
																<SelectItem value='admin'>
																	Admin
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<Button type='submit'>
														Save Changes
													</Button>
												</form>
											)}
										</DialogContent>
									</Dialog>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</ProfileLayout>
	);
}
