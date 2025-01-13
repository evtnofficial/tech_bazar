import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import axios from "axios";

export function ImageUpload({ onImagesChange }) {
	const [previewUrls, setPreviewUrls] = useState([]);
	const fileInputRef = useRef(null);

	const handleFileChange = async (e) => {
		const files = Array.from(e.target.files || []);
		const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

		setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

		try {
			console.log(files);

			const res = await axios.post("/api/upload-images", files);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
		// console.log("files: ", files);

		onImagesChange(files);
	};

	const handleRemoveImage = (index) => {
		setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
		onImagesChange(
			previewUrls
				.filter((_, i) => i !== index)
				.map((url) => {
					const fileName = url.split("/").pop() || "";
					return new File([], fileName);
				})
		);
	};

	return (
		<div>
			<div className='flex flex-wrap gap-4 mb-4'>
				{previewUrls.map((url, index) => (
					<div key={url} className='relative'>
						<img
							src={url}
							alt={`Preview ${index + 1}`}
							className='w-24 h-24 object-cover rounded'
						/>
						<button
							type='button'
							onClick={() => handleRemoveImage(index)}
							className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'>
							<X size={16} />
						</button>
					</div>
				))}
			</div>
			<Button
				type='button'
				variant='outline'
				onClick={() => fileInputRef.current?.click()}>
				Add Images
			</Button>
			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileChange}
				multiple
				accept='image/*'
				className='hidden'
			/>
		</div>
	);
}
