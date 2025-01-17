import { NextResponse } from "next/server";
import { connectDb } from "@/dbconfig/db";
import { Product } from "@/models/product.model";

export async function POST(request) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { productId } = reqBody;

		const product = await Product.findOne({ _id: productId }).populate({
			path: "seller",
			select: "username email role createdAt",
		});
		if (!product) {
			return NextResponse.json(
				{ message: "Product Not Found!" },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: "Product found Successfully",
			success: true,
			product,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
