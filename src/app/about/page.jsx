import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
	ArrowRight,
	Users,
	ShieldCheck,
	TrendingUp,
	Globe,
} from "lucide-react";

export default function AboutPage() {
	return (
		<div className='container mx-auto px-4 py-16'>
			<h1 className='text-4xl font-bold mb-8 text-center'>
				About Tech Bazar
			</h1>

			<div className='grid md:grid-cols-2 gap-12 items-center mb-16'>
				<div>
					<h2 className='text-3xl font-semibold mb-4'>Our Story</h2>
					<p className='text-lg mb-6'>
						Founded in 2023, Tech Bazar emerged from a simple idea:
						to create a secure and efficient marketplace for digital
						assets. Our founders, seasoned entrepreneurs and tech
						enthusiasts, recognized the need for a platform where
						creators, investors, and businesses could connect to buy
						and sell online properties with confidence.
					</p>
					<p className='text-lg'>
						Today, Tech Bazar stands as the premier destination for
						trading websites, social media accounts, and YouTube
						channels. We've facilitated thousands of transactions,
						helping digital entrepreneurs realize their dreams and
						investors discover exciting opportunities in the digital
						space.
					</p>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<Card>
						<CardContent className='flex flex-col items-center justify-center p-6'>
							<Users className='h-12 w-12 text-primary mb-4' />
							<h3 className='text-xl font-semibold mb-2'>
								10,000+
							</h3>
							<p className='text-center'>Active Users</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='flex flex-col items-center justify-center p-6'>
							<ShieldCheck className='h-12 w-12 text-primary mb-4' />
							<h3 className='text-xl font-semibold mb-2'>100%</h3>
							<p className='text-center'>Secure Transactions</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='flex flex-col items-center justify-center p-6'>
							<TrendingUp className='h-12 w-12 text-primary mb-4' />
							<h3 className='text-xl font-semibold mb-2'>
								$50M+
							</h3>
							<p className='text-center'>In Total Sales</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='flex flex-col items-center justify-center p-6'>
							<Globe className='h-12 w-12 text-primary mb-4' />
							<h3 className='text-xl font-semibold mb-2'>50+</h3>
							<p className='text-center'>Countries Served</p>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className='mb-16'>
				<h2 className='text-3xl font-semibold mb-6 text-center'>
					Our Mission
				</h2>
				<p className='text-lg text-center max-w-3xl mx-auto'>
					At Tech Bazar, our mission is to empower digital
					entrepreneurs and investors by providing a transparent,
					secure, and dynamic marketplace for online assets. We strive
					to foster innovation, facilitate growth, and create
					opportunities in the ever-evolving digital economy.
				</p>
			</div>

			<div className='mb-16'>
				<h2 className='text-3xl font-semibold mb-6 text-center'>
					Our Values
				</h2>
				<div className='grid md:grid-cols-3 gap-8'>
					<Card>
						<CardContent className='p-6'>
							<h3 className='text-xl font-semibold mb-2'>
								Transparency
							</h3>
							<p>
								We believe in open communication and clear
								processes, ensuring all parties have the
								information they need to make informed
								decisions.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='p-6'>
							<h3 className='text-xl font-semibold mb-2'>
								Security
							</h3>
							<p>
								Protecting our users' data and assets is
								paramount. We employ state-of-the-art security
								measures to ensure safe transactions.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='p-6'>
							<h3 className='text-xl font-semibold mb-2'>
								Innovation
							</h3>
							<p>
								We continuously evolve our platform to meet the
								changing needs of the digital marketplace and
								stay ahead of industry trends.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			<div className='text-center'>
				<h2 className='text-3xl font-semibold mb-6'>
					Join Our Community
				</h2>
				<p className='text-lg mb-8 max-w-2xl mx-auto'>
					Whether you're looking to sell your successful online
					business or invest in the next big thing, Tech Bazar is here
					to help you succeed in the digital world.
				</p>
				<Button asChild size='lg'>
					<Link href='/register'>
						Get Started Today
						<ArrowRight className='ml-2 h-5 w-5' />
					</Link>
				</Button>
			</div>
		</div>
	);
}
