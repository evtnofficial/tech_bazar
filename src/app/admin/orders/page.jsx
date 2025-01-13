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

export default function AdminOrdersPage() {
	// In a real application, you would fetch the orders from your backend
	const orders = [
		{
			id: "1",
			user: "John Doe",
			product: "Tech Blog",
			date: "2023-05-01",
			status: "Completed",
			total: 5000,
		},
		{
			id: "2",
			user: "Jane Smith",
			product: "E-commerce Store",
			date: "2023-05-15",
			status: "Processing",
			total: 10000,
		},
		{
			id: "3",
			user: "Bob Johnson",
			product: "YouTube Channel",
			date: "2023-05-20",
			status: "Pending",
			total: 7500,
		},
	];

	return (
		<ProfileLayout isAdmin={true}>
			<h1 className='text-2xl font-bold mb-4'>All Orders</h1>
			<div className='bg-white shadow rounded-lg overflow-hidden'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order ID</TableHead>
							<TableHead>User</TableHead>
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
								<TableCell>{order.user}</TableCell>
								<TableCell>{order.product}</TableCell>
								<TableCell>{order.date}</TableCell>
								<TableCell>{order.status}</TableCell>
								<TableCell>
									${order.total.toLocaleString()}
								</TableCell>
								<TableCell>
									<Button asChild size='sm'>
										<Link
											href={`/admin/orders/${order.id}`}>
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
