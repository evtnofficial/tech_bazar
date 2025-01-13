import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, DollarSign, ShieldCheck, Users } from "lucide-react";

export default function HowItWorksPage() {
	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8 text-center'>
				How Tech Bazar Works
			</h1>

			<div className='grid md:grid-cols-3 gap-8 mb-16'>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<Users className='h-6 w-6 text-primary mr-2' />
							For Sellers
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ol className='list-decimal list-inside space-y-2'>
							<li>List your digital asset</li>
							<li>Set your price</li>
							<li>Respond to inquiries</li>
							<li>Negotiate and accept offers</li>
							<li>Transfer ownership</li>
							<li>Receive payment</li>
						</ol>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<DollarSign className='h-6 w-6 text-primary mr-2' />
							For Buyers
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ol className='list-decimal list-inside space-y-2'>
							<li>Browse listings</li>
							<li>Research and due diligence</li>
							<li>Make an offer</li>
							<li>Negotiate terms</li>
							<li>Secure payment</li>
							<li>Transfer and verification</li>
							<li>Confirmation and release of funds</li>
						</ol>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='flex items-center'>
							<ShieldCheck className='h-6 w-6 text-primary mr-2' />
							Our Role
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='list-disc list-inside space-y-2'>
							<li>Provide a secure marketplace</li>
							<li>Offer escrow services</li>
							<li>Facilitate dispute resolution</li>
							<li>Verify user identities and assets</li>
							<li>Ensure smooth transactions</li>
						</ul>
					</CardContent>
				</Card>
			</div>

			<div className='max-w-3xl mx-auto'>
				<h2 className='text-2xl font-semibold mb-6 text-center'>
					The Tech Bazar Process
				</h2>

				<div className='space-y-8'>
					<div>
						<h3 className='text-xl font-semibold mb-4'>
							1. Listing and Discovery
						</h3>
						<p>
							Sellers create detailed listings for their digital
							assets, including relevant metrics and information.
							Buyers browse these listings to find opportunities
							that match their interests and investment goals.
						</p>
					</div>

					<div>
						<h3 className='text-xl font-semibold mb-4'>
							2. Due Diligence and Communication
						</h3>
						<p>
							Buyers can ask questions and request additional
							information about listed assets. Tech Bazar
							encourages thorough due diligence and facilitates
							clear communication between parties.
						</p>
					</div>

					<div>
						<h3 className='text-xl font-semibold mb-4'>
							3. Negotiation and Agreement
						</h3>
						<p>
							Once interested, buyers can make offers on assets.
							Sellers can accept, reject, or counter these offers.
							Tech Bazar provides a platform for secure
							negotiations until both parties reach an agreement.
						</p>
					</div>

					<div>
						<h3 className='text-xl font-semibold mb-4'>
							4. Secure Payment and Escrow
						</h3>
						<p>
							When a deal is struck, the buyer sends payment to
							Tech Bazar's secure escrow service. This protects
							both parties during the transaction process.
						</p>
					</div>

					<div>
						<h3 className='text-xl font-semibold mb-4'>
							5. Asset Transfer and Verification
						</h3>
						<p>
							The seller transfers the digital asset to the buyer.
							Tech Bazar provides guidance and support to ensure a
							smooth transfer process. The buyer verifies that
							everything is in order.
						</p>
					</div>

					<div>
						<h3 className='text-xl font-semibold mb-4'>
							6. Completion and Funds Release
						</h3>
						<p>
							Once the buyer confirms successful transfer and
							satisfaction withHere's the continuation of the text
							stream:
						</p>
						<p>
							Once the buyer confirms successful transfer and
							satisfaction with the asset, Tech Bazar releases the
							funds to the seller, completing the transaction.
						</p>
					</div>
				</div>
			</div>

			<div className='mt-16 text-center'>
				<h2 className='text-2xl font-semibold mb-6'>
					Ready to Get Started?
				</h2>
				<p className='text-lg mb-8 max-w-2xl mx-auto'>
					Whether you're looking to sell your digital asset or invest
					in a new opportunity, Tech Bazar provides a secure and
					efficient platform for your transactions.
				</p>
				<Button asChild size='lg'>
					<Link href='/register'>
						Create an Account
						<ArrowRight className='ml-2 h-5 w-5' />
					</Link>
				</Button>
			</div>
		</div>
	);
}
