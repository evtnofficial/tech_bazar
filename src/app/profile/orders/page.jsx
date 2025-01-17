"use client";
import React, { useContext } from "react";
import { AuthContext } from "../../../../context/authContext";
import Link from "next/link";
import ProfileLayout from "@/components/profile-layout";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function UserOrdersPage() {
	const { user } = useContext(AuthContext);

	const orders = [
		{
			id: "1",
			product: "Tech Blog",
			date: "2023-05-01",
			status: "Completed",
			total: 5000,
		},
		{
			id: "2",
			product: "E-commerce Store",
			date: "2023-05-15",
			status: "Processing",
			total: 10000,
		},
	];

	return (
		<ProfileLayout isAdmin={user?.role === "admin"}>
			<h1 className='text-2xl font-bold mb-4'>Your Orders</h1>
			<div className='bg-white shadow rounded-lg overflow-hidden'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>Product</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order) => (
							<TableRow key={order.id}>
								<TableCell>{order.id}</TableCell>
								<TableCell>{order.product}</TableCell>
								<TableCell>{order.date}</TableCell>
								<TableCell>{order.status}</TableCell>
								<TableCell>
									${order.total.toLocaleString()}
								</TableCell>
								<TableCell>
									<Button asChild size='sm'>
										<Link
											href={`/profile/orders/${order.id}`}>
											View Details
										</Link>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</ProfileLayout>
	);
}
