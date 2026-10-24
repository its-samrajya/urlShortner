import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import { URL } from "../model/url.ts";

export async function handleGenerateNewShortUrl(req: Request, res: Response) {
	const body = req.body;

	if (!body || !body.url) {
		return res.status(400).json({
			error: "Url must be provided",
		});
	}
	try {
		//finding for the existing one
		const existingUrl = await URL.findOne({ redirectUrl: body.url });
		if (existingUrl) {
			return res.status(200).json({
				id: existingUrl.shortUrl,
				message: "Short URL already exists",
			});
		}
		// creating new one
		const shortId = nanoid(8);
		await URL.create({
			shortUrl: shortId,
			redirectUrl: body.url,
			visitHistory: [],
		});
		return res.status(201).json({
			id: shortId,
			message: "Short Url created successfully",
		});
	} catch (error) {
		console.error("Error creating short Url:", error);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
}

export async function handleRedirectUrl(req: Request, res: Response) {
	try {
		const params = req.params;
		const entry = await URL.findOneAndUpdate(
			{ shortUrl: params.shortUrl },
			{
				$push: {
					visitHistory: {
						timeStamp: Date.now(),
					},
				},
			},
			{ new: true },
		);
		if (!entry) {
			return res.status(404).json({
				error: "Short URL not found",
			});
		}

		return res.redirect(entry.redirectUrl!);
	} catch (error) {
		console.error("Error redirecting short URL", error);

		return res.status(500).json({
			error: "Internal server error",
		});
	}
}

export async function handleAnalytics(req: Request, res: Response) {
	try {
		const shortUrl = req.params.shortUrl;
		const result = await URL.findOne({ shortUrl });

		if (!result) {
			return res.status(404).json({
				error: "Short Url not found",
			});
		}
		return res.json({
			totalClicks: result.visitHistory.length,
			analytics: result.visitHistory,
		});
	} catch (error) {
		console.error("Error finding the analytics", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
}
