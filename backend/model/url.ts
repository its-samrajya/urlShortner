import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
	{
		shortUrl: {
			type: String,
			require: true,
			unique: true,
		},
		redirectUrl: {
			type: String,
			require: true,
		},
		visitHistory: [
			{
				timeStamp: { type: Number },
			},
		],
	},
	{ timestamps: true },
);

export const URL = mongoose.model("url", urlSchema);
