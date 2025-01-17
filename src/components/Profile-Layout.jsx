"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfileLayout({ children, isAdmin }) {
	const router = useRouter();
	const { user, setUser } = useContext(AuthContext);

	const handleLogout = async () => {
		try {
			const response = await axios.get("/api/auth/logout");
			if (response.status === 200) {
				localStorage.removeItem("user");
				toast.success("Logout Successfully");
				setUser(null);
				router.push("/login");
			} else {
				toast.error("Failed to logout");
			}
		} catch (error) {
			toast.error("An error occurred during logout");
			console.log(error);
		}
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
									<Link href='/admin/dashboard'>
										<LayoutDashboard className='mr-2 h-4 w-4' />
										Dashboard
										<span className='text-xs font-semibold bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded'>
											Admin
										</span>
									</Link>
								</Button>
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
