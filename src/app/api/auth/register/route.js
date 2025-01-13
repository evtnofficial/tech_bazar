import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDb } from "@/dbconfig/db";
import { User } from "@/models/user.model";

export async function POST(request) {
	try {
		await connectDb();
		const reqBody = await request.json();
		const { username, email, password } = reqBody;

		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json(
				{ message: "Account already exist with this Email!" },
				{ status: 301 }
			);
		}
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		const savedUser = await newUser.save();

		return NextResponse.json({
			message: "Account Created Successfully",
			success: true,
			savedUser,
		});
	} catch (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
