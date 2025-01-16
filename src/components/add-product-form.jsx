"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import toast from "react-hot-toast";

export default function AddProductPage() {
	const { user } = useContext(AuthContext);
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		price: "",
		description: "",
		age: "",
		monetization: "",
		earningsPerMonth: "",
	});
	const [imageLinks, setImageLinks] = useState([""]);
	const [errors, setErrors] = useState({
		name: "",
		type: "",
		price: "",
		description: "",
		age: "",
		monetization: "",
		earningsPerMonth: "",
		images: "",
		general: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
	};

	const handleSelectChange = (value) => {
		setFormData((prev) => ({ ...prev, type: value }));
		setErrors((prev) => ({ ...prev, type: "", general: "" }));
	};

	const handleImageLinkChange = (index, value) => {
		const newImageLinks = [...imageLinks];
		newImageLinks[index] = value;
		setImageLinks(newImageLinks);
	};

	const addImageLink = () => {
		setImageLinks([...imageLinks, ""]);
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = { ...errors };

		if (formData.name.length < 3) {
			newErrors.name = "Product name must be at least 3 characters long.";
			isValid = false;
		}

		if (!formData.type) {
			newErrors.type = "Please select a product type.";
			isValid = false;
		}

		if (
			!formData.price ||
			isNaN(Number(formData.price)) ||
			Number(formData.price) <= 0
		) {
			newErrors.price = "Please enter a valid price.";
			isValid = false;
		}

		if (formData.description.length < 10) {
			newErrors.description =
				"Description must be at least 10 characters long.";
			isValid = false;
		}

		if (
			!formData.age ||
			isNaN(Number(formData.age)) ||
			Number(formData.age) < 0
		) {
			newErrors.age = "Please enter a valid age in months.";
			isValid = false;
		}

		if (formData.monetization.length < 3) {
			newErrors.monetization = "Please enter valid monetization methods.";
			isValid = false;
		}

		if (
			!formData.earningsPerMonth ||
			isNaN(Number(formData.earningsPerMonth)) ||
			Number(formData.earningsPerMonth) < 0
		) {
			newErrors.earningsPerMonth = "Please enter valid monthly earnings.";
			isValid = false;
		}

		if (imageLinks.filter((link) => link.trim() !== "").length === 0) {
			newErrors.images = "Please add at least one image link.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			setIsLoading(true);
			try {
				const payload = {
					...formData,
					seller: user?._id,
					images: imageLinks,
				};

				const response = await axios.post(
					"/api/admin/add-product",
					payload
				);

				toast.success(response?.data?.message);
				router.push("/admin/products");
				setIsLoading(false);
			} catch (error) {
				setErrors((prev) => ({
					...prev,
					general: "Failed to add product. Please try again.",
				}));
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<div className='container mx-auto px-4 py-2'>
			<div className='max-w-2xl mx-auto'>
				{/* <h1 className='text-3xl font-bold mb-6 text-center'>
					Add New Product
				</h1> */}
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<Label htmlFor='name'>Product Name</Label>
						<Input
							id='name'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
							placeholder='e.g., Tech Blog, E-commerce Store'
						/>
						{errors.name && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.name}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='type'>Product Type</Label>
						<Select onValueChange={handleSelectChange}>
							<SelectTrigger id='type'>
								<SelectValue placeholder='Select product type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='website'>Website</SelectItem>
								<SelectItem value='facebook'>
									Facebook Page
								</SelectItem>
								<SelectItem value='instagram'>
									Instagram Account
								</SelectItem>
								<SelectItem value='youtube'>
									YouTube Channel
								</SelectItem>
							</SelectContent>
						</Select>
						{errors.type && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.type}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='price'>Price ($)</Label>
						<Input
							id='price'
							name='price'
							type='number'
							value={formData.price}
							onChange={handleInputChange}
							placeholder='e.g., 5000'
						/>
						{errors.price && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.price}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							name='description'
							value={formData.description}
							onChange={handleInputChange}
							placeholder='Describe your product...'
							rows={4}
						/>
						{errors.description && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.description}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='age'>Age (in months)</Label>
						<Input
							id='age'
							name='age'
							type='number'
							value={formData.age}
							onChange={handleInputChange}
							placeholder='e.g., 24'
						/>
						{errors.age && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.age}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='monetization'>
							Monetization Methods
						</Label>
						<Input
							id='monetization'
							name='monetization'
							value={formData.monetization}
							onChange={handleInputChange}
							placeholder='e.g., AdSense, Affiliate Marketing'
						/>
						{errors.monetization && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.monetization}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='earningsPerMonth'>
							Monthly Earnings ($)
						</Label>
						<Input
							id='earningsPerMonth'
							name='earningsPerMonth'
							type='number'
							value={formData.earningsPerMonth}
							onChange={handleInputChange}
							placeholder='e.g., 1000'
						/>
						{errors.earningsPerMonth && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.earningsPerMonth}
							</p>
						)}
					</div>

					<div>
						<Label>Product Image Links</Label>
						{imageLinks.map((link, index) => (
							<div key={index} className='flex items-center mb-2'>
								<Input
									type='url'
									value={link}
									onChange={(e) =>
										handleImageLinkChange(
											index,
											e.target.value
										)
									}
									placeholder='https://drive.google.com/uc?id=your-image-id'
									className='flex-grow'
								/>
								{index === imageLinks.length - 1 && (
									<Button
										type='button'
										onClick={addImageLink}
										className='ml-2'>
										Add Another
									</Button>
								)}
							</div>
						))}
						{errors.images && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.images}
							</p>
						)}
					</div>

					{errors.general && (
						<p className='text-sm text-red-500'>{errors.general}</p>
					)}

					<Button
						type='submit'
						className='w-full'
						disabled={isLoading}>
						{isLoading ? "Adding Product..." : "Add Product"}
					</Button>
				</form>
			</div>
		</div>
	);
}
