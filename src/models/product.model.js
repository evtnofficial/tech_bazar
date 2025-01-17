import mongoose from "mongoose";
import { User } from "./user.model";

const productModel = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		monetization: {
			type: String,
			required: true,
		},
		earningsPerMonth: {
			type: Number,
			default: 0,
		},
		images: [String],
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export const Product =
	mongoose.models.Product || mongoose.model("Product", productModel);
