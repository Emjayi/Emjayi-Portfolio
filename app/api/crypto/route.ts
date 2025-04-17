import { NextResponse } from "next/server"

export async function GET() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h",
            {
                headers: {
                    Accept: "application/json",
                    // You can add an API key here if you have one
                    // 'x-cg-api-key': 'YOUR_API_KEY',
                },
                next: { revalidate: 60 }, // Cache for 60 seconds
            },
        )

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching from CoinGecko:", error)
        return NextResponse.json({ error: "Failed to fetch cryptocurrency data" }, { status: 500 })
    }
}
