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
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const LandingPage = () => {
	const [shortUrl, setShortUrl] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [url, setUrl] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		setShortUrl("");
		setCopied(false);

		const inputUrl = url.trim();

		if (!inputUrl) {
			setError("Please enter a website URL");
			return;
		}

		const fullUrl = `https://${inputUrl.replace(/^https?:\/\//, "")}`;

		try {
			setLoading(true);

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

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shortUrl);
			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch {
			setError("Failed to copy URL");
		}
	};

	return (
		<Container>
			<div className="mx-auto flex h-screen max-w-xl items-center">
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
						</InputGroup>
					</Field>

					<Button
						type="submit"
						className="w-full cursor-pointer"
						disabled={loading}
					>
						{loading ? "Generating..." : "Generate"}
					</Button>

					{error && <p className="text-sm text-red-500">{error}</p>}

					{shortUrl && (
						<div className="space-y-2">
							<p className="text-sm">Your short URL:</p>

							<div className="flex items-center gap-2">
								<p className="break-all text-sm">{shortUrl}</p>

								<Button
									type="button"
									variant="outline"
									size="icon"
									onClick={handleCopy}
									aria-label={copied ? "Copied short URL" : "Copy short URL"}
								>
									<span className="relative flex items-center cursor-pointer justify-center">
										<Copy
											size={16}
											className={`transition-all duration-200 ${
												copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
											}`}
										/>

										<Check
											size={16}
											className={`absolute text-green-500 transition-all duration-200 ${
												copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
											}`}
										/>
									</span>
								</Button>
							</div>
						</div>
					)}
				</form>
			</div>
		</Container>
	);
};
