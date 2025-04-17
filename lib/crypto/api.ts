import type { CryptoData } from "./types"

// Fallback data to use when API fails
const fallbackData: CryptoData[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image: "/images/crypto/bitcoin.png",
    currentPrice: 65432.21,
    priceChangePercentage24h: 2.34,
    marketCap: 1287654321000,
    totalVolume: 32165498700,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    image: "/images/crypto/ethereum.png",
    currentPrice: 3456.78,
    priceChangePercentage24h: -1.23,
    marketCap: 416789123000,
    totalVolume: 15678912300,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "doge",
    image: "/images/crypto/dogecoin.png",
    currentPrice: 0.123456,
    priceChangePercentage24h: 5.67,
    marketCap: 16789123000,
    totalVolume: 2345678900,
  },
]

export async function fetchCryptoPrices(): Promise<CryptoData[]> {
  try {
    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    // Use our server-side API route instead of calling CoinGecko directly
    const response = await fetch("/api/crypto", {
      signal: controller.signal,
      next: { revalidate: 0 }, // Don't cache this request client-side
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`API responded with status: ${response.status}`)
      return fallbackData
    }

    const data = await response.json()

    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: `/images/crypto/${coin.id}.png`,
      currentPrice: coin.current_price,
      priceChangePercentage24h: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      totalVolume: coin.total_volume,
    }))
  } catch (error) {
    console.error("Error fetching crypto prices:", error)
    console.log("Using fallback data instead")
    return fallbackData
  }
}
