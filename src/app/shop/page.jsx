"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
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
import { products } from "@/lib/products";

export default function ShopPage() {
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get("q") || "";
	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [priceFilter, setPriceFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 6;

	useEffect(() => {
		const filtered = products.filter(
			(product) =>
				(searchQuery === "" ||
					product.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase())) &&
				(categoryFilter === "all" || product.type === categoryFilter) &&
				(priceFilter === "" || product.price <= priceFilter)
		);
		setFilteredProducts(filtered);
		setCurrentPage(1);
	}, [searchQuery, categoryFilter, priceFilter]);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8'>Shop Digital Assets</h1>

			<div className='mb-8 flex flex-col md:flex-row justify-between gap-4'>
				<Input
					type='search'
					placeholder='Search products...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className='md:w-1/3'
				/>
				<Select onValueChange={(value) => setCategoryFilter(value)}>
					<SelectTrigger className='md:w-1/4'>
						<SelectValue placeholder='All categories' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All categories</SelectItem>
						<SelectItem value='website'>Websites</SelectItem>
						<SelectItem value='facebook'>Facebook Pages</SelectItem>
						<SelectItem value='instagram'>
							Instagram Accounts
						</SelectItem>
						<SelectItem value='youtube'>
							YouTube Channels
						</SelectItem>
					</SelectContent>
				</Select>
				<Input
					type='number'
					placeholder='Max price'
					value={priceFilter}
					onChange={(e) =>
						setPriceFilter(
							e.target.value ? Number(e.target.value) : ""
						)
					}
					className='md:w-1/4'
				/>
			</div>

			{currentProducts.length === 0 ? (
				<p className='text-center text-xl'>No products found.</p>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{currentProducts.map((product) => (
						<Card key={product.id} className='flex flex-col'>
							<CardHeader>
								<Image
									src={product.images[0]}
									alt={product.name}
									width={300}
									height={200}
									className='w-full h-48 object-cover rounded-t-lg'
								/>
							</CardHeader>
							<CardContent className='flex-grow'>
								<CardTitle className='mb-2'>
									{product.name}
								</CardTitle>
								<p className='text-sm text-gray-600 mb-2'>
									{product.description}
								</p>
								<p className='font-semibold'>
									Price: ${product.price.toLocaleString()}
								</p>
								<p className='text-sm'>Type: {product.type}</p>
							</CardContent>
							<CardFooter>
								<Button asChild className='w-full'>
									<Link href={`/product/${product.id}`}>
										View Details
									</Link>
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			)}

			{filteredProducts.length > productsPerPage && (
				<div className='mt-8 flex justify-center'>
					{Array.from(
						{
							length: Math.ceil(
								filteredProducts.length / productsPerPage
							),
						},
						(_, i) => (
							<Button
								key={i}
								onClick={() => paginate(i + 1)}
								variant={
									currentPage === i + 1
										? "default"
										: "outline"
								}
								className='mx-1'>
								{i + 1}
							</Button>
						)
					)}
				</div>
			)}
		</div>
	);
}
