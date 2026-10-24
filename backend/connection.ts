import mongoose from "mongoose";

export async function connectMongo(url: string) {
	try {
		await mongoose.connect(url);
		console.log("MongoDb connected successfully");
	} catch (error) {
		console.error("MongoDb connection failed", error);
		throw error;
	}
}
