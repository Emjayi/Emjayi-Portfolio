import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Retro Anime Character Cards",
    description: "Interactive anime character cards with retro styling",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
