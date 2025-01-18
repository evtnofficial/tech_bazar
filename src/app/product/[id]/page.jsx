"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowLeft,
	DollarSign,
	Calendar,
	TrendingUp,
	Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import axios from "axios";

export default function ProductDetailsPage({ params: rawParams }) {
	const [product, setProduct] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const productId = React.use(rawParams).id;

	if (!product) {
		notFound();
	}

	const getProduct = async () => {
		try {
			setIsLoading(true);
			const response = await axios.post("/api/get-product", {
				productId,
			});
			setProduct(response.data?.product);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getProduct();
	}, []);

	const [selectedImage, setSelectedImage] = useState(0);

	return (
		<div className='container mx-auto px-4 py-8'>
			<Link
				href='/'
				className='inline-flex items-center text-primary hover:underline mb-6'>
				<ArrowLeft className='mr-2 h-4 w-4' />
				Back to listings
			</Link>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div>
					<Card className='overflow-hidden mb-4'>
						<CardHeader className='p-0'>
							<Image
								src={
									"https://www.thoughtco.com/thmb/q17Qe08HCrtbdTFVyo8e1j_Qj4E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wordpress-5be6252ac9e77c00524ca43d.jpg"
								}
								alt={`${product?.title} - Image ${
									selectedImage + 1
								}`}
								width={600}
								height={400}
								className='w-full h-auto'
							/>
						</CardHeader>
					</Card>
					<div className='grid grid-cols-4 gap-2'>
						{product?.images?.map((image, index) => (
							<button
								key={index}
								onClick={() => setSelectedImage(index)}
								className={`border-2 rounded overflow-hidden ${
									index === selectedImage
										? "border-primary"
										: "border-transparent"
								}`}>
								<Image
									src={image}
									alt={`${product.title} - Thumbnail ${
										index + 1
									}`}
									width={150}
									height={100}
									className='w-full h-auto'
								/>
							</button>
						))}
					</div>
				</div>

				<div>
					<Card>
						<CardHeader>
							<CardTitle className='text-3xl font-bold'>
								{product.title}
							</CardTitle>
							<div className='flex items-center justify-between mt-2'>
								<div className='text-2xl font-semibold text-primary'>
									${product.price?.toLocaleString()}
								</div>
								<div className='text-sm text-gray-500'>
									Category:{" "}
									{product.type?.charAt(0).toUpperCase() +
										product.type?.slice(1)}
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-gray-600 mb-6'>
								{product.description}
							</p>

							<h3 className='text-lg font-semibold mb-2'>
								Key Details
							</h3>
							<ul className='space-y-2 mb-6'>
								<li className='flex items-center'>
									<Calendar className='mr-2 h-5 w-5 text-gray-400' />
									Age: {product.age} months
								</li>
								<li className='flex items-center'>
									<TrendingUp className='mr-2 h-5 w-5 text-gray-400' />
									Monthly Earnings: $
									{product?.earningsPerMonth?.toLocaleString()}
								</li>
								<li>
									<span className='font-semibold'>
										Monetization:
									</span>{" "}
									{product.monetization}
								</li>
								<li>
									<span className='font-semibold'>
										Traffic/Reach:
									</span>{" "}
									{product?.traffic || 0} /Month
								</li>
								<li>
									<span className='font-semibold'>
										Country:
									</span>{" "}
									{product?.country}
								</li>
							</ul>

							<h3 className='text-lg font-semibold mb-2'>
								Seller Information
							</h3>
							<div className='bg-gray-50 p-4 rounded-lg'>
								<p className='font-semibold'>
									{product?.seller?.username}
								</p>
								<div className='flex items-center mt-1'>
									<span>
										({product?.seller?.totalSales} sales)
									</span>
								</div>
								<p className='text-sm text-gray-500 mt-1'>
									Member since{" "}
									{new Date(
										product?.seller?.createdAt
									)?.toDateString()}
								</p>
							</div>
						</CardContent>
						<CardFooter className='flex flex-col sm:flex-row justify-between items-center gap-4'>
							<Link href={`/checkout/${product?._id}`}>
								<Button size='lg' className='w-full sm:w-auto'>
									Purchase Now
								</Button>
							</Link>
							<Button
								size='lg'
								variant='outline'
								className='w-full sm:w-auto'>
								Contact Seller
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
