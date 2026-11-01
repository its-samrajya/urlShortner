import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ shortUrl: string }> },
) {
	const { shortUrl } = await params;

	const backendUrl = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_URL;

	if (!backendUrl) {
		return NextResponse.json(
			{
				error: "API URL is not configured",
			},
			{ status: 500 },
		);
	}

	try {
		const response = await fetch(
			`${backendUrl}/${encodeURIComponent(shortUrl)}`,
			{
				redirect: "manual",
				cache: "no-store",
			},
		);
		const redirectUrl = response.headers.get("location");

		if (response.status >= 300 && response.status < 400 && redirectUrl) {
			return NextResponse.redirect(redirectUrl, response.status);
		}
		return NextResponse.json(
			{ error: "Short URL not found or redirect failed" },
			{ status: response.status === 404 ? 404 : 502 },
		);
	} catch {
		return NextResponse.json(
			{ error: "Unable to reach the URL service" },
			{ status: 502 },
		);
	}
}
