"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AuthContext } from "../../../context/authContext";

export default function CheckoutPage() {
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		name: user?.username || "",
		email: user?.email || "",
		address: user?.address || "",
		city: user?.city || "",
		country: user?.country || "",
		zipCode: user?.zipcode || "",
		paymentMethod: "credit_card",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically process the payment and create the order
		console.log("Order submitted:", formData);
		// Redirect to a thank you page or order confirmation page
		router.push("/thank-you");
	};

	// Dummy order summary data (in a real app, this would come from your cart state or API)
	const orderSummary = {
		subtotal: 15000,
		commission: 1500,
		total: 16500,
	};

	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8'>Checkout</h1>
			<div className='grid md:grid-cols-3 gap-8'>
				<div className='md:col-span-2'>
					<form onSubmit={handleSubmit}>
						<Card>
							<CardHeader>
								<CardTitle>Billing Details</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='grid grid-cols-2 gap-4'>
									<div>
										<Label htmlFor='name'>Full Name</Label>
										<Input
											id='name'
											name='name'
											value={formData.name}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div>
										<Label htmlFor='email'>Email</Label>
										<Input
											id='email'
											name='email'
											type='email'
											value={formData.email}
											onChange={handleInputChange}
											required
										/>
									</div>
								</div>
								<div>
									<Label htmlFor='address'>Address</Label>
									<Input
										id='address'
										name='address'
										value={formData.address}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div className='grid grid-cols-3 gap-4'>
									<div>
										<Label htmlFor='city'>City</Label>
										<Input
											id='city'
											name='city'
											value={formData.city}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div>
										<Label htmlFor='country'>Country</Label>
										<Input
											id='country'
											name='country'
											value={formData.country}
											onChange={handleInputChange}
											required
										/>
									</div>
									<div>
										<Label htmlFor='zipCode'>
											Zip Code
										</Label>
										<Input
											id='zipCode'
											name='zipCode'
											value={formData.zipCode}
											onChange={handleInputChange}
											required
										/>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className='mt-8'>
							<CardHeader>
								<CardTitle>Payment Method</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup
									defaultValue='credit_card'
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											paymentMethod: value,
										}))
									}>
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
							</CardContent>
							<CardFooter>
								<Button type='submit' className='w-full'>
									Complete Purchase
								</Button>
							</CardFooter>
						</Card>
					</form>
				</div>
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className='space-y-2'>
							<div className='flex justify-between'>
								<span>Subtotal</span>
								<span>
									${orderSummary.subtotal.toLocaleString()}
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Commission (10%)</span>
								<span>
									${orderSummary.commission.toLocaleString()}
								</span>
							</div>
							<div className='flex justify-between font-bold'>
								<span>Total</span>
								<span>
									${orderSummary.total.toLocaleString()}
								</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
