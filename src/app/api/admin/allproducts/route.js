import { connectDb } from "@/dbconfig/db";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
	try {
		await connectDb();
		const products = await Product.find()
			.populate({
				path: "seller",
				select: "username email role createdAt",
			})
			.lean();

		return NextResponse.json({
			message: "Products Found",
			success: true,
			products,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
