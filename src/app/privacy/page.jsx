import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Eye, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8 text-center'>
				Privacy Policy
			</h1>

			<Card className='mb-8'>
				<CardHeader>
					<CardTitle className='flex items-center'>
						<Shield className='h-6 w-6 text-primary mr-2' />
						Our Commitment to Privacy
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-lg'>
						At Tech Bazar, we are committed to protecting your
						privacy and ensuring the security of your personal
						information. This Privacy Policy explains how we
						collect, use, and safeguard your data.
					</p>
				</CardContent>
			</Card>

			<div className='grid md:grid-cols-3 gap-8 mb-8'>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<Eye className='h-6 w-6 text-blue-500 mr-2' />
							Data Collection
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							We collect information you provide directly to us,
							such as when you create an account, list a digital
							asset, or make a purchase.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<Lock className='h-6 w-6 text-green-500 mr-2' />
							Data Protection
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							We implement a variety of security measures to
							maintain the safety of your personal information.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<Shield className='h-6 w-6 text-red-500 mr-2' />
							Your Rights
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p>
							You have the right to access, correct, or delete
							your personal information at any time.
						</p>
					</CardContent>
				</Card>
			</div>

			<ScrollArea className='h-[600px] rounded-md border p-4'>
				<Accordion type='single' collapsible className='w-full'>
					<AccordionItem value='item-1'>
						<AccordionTrigger>
							1. Information We Collect
						</AccordionTrigger>
						<AccordionContent>
							<p>
								We collect information you provide directly to
								us, such as when you create an account, list a
								digital asset, or make a purchase. This may
								include:
							</p>
							<ul className='list-disc list-inside mt-2'>
								<li>Name and contact information</li>
								<li>Payment information</li>
								<li>
									Details about digital assets you're buying
									or selling
								</li>
								<li>Communications you have with us</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-2'>
						<AccordionTrigger>
							2. How We Use Your Information
						</AccordionTrigger>
						<AccordionContent>
							<p>We use the information we collect to:</p>
							<ul className='list-disc list-inside mt-2'>
								<li>
									Provide, maintain, and improve our services
								</li>
								<li>
									Process transactions and send related
									information
								</li>
								<li>
									Send you technical notices and support
									messages
								</li>
								<li>Respond to your comments and questions</li>
								<li>
									Communicate with you about products,
									services, offers, and events
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-3'>
						<AccordionTrigger>
							3. Information Sharing and Disclosure
						</AccordionTrigger>
						<AccordionContent>
							<p>
								We do not sell your personal information. We may
								share your information with:
							</p>
							<ul className='list-disc list-inside mt-2'>
								<li>
									Third-party service providers who perform
									services on our behalf
								</li>
								<li>
									Law enforcement or other parties in response
									to a legal request
								</li>
								<li>
									Other users as necessary to facilitate
									transactions
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-4'>
						<AccordionTrigger>4. Data Security</AccordionTrigger>
						<AccordionContent>
							<p>
								We take reasonable measures to help protect your
								personal information from loss, theft, misuse,
								unauthorized access, disclosure, alteration, and
								destruction. These measures include:
							</p>
							<ul className='list-disc list-inside mt-2'>
								<li>Encryption of sensitive data</li>
								<li>Regular security audits</li>
								<li>Secure data storage practices</li>
								<li>Employee training on data protection</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-5'>
						<AccordionTrigger>
							5. Your Rights and Choices
						</AccordionTrigger>
						<AccordionContent>
							<p>You have the right to:</p>
							<ul className='list-disc list-inside mt-2'>
								<li>
									Access the personal information we hold
									about you
								</li>
								<li>
									Correct inaccuracies in your personal
									information
								</li>
								<li>Delete your personal information</li>
								<li>
									Object to the processing of your personal
									information
								</li>
								<li>
									Request the restriction of processing of
									your personal information
								</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-6'>
						<AccordionTrigger>
							6. Cookies and Tracking Technologies
						</AccordionTrigger>
						<AccordionContent>
							<p>
								We use cookies and similar tracking technologies
								to collect information about your browsing
								activities. You can manage your cookie
								preferences through your browser settings.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-7'>
						<AccordionTrigger>
							7. International Data Transfers
						</AccordionTrigger>
						<AccordionContent>
							<p>
								Your information may be transferred to and
								processed in countries other than your own. We
								ensure appropriate safeguards are in place to
								protect your information in these cases.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-8'>
						<AccordionTrigger>
							8. Changes to This Policy
						</AccordionTrigger>
						<AccordionContent>
							<p>
								We may update this Privacy Policy from time to
								time. We will notify you of any changes by
								posting the new Privacy Policy on this page and
								updating the "Last Updated" date.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-9'>
						<AccordionTrigger>9. Contact Us</AccordionTrigger>
						<AccordionContent>
							<p>
								If you have any questions about this Privacy
								Policy, please contact us at
								privacy@techbazar.com.
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</ScrollArea>

			<p className='mt-8 text-center text-sm text-gray-500'>
				Last Updated: January 12, 2025
			</p>
		</div>
	);
}
