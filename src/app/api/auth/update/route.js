import { connectDb } from "@/dbconfig/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const revalidate = 0;
export async function PUT(request) {
	try {
		await connectDb();
		const reqBody = await request.json();

		const { userId, username, email } = reqBody;
		const updateUser = await User.findByIdAndUpdate(
			{ _id: userId },
			{
				username: username,
				email: email,
			}
		);
		if (!updateUser) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 400 }
			);
		}
		const user = await User.findById(userId);

		const tokenData = {
			id: user._id,
			username: user.username,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
			expiresIn: "30d",
		});

		return NextResponse.json({
			message: "Profile Updated Successfully",
			success: true,
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
				role: user?.role,
				token: token,
				createdAt: user?.createdAt,
			},
		});
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
