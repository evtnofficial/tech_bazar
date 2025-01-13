"use client";

import { useState } from "react";
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
import { ImageUpload } from "./ImageUpload";
import axios from "axios";

export default function AddProductForm() {
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		price: "",
		description: "",
		age: "",
		monetization: "",
		earningsPerMonth: "",
	});
	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState({
		name: "",
		type: "",
		price: "",
		description: "",
		age: "",
		monetization: "",
		earningsPerMonth: "",
		images: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const handleSelectChange = (value) => {
		setFormData((prev) => ({ ...prev, type: value }));
		setErrors((prev) => ({ ...prev, type: "" }));
	};

	const handleImagesChange = (newImages) => {
		setImages((prev) => [...prev, ...newImages]);
		setErrors((prev) => ({ ...prev, images: "" }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (images.length === 0) {
			setErrors((prev) => ({
				...prev,
				images: "Please upload at least one image",
			}));
			return;
		}
		console.log("images: ", images);

		const payload = { ...formData, images };
		try {
			const response = await axios.post(
				"/api/admin/add-product",
				payload
			);
			console.log("Submitting product:", payload, response.data);
		} catch (error) {
			console.error("Error submitting product:", error);
		}
	};

	return (
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
					<p className='text-sm text-red-500 mt-1'>{errors.name}</p>
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
						<SelectItem value='facebook'>Facebook Page</SelectItem>
						<SelectItem value='instagram'>
							Instagram Account
						</SelectItem>
						<SelectItem value='youtube'>YouTube Channel</SelectItem>
					</SelectContent>
				</Select>
				{errors.type && (
					<p className='text-sm text-red-500 mt-1'>{errors.type}</p>
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
					<p className='text-sm text-red-500 mt-1'>{errors.price}</p>
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
					<p className='text-sm text-red-500 mt-1'>{errors.age}</p>
				)}
			</div>

			<div>
				<Label htmlFor='monetization'>Monetization Methods</Label>
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
				<Label htmlFor='earningsPerMonth'>Monthly Earnings ($)</Label>
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
				<Label>Product Images</Label>
				<ImageUpload onImagesChange={handleImagesChange} />
				{errors.images && (
					<p className='text-sm text-red-500 mt-1'>{errors.images}</p>
				)}
			</div>

			<Button type='submit'>Add Product</Button>
		</form>
	);
}
