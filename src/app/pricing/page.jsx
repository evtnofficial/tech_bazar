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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, HelpCircle, ArrowRight } from "lucide-react";

export default function PricingPage() {
	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-4 text-center'>
				Simple, Transparent Pricing
			</h1>
			<p className='text-xl text-center mb-12 text-gray-600'>
				No hidden fees. Just a straightforward commission on successful
				deals.
			</p>

			<div className='max-w-3xl mx-auto'>
				<Card className='mb-12 transition-shadow hover:shadow-lg'>
					<CardHeader>
						<CardTitle className='text-3xl font-bold'>
							10% Commission
						</CardTitle>
						<CardDescription className='text-lg'>
							Only pay when your deal is successful
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						{[
							"10% commission on the final sale price of your digital asset",
							"No upfront costs or listing fees",
							"Access to our secure escrow service included",
							"Expert support throughout the entire process",
						].map((item, index) => (
							<div key={index} className='flex items-start'>
								<CheckCircle className='h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-1' />
								<p>{item}</p>
							</div>
						))}
					</CardContent>
					<CardFooter>
						<Button asChild className='w-full'>
							<Link href='/register'>Get Started</Link>
						</Button>
					</CardFooter>
				</Card>

				<h2 className='text-2xl font-semibold mb-6'>How It Works</h2>
				<div className='space-y-8'>
					{[
						{
							title: "List Your Digital Asset",
							description:
								"Create a detailed listing for your website, social media account, or YouTube channel. It's free to list!",
						},
						{
							title: "Negotiate and Agree on a Price",
							description:
								"Connect with potential buyers and agree on a sale price for your digital asset.",
						},
						{
							title: "Complete the Sale",
							description:
								"Use our secure escrow service to safely transfer ownership and funds.",
						},
						{
							title: "Pay the Commission",
							description:
								"Once the sale is complete, we deduct our 10% commission from the final sale price.",
						},
					].map((step, index) => (
						<div key={index} className='flex items-start'>
							<div className='bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0'>
								{index + 1}
							</div>
							<div>
								<h3 className='font-semibold text-lg'>
									{step.title}
								</h3>
								<p className='text-gray-600'>
									{step.description}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className='mt-12 bg-gray-100 rounded-lg p-6'>
					<h2 className='text-2xl font-semibold mb-4 flex items-center'>
						<HelpCircle className='h-6 w-6 text-primary mr-2' />
						Frequently Asked Questions
					</h2>
					<Accordion type='single' collapsible className='w-full'>
						{[
							{
								question: "Are there any hidden fees?",
								answer: "No, we only charge the 10% commission on successful sales. There are no listing fees or other hidden charges.",
							},
							{
								question: "When do I pay the commission?",
								answer: "The commission is automatically deducted from the final sale price when the transaction is completed through our platform.",
							},
							{
								question:
									"What if my digital asset doesn't sell?",
								answer: "You only pay if your asset sells. If it doesn't sell, you don't owe us anything.",
							},
							{
								question:
									"Is the commission negotiable for high-value assets?",
								answer: "For high-value assets, please contact our sales team to discuss potential custom arrangements.",
							},
						].map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger>
									{faq.question}
								</AccordionTrigger>
								<AccordionContent>
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				<div className='mt-12 text-center'>
					<h2 className='text-2xl font-semibold mb-4'>
						Ready to Buy or Sell Digital Assets?
					</h2>
					<p className='text-gray-600 mb-6'>
						Join Tech Bazar today and start your journey in the
						digital asset marketplace.
					</p>
					<Button asChild size='lg'>
						<Link href='/register'>
							Create Your Account
							<ArrowRight className='ml-2 h-5 w-5' />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
