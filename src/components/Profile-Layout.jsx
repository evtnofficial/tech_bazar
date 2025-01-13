"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfileLayout({ children, isAdmin }) {
	const router = useRouter();

	const handleLogout = () => {
		// Implement logout logic here
		console.log("Logging out...");
		router.push("/");
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='flex flex-col md:flex-row gap-8'>
				<aside className='w-full md:w-64'>
					<nav className='space-y-2'>
						{isAdmin && (
							<>
								<Button
									asChild
									variant='ghost'
									className='w-full justify-start'>
									<Link href='/admin/add-product'>
										Add New Product
										<span className='text-xs font-semibold bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded'>
											Admin
										</span>
									</Link>
								</Button>
								<Button
									asChild
									variant='ghost'
									className='w-full justify-start'>
									<Link href='/admin/products'>
										View All Products
										<span className='text-xs font-semibold bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded'>
											Admin
										</span>
									</Link>
								</Button>
								<Button
									asChild
									variant='ghost'
									className='w-full justify-start'>
									<Link href='/admin/orders'>
										All Orders
										<span className='text-xs font-semibold bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded'>
											Admin
										</span>
									</Link>
								</Button>
								<Button
									asChild
									variant='ghost'
									className='w-full justify-start'>
									<Link href='/admin/users'>
										All Users
										<span className='text-xs font-semibold bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded'>
											Admin
										</span>
									</Link>
								</Button>
							</>
						)}
						<Button
							asChild
							variant='ghost'
							className='w-full justify-start'>
							<Link href='/profile'>Profile</Link>
						</Button>
						<Button
							asChild
							variant='ghost'
							className='w-full justify-start'>
							<Link href='/profile/orders'>Orders</Link>
						</Button>
						<Button
							asChild
							variant='ghost'
							className='w-full justify-start'>
							<Link href='/profile/update'>Update Profile</Link>
						</Button>
						<Button
							asChild
							variant='ghost'
							className='w-full justify-start'>
							<Link href='/profile/change-password'>
								Change Password
							</Link>
						</Button>
						<Button
							variant='ghost'
							className='w-full justify-start'
							onClick={handleLogout}>
							Logout
						</Button>
					</nav>
				</aside>
				<main className='flex-1'>{children}</main>
			</div>
		</div>
	);
}
