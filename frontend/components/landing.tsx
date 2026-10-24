"use client";
import Container from "./Container";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Copy, InfoIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export const LandingPage = () => {
	const [shortUrl, setShortUrl] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [loading, setLoading] = useState<Boolean>(false);

	const handleGenerate = async (event: React.SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setShortUrl("");

		const inputUrl = url.trim();
		if (!inputUrl) {
			setError("Please enter a website url");
			return;
		}

		const fullUrl = `https://${inputUrl.replace(/^https?:\/\//, "")}`;

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/url`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url: fullUrl }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to generate short URL");
			}
			setShortUrl(`${process.env.NEXT_PUBLIC_API_URL}/${data.id}`);
		} catch (error) {
			setError(error instanceof Error ? error.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<div className="max-w-xl mx-auto h-screen flex items-center">
				<form onSubmit={handleGenerate} className="w-full space-y-4">
					<Field>
						<FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
						<InputGroup>
							<InputGroupInput
								id="input-group-url"
								placeholder="example.com"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
							<InputGroupAddon>
								<InputGroupText>https://</InputGroupText>
							</InputGroupAddon>
							<InputGroupAddon align="inline-end">
								<InfoIcon />
							</InputGroupAddon>
						</InputGroup>
					</Field>

					<Button type="submit" className="w-full">
						Generate
					</Button>
					{error && <p className="text-sm text-red-500">{error}</p>}
					{shortUrl && (
						<div className="space-y-2">
							<p className="text-sm">Your short URL: </p>
							<div className="flex items-center gap-2">
								<p className="text-sm break-all">{shortUrl}</p>
								<Button
									onClick={() => navigator.clipboard.writeText(shortUrl)}
									aria-label="Copy short URL"
								>
									<Copy size={16} />
								</Button>
							</div>
						</div>
					)}
				</form>
			</div>
		</Container>
	);
};
