"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { Search, User, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	return (
		<header className='bg-white shadow-sm'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					<Link href='/' className='text-2xl font-bold text-primary'>
						Tech Bazar
					</Link>

					<div className='hidden md:flex flex-1 max-w-xl mx-4'>
						<SearchBar />
					</div>

					<div className='flex items-center space-x-4'>
						<Button
							variant='ghost'
							size='icon'
							aria-label='add product'>
							<Link href='https://wa.link/d7vcm6'>
								<PlusCircle className='h-6 w-6' />
							</Link>
						</Button>

						<UserMenu
							isOpen={isUserMenuOpen}
							setIsOpen={setIsUserMenuOpen}
						/>
					</div>
				</div>

				<div className='mt-4 md:hidden'>
					<SearchBar />
				</div>
			</div>
		</header>
	);
}

function SearchBar() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	return (
		<form onSubmit={handleSearch} className='relative w-full'>
			<Input
				type='search'
				placeholder='Search for websites, pages, channels...'
				className='w-full pl-10'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			<Button
				type='submit'
				size='icon'
				className='absolute right-0 top-0 h-full'>
				<Search className='h-4 w-4' />
				<span className='sr-only'>Search</span>
			</Button>
		</form>
	);
}

function UserMenu({ isOpen, setIsOpen }) {
	const router = useRouter();
	const { user, setUser } = useContext(AuthContext);

	const logOut = async () => {
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
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<div>
					<Button variant='ghost' aria-label='User menu'>
						<User className='h-6 w-6' />
						<p>{user?.username.split(" ")[0]}</p>
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-56'>
				<DropdownMenuItem>
					<Link href='https://wa.link/d7vcm6' className='w-full'>
						Sell
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href='/profile' className='w-full'>
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				{user && user ? (
					<DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
				) : (
					<>
						<DropdownMenuItem>
							<Link href='/register' className='w-full'>
								Register
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/login' className='w-full'>
								Login
							</Link>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
