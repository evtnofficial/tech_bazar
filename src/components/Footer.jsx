import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
	return (
		<footer className='bg-gray-100 text-gray-600 py-8'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div>
						<h2 className='text-lg font-semibold mb-4'>
							About Tech Bazar
						</h2>
						<p className='text-sm'>
							Tech Bazar is your go-to marketplace for buying and
							selling websites, social media pages, and YouTube
							channels.
						</p>
					</div>
					<div>
						<h2 className='text-lg font-semibold mb-4'>
							Quick Links
						</h2>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/about'
									className='text-sm hover:text-primary'>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href='/how-it-works'
									className='text-sm hover:text-primary'>
									How It Works
								</Link>
							</li>
							<li>
								<Link
									href='/pricing'
									className='text-sm hover:text-primary'>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-sm hover:text-primary'>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h2 className='text-lg font-semibold mb-4'>Legal</h2>
						<ul className='space-y-2'>
							<li>
								<Link
									href='/terms'
									className='text-sm hover:text-primary'>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href='/privacy'
									className='text-sm hover:text-primary'>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='/cookies'
									className='text-sm hover:text-primary'>
									Cookie Policy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h2 className='text-lg font-semibold mb-4'>
							Connect With Us
						</h2>
						<div className='flex space-x-4'>
							<a
								href='https://facebook.com'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Facebook'>
								<Facebook className='h-6 w-6 text-gray-600 hover:text-primary' />
							</a>
							<a
								href='https://instagram.com'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Instagram'>
								<Instagram className='h-6 w-6 text-gray-600 hover:text-primary' />
							</a>
							<a
								href='https://youtube.com'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='YouTube'>
								<Youtube className='h-6 w-6 text-gray-600 hover:text-primary' />
							</a>
							<a
								href='https://twitter.com'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Twitter'>
								<Twitter className='h-6 w-6 text-gray-600 hover:text-primary' />
							</a>
						</div>
					</div>
				</div>
				<div className='mt-8 pt-8 border-t border-gray-200 text-center'>
					<p className='text-sm'>
						&copy; {new Date().getFullYear()} Tech Bazar. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
