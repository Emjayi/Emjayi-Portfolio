import "../global.css"
import type React from "react"
import { Inter } from "@next/font/google"
import LocalFont from "next/font/local"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"

export const metadata: Metadata = {
	metadataBase: new URL("https://emjaysepahi.com"),
	title: {
		default: "Emjay Sepahi",
		template: "%s",
	},
	description:
		"Full-stack developer and designer specializing in modern web applications, interactive experiences, and creative digital solutions.",
	keywords: ["developer", "designer", "full-stack", "web development", "portfolio", "javascript", "react", "next.js"],
	authors: [{ name: "Emjay Sepahi" }],
	creator: "Emjay Sepahi",
	openGraph: {
		title: "Emjay Sepahi | Full-Stack Developer",
		description:
			"Full-stack developer and designer specializing in modern web applications, interactive experiences, and creative digital solutions.",
		url: "https://emjaysepahi.com",
		siteName: "emjaysepahi.com",
		images: [
			{
				url: "https://emjaysepahi.com/logo.png",
				width: 1200,
				height: 630,
				alt: "Emjay Sepahi - Full-Stack Developer",
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Emjay Sepahi | Full-Stack Developer",
		card: "summary_large_image",
		images: ["https://emjaysepahi.com/logo.png"],
	},
	verification: {
		google: "verification_token", // Replace with your Google Search Console verification token
	},
	alternates: {
		canonical: "https://emjaysepahi.com",
	},
}

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap", // Add display swap for better font loading
})

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
	display: "swap", // Add display swap for better font loading
})

const telSans = LocalFont({
	src: "../public/fonts/telemarinesbold1.ttf",
	variable: "--font-telsans",
	display: "swap", // Add display swap for better font loading
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			suppressHydrationWarning
			lang="en"
			className={`${[inter.variable, calSans.variable, telSans.variable].join(" ")} `}
		>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body
				className={`max-w-screen bg-white dark:bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
					}`}
			>
				<Suspense>
					{children}
					<SpeedInsights />
					<Analytics />
				</Suspense>
			</body>
		</html>
	)
}
