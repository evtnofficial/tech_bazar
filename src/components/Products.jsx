"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import axios from "axios";

export default function ProductSection() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [priceFilter, setPriceFilter] = useState("");
	const [visibleProducts, setVisibleProducts] = useState(5);

	const filteredProducts = products.filter(
		(product) =>
			(categoryFilter === "all" || product.type === categoryFilter) &&
			(priceFilter === "" || product.price <= priceFilter)
	);

	const handleLoadMore = () => {
		setVisibleProducts((prev) => prev + 5);
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
		<section className='py-16 bg-gray-50'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold mb-8 text-center'>
					Featured Digital Assets
				</h2>

				<div className='mb-8 flex flex-col md:flex-row justify-between gap-4'>
					<div className='w-full md:w-64'>
						<Label htmlFor='category-filter' className='mb-2 block'>
							Filter by category
						</Label>
						<Select
							onValueChange={(value) => setCategoryFilter(value)}>
							<SelectTrigger id='category-filter'>
								<SelectValue placeholder='All categories' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>
									All categories
								</SelectItem>
								<SelectItem value='website'>
									Websites
								</SelectItem>
								<SelectItem value='facebook'>
									Facebook Pages
								</SelectItem>
								<SelectItem value='instagram'>
									Instagram Accounts
								</SelectItem>
								<SelectItem value='youtube'>
									YouTube Channels
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className='w-full md:w-64'>
						<Label htmlFor='price-filter' className='mb-2 block'>
							Max price
						</Label>
						<Input
							id='price-filter'
							type='number'
							placeholder='Enter max price'
							value={priceFilter}
							onChange={(e) =>
								setPriceFilter(
									e.target.value ? Number(e.target.value) : ""
								)
							}
						/>
					</div>
				</div>

				<div className='space-y-6'>
					{filteredProducts
						.slice(0, visibleProducts)
						.map((product) => (
							<ProductListItem
								key={product._id}
								product={product}
							/>
						))}
				</div>

				{visibleProducts < filteredProducts.length && (
					<div className='mt-8 text-center'>
						<Button onClick={handleLoadMore} className='px-6 py-2'>
							Load More
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}

function ProductListItem({ product }) {
	return (
		<Card>
			<div className='flex flex-col md:flex-row'>
				<CardHeader className='md:w-1/4'>
					<Image
						src={`${product?.images[0]}`}
						alt={product.title}
						width={300}
						height={200}
						className='w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none'
					/>
				</CardHeader>
				<CardContent className='flex-1 p-6'>
					<Link
						href={`/product/${product._id}`}
						className='text-2xl font-semibold hover:underline mb-2 block'>
						{product.title}
					</Link>
					<p className='text-gray-600 mb-4'>{product.description}</p>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<p className='font-semibold'>Category:</p>
							<p>
								{product.type.charAt(0).toUpperCase() +
									product.type.slice(1)}
							</p>
						</div>
						<div>
							<p className='font-semibold'>Age:</p>
							<p>{product.age} months</p>
						</div>
						<div>
							<p className='font-semibold'>Monetization:</p>
							<p>{product.monetization}</p>
						</div>
						<div>
							<p className='font-semibold'>Monthly Earnings:</p>
							<p>${product.earningsPerMonth.toLocaleString()}</p>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col justify-between p-6 md:w-1/4'>
					<div>
						<p className='text-lg font-semibold mb-2'>Price:</p>
						<p className='text-2xl font-bold'>
							${product.price.toLocaleString()}
						</p>
					</div>
					<Button asChild className='w-full mt-4'>
						<Link href={`/product/${product._id}`}>
							View Details
						</Link>
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
}
