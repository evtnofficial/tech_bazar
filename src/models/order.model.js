import mongoose from "mongoose";
import { User } from "./user.model";
import { Product } from "./product.model";

const orderModel = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: ["pending", "completed", "failed"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

export const Order =
	mongoose.models.Order || mongoose.model("Order", orderModel);
