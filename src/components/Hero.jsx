import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<div className='bg-gradient-to-r from-primary to-slate-500 text-white'>
			<div className='container mx-auto px-4 py-16 sm:py-24 lg:py-32'>
				<div className='text-center'>
					<h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl'>
						Buy and Sell Digital Assets
					</h1>
					<p className='mt-6 max-w-2xl mx-auto text-xl sm:text-2xl'>
						Tech Bazar: Your marketplace for websites, social media
						pages, and YouTube channels
					</p>
					<div className='mt-10 flex justify-center gap-4'>
						<Button
							asChild
							size='lg'
							className='bg-white text-primary hover:bg-gray-100'>
							<Link href='/buy'>
								Start Buying
								<ArrowRight className='ml-2 h-5 w-5' />
							</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='bg-transparent text-white border-white hover:bg-white/10'>
							<Link href='/sell'>
								Start Selling
								<ArrowRight className='ml-2 h-5 w-5' />
							</Link>
						</Button>
					</div>
				</div>
				<div className='mt-16'>
					<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
						{[
							"Websites",
							"Facebook Pages",
							"Instagram Accounts",
							"YouTube Channels",
						].map((item) => (
							<div
								key={item}
								className='bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center'>
								<h3 className='text-lg font-semibold'>
									{item}
								</h3>
								<p className='mt-2 text-sm opacity-80'>
									Buy and sell with ease
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
