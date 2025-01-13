import { connectDb } from "@/dbconfig/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
export const revalidate = 0;

export async function GET() {
	try {
		await connectDb();
		const users = await User.find();
		return NextResponse.json({
			message: "Users Found",
			success: true,
			users,
		});
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
