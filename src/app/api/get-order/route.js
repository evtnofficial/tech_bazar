import { NextResponse } from "next/server";
import { connectDb } from "@/dbconfig/db";
import { Order } from "@/models/order.model";

export async function POST(request) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { orderId } = reqBody;

		const order = await Order.findOne({ _id: orderId })
			.populate({
				path: "user",
				select: "username email phone role createdAt",
			})
			.populate({
				path: "product",
			});
		if (!order) {
			return NextResponse.json(
				{ message: "Order Not Found!" },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: "Order found Successfully",
			success: true,
			order,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
