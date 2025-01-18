import { NextResponse } from "next/server";
import { connectDb } from "@/dbconfig/db";
import { Order } from "@/models/order.model";

export async function POST(request) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { user, product, amount, status } = reqBody;

		// Validate incoming data
		if (!user || !product || !amount || !status) {
			return NextResponse.json({
				message: "Invalid input. All fields are required.",
				status: 400,
			});
		}

		const newOrder = new Order({
			user,
			product,
			amount,
			status,
		});

		const order = await newOrder.save();

		return NextResponse.json({
			message: "Order Placed Successfully",
			success: true,
			order,
		});
	} catch (error) {
		console.error("Error in placing order:", error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
