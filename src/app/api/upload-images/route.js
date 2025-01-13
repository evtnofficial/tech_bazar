import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs/promises";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable body parser for handling multipart/form-data
export const config = {
	api: {
		bodyParser: false,
	},
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const dateFolder = new Date().toISOString().split("T")[0]; // Use date as the folder name
		const uploadPath = path.join("./public/uploads", dateFolder);

		// Create the folder if it doesn't exist
		require("fs").mkdirSync(uploadPath, { recursive: true });

		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${file.originalname.substring(
				file.originalname.lastIndexOf(".")
			)}`
		);
	},
});

const upload = multer({ storage });

export async function POST(req, res) {
	try {
		console.log("uploaded files: ", req.formData);

		return NextResponse.json({
			message: "Image Uploaded Successfully",
			success: true,
			// product: uploadedFiles,
		});
	} catch (error) {
		console.log("Error in uploading images:", error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
