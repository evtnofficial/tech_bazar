"use client";

import React, { useEffect, useState } from "react";
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
import { Package, User, Calendar, DollarSign, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminOrderDetailsPage({ params: rawParams }) {
	const router = useRouter();
	const [order, setOrder] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const orderId = React.use(rawParams).id;

	const getOrder = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post("/api/get-order", {
				orderId,
			});
			setOrder(response.data?.order);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getOrder();
	}, []);

	const handleStatusChange = async (status) => {
		const payload = {
			orderId,
			status,
		};
		try {
			setIsLoading(true);
			const response = await axios.put(
				"/api/admin/update-order",
				payload
			);
			if (response?.data?.success) {
				toast.success(response?.data?.message);
				getOrder();
			}
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			toast.error(error?.data?.message);
			console.log(error);
		}
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
						<CardDescription>
							Order ID: {order?._id}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<div className='flex items-center'>
								<Calendar className='mr-2' />
								<span>
									Date:{" "}
									{new Date(order?.createdAt).toDateString()}
								</span>
							</div>
							<div className='flex items-center'>
								<DollarSign className='mr-2' />
								<span>
									Total: ${order?.amount?.toLocaleString()}
								</span>
							</div>
							<div className='flex items-center'>
								<TrendingUp className='mr-2' />
								<span>Status: {order?.status}</span>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<div className='flex items-center space-x-2'>
							<span>Update Status:</span>
							<Select
								onValueChange={handleStatusChange}
								defaultValue={order?.status}>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='Processing'>
										Processing
									</SelectItem>
									<SelectItem value='Failed'>
										Failed
									</SelectItem>
									<SelectItem value='Completed'>
										Completed
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
								<strong>Name:</strong> {order?.user?.username}
							</p>
							<p>
								<strong>Email:</strong> {order?.user?.email}
							</p>
							<p>
								<strong>Phone:</strong> {order?.user?.phone}
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
							<TableRow>
								<TableCell>{order?.product?.title}</TableCell>
								<TableCell className='text-right'>
									${order?.product?.price?.toLocaleString()}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className='flex justify-end'>
					<p className='font-bold'>
						Total: ${order?.amount?.toLocaleString()}
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
