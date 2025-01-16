import { NextResponse } from "next/server";
import { connectDb } from "@/dbconfig/db";
import { Product } from "@/models/product.model";

export async function POST(request) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const {
			name,
			type,
			price,
			description,
			age,
			seller,
			monetization,
			earningsPerMonth,
			images,
		} = reqBody;

		// Validate incoming data
		if (
			!name ||
			!type ||
			!price ||
			!description ||
			!age ||
			!seller ||
			!monetization ||
			!earningsPerMonth ||
			!images ||
			!Array.isArray(images) ||
			images.length === 0
		) {
			return NextResponse.json({
				message: "Invalid input. All fields are required.",
				status: 400,
			});
		}

		const newProduct = new Product({
			title: name,
			type,
			price,
			description,
			age,
			seller,
			monetization,
			earningsPerMonth,
			images,
		});

		const savedProduct = await newProduct.save();

		return NextResponse.json({
			message: "Product Added Successfully",
			success: true,
			product: savedProduct,
		});
	} catch (error) {
		console.error("Error saving product:", error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
