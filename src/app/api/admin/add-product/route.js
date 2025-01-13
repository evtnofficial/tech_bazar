import { NextResponse } from "next/server";
import { connectDb } from "@/dbconfig/db";
import { Product } from "@/models/product.model";

export async function POST(request) {
	try {
		await connectDb();
		const reqBody = await request.json();

		const newProduct = new Product({
			title: reqBody.name,
			productType: reqBody.type,
			price: reqBody.price,
			description: reqBody.description,
			age: reqBody.age,
			monetization: reqBody.monetization,
			earningPerMonth: reqBody.earningPerMonth,
			images: reqBody.images, // Add this field
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
