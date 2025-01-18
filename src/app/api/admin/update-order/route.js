import { connectDb } from "@/dbconfig/db";
import { Order } from "@/models/order.model";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function PUT(request) {
	try {
		await connectDb();
		const reqBody = await request.json();

		const { status, orderId } = reqBody;

		const order = await Order.findByIdAndUpdate(
			{ _id: orderId },
			{
				status: status,
			}
		);
		if (!order) {
			return NextResponse.json(
				{ message: "Order not found" },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: "Order Updated Successfully",
			success: true,
		});
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
