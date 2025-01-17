"use client";

import axios from "axios";
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
import toast from "react-hot-toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function AdminProductsPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [editingProduct, setEditingProduct] = useState(null);

	const handleEditChange = (e) => {
		if (editingProduct) {
			setEditingProduct({
				...editingProduct,
				[e.target.name]:
					e.target.name === "price" ||
					e.target.name === "age" ||
					e.target.name === "earningsPerMonth"
						? Number(e.target.value)
						: e.target.value,
			});
		}
	};

	const handleEditSubmit = async () => {
		if (editingProduct) {
			try {
				setIsLoading(true);
				const response = await axios.put(
					"/api/admin/update-products",
					editingProduct
				);
				if (response.data?.success) {
					toast.success(response.data?.message);
					getAllProducts();
				}
				setIsLoading(false);
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		}
	};

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

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<ProfileLayout isAdmin={true}>
			<h1 className='text-2xl font-bold mb-4'>All Products</h1>
			<div className='bg-white shadow rounded-lg overflow-hidden'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Age (months)</TableHead>
							<TableHead>Monetization</TableHead>
							<TableHead>Monthly Earnings</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product, index) => (
							<TableRow key={product._id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{product.title}</TableCell>
								<TableCell>{product.type}</TableCell>
								<TableCell>
									${product.price.toLocaleString()}
								</TableCell>
								<TableCell>{product.age}</TableCell>
								<TableCell>{product.monetization}</TableCell>
								<TableCell>
									${product.earningsPerMonth.toLocaleString()}
								</TableCell>
								<TableCell>
									<Dialog>
										<DialogTrigger asChild>
											<Button
												size='sm'
												onClick={() =>
													setEditingProduct(product)
												}>
												Edit
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Edit Product
												</DialogTitle>
											</DialogHeader>
											{editingProduct && (
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
															name='title'
															value={
																editingProduct.title
															}
															onChange={
																handleEditChange
															}
														/>
													</div>
													<div>
														<Label htmlFor='type'>
															Product Type
														</Label>
														<Select
															onValueChange={(
																value
															) => {
																handleEditChange(
																	{
																		target: {
																			name: "type",
																			value,
																		},
																	}
																);
															}}
															defaultValue={
																editingProduct?.type ||
																""
															}>
															<SelectTrigger id='type'>
																<SelectValue placeholder='Select product type' />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value='website'>
																	Website
																</SelectItem>
																<SelectItem value='facebook page'>
																	Facebook
																	Page
																</SelectItem>
																<SelectItem value='instagram account'>
																	Instagram
																	Account
																</SelectItem>
																<SelectItem value='youtube channel'>
																	YouTube
																	Channel
																</SelectItem>
																<SelectItem value='google play console'>
																	Google Play
																	Console
																</SelectItem>
																<SelectItem value='adsense dashboard'>
																	Adsense
																	Dashboard
																</SelectItem>
															</SelectContent>
														</Select>
													</div>

													<div>
														<Label htmlFor='price'>
															Price
														</Label>
														<Input
															id='price'
															name='price'
															type='number'
															value={
																editingProduct.price
															}
															onChange={
																handleEditChange
															}
														/>
													</div>
													<div>
														<Label htmlFor='description'>
															Description
														</Label>
														<Input
															id='description'
															name='description'
															value={
																editingProduct.description
															}
															onChange={
																handleEditChange
															}
														/>
													</div>
													<div>
														<Label htmlFor='age'>
															Age (months)
														</Label>
														<Input
															id='age'
															name='age'
															type='number'
															value={
																editingProduct.age
															}
															onChange={
																handleEditChange
															}
														/>
													</div>
													<div>
														<Label htmlFor='monetization'>
															Monetization
														</Label>
														<Input
															id='monetization'
															name='monetization'
															value={
																editingProduct.monetization
															}
															onChange={
																handleEditChange
															}
														/>
													</div>
													<div>
														<Label htmlFor='earningsPerMonth'>
															Monthly Earnings
														</Label>
														<Input
															id='earningsPerMonth'
															name='earningsPerMonth'
															type='number'
															value={
																editingProduct.earningsPerMonth
															}
															onChange={
																handleEditChange
															}
														/>
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
