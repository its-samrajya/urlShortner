import { Router } from "express";
import {
	handleAnalytics,
	handleGenerateNewShortUrl,
} from "../controllers/url.ts";

const router = Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:shortUrl", handleAnalytics);

export default router;
