import { connectDb } from "@/dbconfig/db";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
	try {
		await connectDb();
		const orders = await Order.find()
			.populate({
				path: "user",
				select: "username email phone role createdAt",
			})
			.populate({
				path: "product",
			})
			.lean();

		return NextResponse.json({
			message: "Orders Found",
			success: true,
			orders,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
