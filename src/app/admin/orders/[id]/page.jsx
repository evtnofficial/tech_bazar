"use client";

import { use, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Package, User, Calendar, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

// In a real application, you would fetch this data from your API
const getOrderDetails = (id) => {
	return {
		id: id,
		status: "Processing",
		date: "2023-05-15",
		total: 15000,
		customer: {
			name: "John Doe",
			email: "john@example.com",
		},
		items: [
			{ id: "1", name: "Tech Blog", price: 5000 },
			{ id: "2", name: "E-commerce Store", price: 10000 },
		],
	};
};

export default function AdminOrderDetailsPage() {
	const router = useRouter();
	const params = useParams(); // Unwrap params
	const [order, setOrder] = useState(getOrderDetails(params.id));

	const handleStatusChange = async (newStatus) => {
		// In a real application, you would update the status via an API call
		setOrder({ ...order, status: newStatus });

		// Simulating an API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		toast.success("Order status updated");
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<Button
				variant='outline'
				onClick={() => router.push("/admin/orders")}
				className='mb-4'>
				Back to Orders
			</Button>

			<h1 className='text-3xl font-bold mb-6'>Order Details</h1>

			<div className='grid md:grid-cols-2 gap-6'>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<Package className='mr-2' />
							Order Information
						</CardTitle>
						<CardDescription>Order ID: {order.id}</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<div className='flex items-center'>
								<Calendar className='mr-2' />
								<span>Date: {order.date}</span>
							</div>
							<div className='flex items-center'>
								<DollarSign className='mr-2' />
								<span>
									Total: ${order.total.toLocaleString()}
								</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<div className='flex items-center space-x-2'>
							<span>Status:</span>
							<Select
								onValueChange={handleStatusChange}
								defaultValue={order.status}>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='Processing'>
										Processing
									</SelectItem>
									<SelectItem value='Shipped'>
										Shipped
									</SelectItem>
									<SelectItem value='Delivered'>
										Delivered
									</SelectItem>
									<SelectItem value='Cancelled'>
										Cancelled
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<User className='mr-2' />
							Customer Information
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<p>
								<strong>Name:</strong> {order.customer.name}
							</p>
							<p>
								<strong>Email:</strong> {order.customer.email}
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className='mt-6'>
				<CardHeader>
					<CardTitle>Order Items</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Item</TableHead>
								<TableHead className='text-right'>
									Price
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{order.items.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.name}</TableCell>
									<TableCell className='text-right'>
										${item.price.toLocaleString()}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className='flex justify-end'>
					<p className='font-bold'>
						Total: ${order.total.toLocaleString()}
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
