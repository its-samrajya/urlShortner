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
import { Check, Copy, Link2 } from "lucide-react";
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
			<div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center py-10">
				<header className="mb-10 w-full text-center">
					<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
						<Link2 className="h-3.5 w-3.5 text-primary" />
						<span>URL Shortener</span>
					</div>
					<h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
						<span className="bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
							ZipMyURL
						</span>
					</h1>
					<p className="mt-3 text-balance text-base text-muted-foreground sm:text-lg">
						Turn long links into clean, shareable short URLs in seconds.
					</p>
				</header>

				<div className="w-full rounded-2xl border border-border/70 bg-card/60 p-6 shadow-[0_40px_80px_-60px_rgba(56,189,248,0.4)] backdrop-blur-sm transition-all duration-300 sm:p-8">
					<form onSubmit={handleGenerate} className="space-y-5">
						<Field className="gap-2">
							<FieldLabel
								htmlFor="input-group-url"
								className="text-sm font-medium"
							>
								Destination URL
							</FieldLabel>

							<InputGroup className="h-11 rounded-xl border-border/80 bg-background/60 transition-all focus-within:border-primary/80 focus-within:ring-primary/20">
								<InputGroupInput
									id="input-group-url"
									placeholder="example.com"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									className="h-11 text-base"
									autoComplete="url"
									inputMode="url"
								/>

								<InputGroupAddon className="pr-3">
									<InputGroupText className="text-muted-foreground">
										https://
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</Field>

						<Button
							type="submit"
							className="h-11 w-full rounded-xl text-base font-medium transition-all hover:shadow-[0_20px_60px_-40px_rgba(56,189,248,0.9)] cursor-pointer"
							disabled={loading}
						>
							{loading ? "Zipping your link..." : "Generate short link"}
						</Button>

						{error && (
							<div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
								{error}
							</div>
						)}

						{shortUrl && (
							<div className="space-y-3 rounded-xl border border-border/70 bg-background/40 p-4">
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium">Your short URL</p>
									<span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
										Ready to share
									</span>
								</div>

								<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
									<a
										href={shortUrl}
										target="_blank"
										rel="noreferrer"
										className="break-all font-mono text-sm text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
									>
										{shortUrl}
									</a>

									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={handleCopy}
										aria-label={copied ? "Copied short URL" : "Copy short URL"}
										className="w-full rounded-lg sm:w-auto cursor-pointer"
									>
										<span className="relative mr-2 flex items-center justify-center">
											<Copy
												size={16}
												className={`transition-all duration-200 ${
													copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
												}`}
											/>

											<Check
												size={16}
												className={`absolute text-emerald-400 transition-all duration-200 ${
													copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
												}`}
											/>
										</span>
										{copied ? "Copied" : "Copy link"}
									</Button>
								</div>
							</div>
						)}
					</form>
				</div>

				<footer className="mt-10 text-center text-xs text-muted-foreground">
					Fast, minimal link shortening for sharing anywhere.
				</footer>
			</div>
		</Container>
	);
};
