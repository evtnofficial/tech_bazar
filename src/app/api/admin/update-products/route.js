import { connectDb } from "@/dbconfig/db";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function PUT(request) {
	try {
		await connectDb();
		const reqBody = await request.json();

		const {
			title,
			type,
			price,
			description,
			age,
			monetization,
			earningsPerMonth,
			_id,
		} = reqBody;

		const updateProduct = await Product.findByIdAndUpdate(
			{ _id },
			{
				title,
				type,
				price,
				description,
				age,
				monetization,
				earningsPerMonth,
			}
		);
		if (!updateProduct) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: "Product Updated Successfully",
			success: true,
		});
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
