import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, AlertTriangle, Scale } from "lucide-react";

export default function TermsOfServicePage() {
	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8 text-center'>
				Terms of Service
			</h1>

			<Card className='mb-8'>
				<CardHeader>
					<CardTitle className='flex items-center'>
						<Scale className='h-6 w-6 text-primary mr-2' />
						Legal Agreement
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-lg'>
						Welcome to Tech Bazar. By using our services, you agree
						to comply with and be bound by the following terms and
						conditions. Please read these carefully. If you do not
						agree with any part of these terms, you may not use our
						services.
					</p>
				</CardContent>
			</Card>

			<div className='grid md:grid-cols-2 gap-8 mb-8'>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<CheckCircle className='h-6 w-6 text-green-500 mr-2' />
							What You Can Expect From Us
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='list-disc list-inside space-y-2'>
							<li>
								A secure and efficient marketplace for digital
								assets
							</li>
							<li>Protection of your personal information</li>
							<li>Fair and transparent transaction processes</li>
							<li>
								Timely customer support and dispute resolution
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<AlertTriangle className='h-6 w-6 text-yellow-500 mr-2' />
							What We Expect From You
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='list-disc list-inside space-y-2'>
							<li>
								Accurate and truthful information about your
								digital assets
							</li>
							<li>
								Compliance with all applicable laws and
								regulations
							</li>
							<li>
								Respect for other users and their intellectual
								property
							</li>
							<li>
								Timely communication and fulfillment of
								obligations
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>

			<ScrollArea className='h-[600px] rounded-md border p-4'>
				<Accordion type='single' collapsible className='w-full'>
					<AccordionItem value='item-1'>
						<AccordionTrigger>
							1. Acceptance of Terms
						</AccordionTrigger>
						<AccordionContent>
							By accessing or using Tech Bazar, you agree to be
							bound by these Terms of Service and all applicable
							laws and regulations. If you do not agree with any
							part of these terms, you may not use our services.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-2'>
						<AccordionTrigger>
							2. User Responsibilities
						</AccordionTrigger>
						<AccordionContent>
							You are responsible for maintaining the
							confidentiality of your account and password. You
							agree to accept responsibility for all activities
							that occur under your account or password.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-3'>
						<AccordionTrigger>
							3. Listing and Selling
						</AccordionTrigger>
						<AccordionContent>
							When listing a digital asset for sale, you must
							provide accurate and complete information about the
							asset. You must have the legal right to sell the
							asset and transfer ownership to the buyer.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-4'>
						<AccordionTrigger>4. Buying</AccordionTrigger>
						<AccordionContent>
							When purchasing a digital asset, you agree to
							complete the transaction if you are the winning
							bidder or if you have agreed to buy the asset at the
							listed price.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-5'>
						<AccordionTrigger>
							5. Fees and Payments
						</AccordionTrigger>
						<AccordionContent>
							Tech Bazar charges fees for using our services.
							These fees are clearly stated before you complete a
							transaction. You agree to pay all applicable fees.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-6'>
						<AccordionTrigger>
							6. Prohibited Activities
						</AccordionTrigger>
						<AccordionContent>
							You may not use Tech Bazar for any illegal or
							unauthorized purpose. You must not, in the use of
							the service, violate any laws in your jurisdiction.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-7'>
						<AccordionTrigger>
							7. Intellectual Property
						</AccordionTrigger>
						<AccordionContent>
							The content, organization, graphics, design,
							compilation, magnetic translation, digital
							conversion and other matters related to the Site are
							protected under applicable copyrights, trademarks
							and other proprietary rights.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-8'>
						<AccordionTrigger>
							8. Limitation of Liability
						</AccordionTrigger>
						<AccordionContent>
							Tech Bazar shall not be liable for any indirect,
							incidental, special, consequential or punitive
							damages, including without limitation, loss of
							profits, data, use, goodwill, or other intangible
							losses.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-9'>
						<AccordionTrigger>
							9. Modifications to Terms
						</AccordionTrigger>
						<AccordionContent>
							Tech Bazar reserves the right to modify these terms
							at any time. We will provide notice of significant
							changes by posting an announcement on our website.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-10'>
						<AccordionTrigger>10. Governing Law</AccordionTrigger>
						<AccordionContent>
							These Terms shall be governed and construed in
							accordance with the laws of [Your Jurisdiction],
							without regard to its conflict of law provisions.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</ScrollArea>

			<p className='mt-8 text-center text-sm text-gray-500'>
				By using Tech Bazar, you acknowledge that you have read,
				understood, and agree to be bound by these Terms of Service.
			</p>
		</div>
	);
}
