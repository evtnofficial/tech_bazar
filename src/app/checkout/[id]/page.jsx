"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { AuthContext } from "../../../../context/authContext";
import toast from "react-hot-toast";

export default function CheckoutPage({ params: rawParams }) {
	const [product, setProduct] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const productId = React.use(rawParams).id;
	const router = useRouter();
	const [paymentMethod, setPaymentMethod] = useState("credit_card");
	const { user } = useContext(AuthContext);

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

	const handlePaymentMethodChange = (value) => {
		setPaymentMethod(value);
	};

	const payload = {
		user: user?._id,
		product: product?._id,
		amount: product.price,
		status: "pending",
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const response = await axios.post("/api/create-order", payload);
			console.log(response.data);

			console.log("Processing payment with method:", paymentMethod);
			if (response.data.success) {
				toast.success(response.data?.message);
				router.push(`/thank-you/${response?.data?.order?._id}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8'>Checkout</h1>
			<div className='grid md:grid-cols-2 gap-8'>
				<Card>
					<CardHeader>
						<CardTitle>Product Details</CardTitle>
					</CardHeader>
					<CardContent className='space-y-4'>
						<h2 className='text-2xl font-semibold'>
							{product.title}
						</h2>
						<p className='text-gray-600'>{product.description}</p>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Label>Type</Label>
								<p>{product.type}</p>
							</div>
							<div>
								<Label>Age</Label>
								<p>{product.age} months</p>
							</div>
							<div>
								<Label>Monetization</Label>
								<p>{product.monetization}</p>
							</div>
							<div>
								<Label>Monthly Earnings</Label>
								<p>
									$
									{product?.earningsPerMonth?.toLocaleString()}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<div className='flex justify-between'>
								<span>{product.title}</span>
								<span>${product?.price?.toLocaleString()}</span>
							</div>
							<Separator />
							<div className='flex justify-between font-bold'>
								<span>Total</span>
								<span>${product?.price?.toLocaleString()}</span>
							</div>
						</div>
					</CardContent>
					<CardFooter className='flex flex-col space-y-4'>
						<div className='w-full'>
							<h3 className='text-lg font-semibold mb-2'>
								Payment Method
							</h3>
							<RadioGroup
								defaultValue='credit_card'
								onValueChange={handlePaymentMethodChange}
								className='space-y-2'>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem
										value='credit_card'
										id='credit_card'
									/>
									<Label htmlFor='credit_card'>
										Credit Card
									</Label>
								</div>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem
										value='paypal'
										id='paypal'
									/>
									<Label htmlFor='paypal'>PayPal</Label>
								</div>
								<div className='flex items-center space-x-2'>
									<RadioGroupItem
										value='bank_transfer'
										id='bank_transfer'
									/>
									<Label htmlFor='bank_transfer'>
										Bank Transfer
									</Label>
								</div>
							</RadioGroup>
						</div>

						{paymentMethod === "credit_card" && (
							<div className='w-full p-4 bg-gray-100 rounded-md'>
								<p>
									Credit card payment selected. In a real
									application, you would see a form for card
									details here.
								</p>
							</div>
						)}

						{paymentMethod === "paypal" && (
							<div className='w-full p-4 bg-gray-100 rounded-md'>
								<p>
									PayPal selected. In a real application, you
									would be redirected to PayPal for payment.
								</p>
							</div>
						)}

						{paymentMethod === "bank_transfer" && (
							<div className='w-full p-4 bg-gray-100 rounded-md'>
								<p>
									Bank transfer selected. In a real
									application, you would see bank details for
									transfer here.
								</p>
							</div>
						)}

						<Button onClick={handleSubmit} className='w-full mt-4'>
							Complete Purchase
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
