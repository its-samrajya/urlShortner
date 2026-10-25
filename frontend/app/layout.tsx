import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "ZipMyURL — Shorten Your Links",
	description:
		"Shorten long URLs into short, shareable links instantly with ZipMyURL. Create and share your links in seconds.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
		>
			<body className="min-h-full bg-background text-foreground antialiased dark">
				{children}
			</body>
		</html>
	);
}
