import { connectDb } from "@/dbconfig/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function PUT(request) {
	try {
		await connectDb();
		const reqBody = await request.json();

		const { userId, username, email, role } = reqBody;

		const updateUser = await User.findByIdAndUpdate(
			{ _id: userId },
			{
				username: username,
				email: email,
				role: role,
			}
		);
		if (!updateUser) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: "User Updated Successfully",
			success: true,
		});
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
