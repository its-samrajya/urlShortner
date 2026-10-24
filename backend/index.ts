import express from "express";
import { connectMongo } from "./connection.ts";
import dotenv from "dotenv";
import urlRouter from "./routes/url.ts";
import { handleRedirectUrl } from "./controllers/url.ts";
import cors from "cors";

dotenv.config();

const app = express();
const port = 8000;

app.use(
	cors({
		origin: process.env.CORS_URL,
	}),
);

app.use(express.json());

async function startServer() {
	try {
		const mongoUri = process.env.MONGODB_URI;
		if (!mongoUri) {
			throw new Error("Mongodb uri is not defined in the env");
		}

		await connectMongo(mongoUri);

		app.use("/url", urlRouter);

		app.get("/:shortUrl", handleRedirectUrl);

		app.listen(port, () => console.log(`Server is listening at ${port}`));
	} catch (error) {
		console.error("Failed to start server", error);
		process.exit(1);
	}
}

startServer();
