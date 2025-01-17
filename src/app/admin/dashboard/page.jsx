"use client";

import { useEffect, useState } from "react";
import ProfileLayout from "@/components/profile-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Users,
	DollarSign,
	ShoppingBag,
	TrendingUp,
	BarChart2,
} from "lucide-react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import axios from "axios";

const dashboardData = {
	totalSales: 150000,
	totalEarnings: 15000,
	recentSales: [
		{ name: "Jan", amount: 4000 },
		{ name: "Feb", amount: 3000 },
		{ name: "Mar", amount: 5000 },
		{ name: "Apr", amount: 4500 },
		{ name: "May", amount: 6000 },
		{ name: "Jun", amount: 5500 },
	],
};

export default function AdminDashboardPage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState([]);

	const [data] = useState(dashboardData);

	const getAllProducts = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get("/api/admin/allproducts");
			setProducts(response.data?.products);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const getAllUsers = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get("/api/admin/allusers");
			setUsers(response.data.users || []);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProducts();
		getAllUsers();
	}, []);

	return (
		<ProfileLayout isAdmin={true}>
			<h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
				<DashboardCard
					title='Total Users'
					value={users?.length}
					icon={<Users className='h-8 w-8 text-blue-600' />}
				/>
				<DashboardCard
					title='Total Sales'
					value={`$${data.totalSales.toLocaleString()}`}
					icon={<DollarSign className='h-8 w-8 text-green-600' />}
				/>
				<DashboardCard
					title='Total Earnings'
					value={`$${data.totalEarnings.toLocaleString()}`}
					icon={<TrendingUp className='h-8 w-8 text-yellow-600' />}
				/>
				<DashboardCard
					title='Total Products'
					value={products?.length}
					icon={<ShoppingBag className='h-8 w-8 text-purple-600' />}
				/>
			</div>

			<Card className='mb-6'>
				<CardHeader>
					<CardTitle className='flex items-center'>
						<BarChart2 className='mr-2 h-6 w-6' />
						Recent Sales
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='h-[300px]'>
						<ResponsiveContainer width='100%' height='100%'>
							<BarChart data={data.recentSales}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis />
								<Tooltip />
								<Bar dataKey='amount' fill='#8884d8' />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</ProfileLayout>
	);
}

function DashboardCard({ title, value, icon }) {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{value}</div>
			</CardContent>
		</Card>
	);
}
