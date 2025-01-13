"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Package, User, Calendar, DollarSign, FileDown } from "lucide-react";
import toast from "react-hot-toast";

// Simulating API data fetching
const getOrderDetails = (id) => ({
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
});

export default function UserOrderDetailsPage({ params }) {
	const router = useRouter();
	const [order, setOrder] = useState(null); // Initialize state to handle data
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Unwrapping params as it's a Promise
		(async () => {
			const unwrappedParams = await params; // Awaiting the params Promise
			const orderDetails = getOrderDetails(unwrappedParams.id);
			setOrder(orderDetails);
			setLoading(false);
		})();
	}, [params]);

	const handleDownloadInvoice = () => {
		toast.success("Invoice Downloaded");
	};

	if (loading) {
		return <p>Loading...</p>; // Show a loading state
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<Button
				variant='outline'
				onClick={() => router.push("/profile/orders")}
				className='mb-4'>
				Back to My Orders
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
							<div className='flex items-center'>
								<Package className='mr-2' />
								<span>Status: {order.status}</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<Button onClick={handleDownloadInvoice}>
							<FileDown className='mr-2' />
							Download Invoice
						</Button>
					</CardFooter>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<User className='mr-2' />
							Your Information
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
