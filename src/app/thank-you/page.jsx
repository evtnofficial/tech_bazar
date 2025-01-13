import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CheckCircle, ShoppingBag, Mail, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
	// In a real application, you would fetch the order details from your backend
	const order = {
		id: "ORD-1234567",
		total: 15000,
		items: [
			{ name: "Tech Blog", price: 5000 },
			{ name: "E-commerce Store", price: 10000 },
		],
	};

	return (
		<div className='container mx-auto px-4 py-16'>
			<div className='max-w-2xl mx-auto text-center'>
				<CheckCircle className='mx-auto h-16 w-16 text-green-500 mb-4' />
				<h1 className='text-3xl font-bold mb-4'>
					Thank You for Your Purchase!
				</h1>
				<p className='text-xl text-gray-600 mb-8'>
					Your order has been successfully placed and is being
					processed.
				</p>

				<Card className='mb-8'>
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
						<CardDescription>Order ID: {order.id}</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className='space-y-2'>
							{order.items.map((item, index) => (
								<li
									key={index}
									className='flex justify-between'>
									<span>{item.name}</span>
									<span>${item.price.toLocaleString()}</span>
								</li>
							))}
						</ul>
						<div className='mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold'>
							<span>Total</span>
							<span>${order.total.toLocaleString()}</span>
						</div>
					</CardContent>
				</Card>

				<div className='space-y-6 mb-8'>
					<div>
						<h2 className='text-xl font-semibold mb-2 flex items-center justify-center'>
							<ShoppingBag className='mr-2 h-5 w-5' />
							What's Next?
						</h2>
						<p className='text-gray-600'>
							We're processing your order and will send you a
							confirmation email shortly with further details
							about your purchase.
						</p>
					</div>
					<div>
						<h2 className='text-xl font-semibold mb-2 flex items-center justify-center'>
							<Mail className='mr-2 h-5 w-5' />
							Check Your Email
						</h2>
						<p className='text-gray-600'>
							We've sent an order confirmation to your email
							address. Please check your inbox for more
							information.
						</p>
					</div>
				</div>

				<Button asChild size='lg'>
					<Link href='/shop'>
						Continue Shopping
						<ArrowRight className='ml-2 h-5 w-5' />
					</Link>
				</Button>
			</div>
		</div>
	);
}
