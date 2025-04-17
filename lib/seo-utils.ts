import type { Metadata } from "next"

type SEOProps = {
    title: string
    description: string
    keywords?: string[]
    ogImage?: string
    canonical?: string
    type?: "website" | "article" | "profile"
    publishedTime?: string
    modifiedTime?: string
}

export function generateMetadata({
    title,
    description,
    keywords = [],
    ogImage = "https://emjaysepahi.com/og.png",
    canonical,
    type = "website",
    publishedTime,
    modifiedTime,
}: SEOProps): Metadata {
    const metaTitle = `${title} | Emjay Sepahi`
    const metaDescription = description || "Keep it simple."
    const url = canonical || "https://emjaysepahi.com"

    return {
        title: metaTitle,
        description: metaDescription,
        keywords: keywords,
        authors: [{ name: "Emjay Sepahi" }],
        metadataBase: new URL("https://emjaysepahi.com"),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            url: url,
            siteName: "emjaysepahi.com",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${title} - Emjay Sepahi`,
                },
            ],
            locale: "en-US",
            type: type,
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: "summary_large_image",
            title: metaTitle,
            description: metaDescription,
            images: [ogImage],
        },
    }
}

export function generateStructuredData(type: string, data: any) {
    return {
        __html: JSON.stringify(data),
    }
}
