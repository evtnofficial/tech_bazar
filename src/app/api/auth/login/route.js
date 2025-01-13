import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDb } from "@/dbconfig/db";
import { User } from "@/models/user.model";

export async function POST(request) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { email, password } = reqBody;

		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json(
				{ message: "User does not exist with this email" },
				{ status: 400 }
			);
		}

		const isValid = await bcryptjs.compare(password, user.password);
		if (!isValid) {
			return NextResponse.json(
				{ message: "Email or Password is incorrected" },
				{ status: 400 }
			);
		}
		const tokenData = {
			id: user._id,
			username: user.username,
		};
		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
			expiresIn: "30d",
		});

		const response = NextResponse.json({
			message: "Login Successfully",
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
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
