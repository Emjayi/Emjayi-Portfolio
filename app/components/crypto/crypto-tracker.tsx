"use client"

import { useEffect, useState } from "react"
import CryptoCard from "./crypto-card"
import { fetchCryptoPrices } from "@/lib/crypto/api"
import type { CryptoData } from "@/lib/crypto/types"
import { RefreshCw } from "lucide-react"
import Link from "next/link"

export default function CryptoTracker() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const fetchData = async () => {
    try {
      setRefreshing(true)
      const data = await fetchCryptoPrices()
      setCryptoData(data)
      setLastUpdated(new Date())

      // Check if we're using fallback data
      setUsingFallback(data.length > 0 && data[0].currentPrice === 65432.21)

      setError(null)
    } catch (err) {
      setError("Failed to fetch cryptocurrency data")
      console.error(err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Initial data fetch with retry logic
  useEffect(() => {
    const initialFetch = async () => {
      try {
        setLoading(true)
        const data = await fetchCryptoPrices()
        setCryptoData(data)
        setLastUpdated(new Date())
        setUsingFallback(data.length > 0 && data[0].currentPrice === 65432.21)
        setError(null)
      } catch (err) {
        console.error("Error in initial fetch:", err)
        setError("Failed to fetch cryptocurrency data")

        // Retry logic - try up to 3 times with increasing delay
        if (retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 1000 // Exponential backoff
          console.log(`Retrying in ${delay}ms... (Attempt ${retryCount + 1}/3)`)

          setTimeout(() => {
            setRetryCount((prev) => prev + 1)
          }, delay)
        }
      } finally {
        setLoading(false)
      }
    }

    initialFetch()
  }, [retryCount])

  // Set up interval for periodic updates
  useEffect(() => {
    if (cryptoData.length > 0) {
      const intervalId = setInterval(fetchData, 60000)
      return () => clearInterval(intervalId)
    }
  }, [cryptoData])

  return (
    <div className="w-full max-w-4xl">
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-6 md:p-8 shadow-xl border border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/10 via-neutral-500/10 to-neutral-500/10 z-0"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">Crypto Tracker</h1>

            <div className="flex items-center gap-4">
              <button
                onClick={fetchData}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>

              {lastUpdated && (
                <div className="text-right">
                  <p className="text-xs text-white/70">Last updated: {lastUpdated.toLocaleTimeString()}</p>
                  {usingFallback && <p className="text-xs text-amber-300 mt-1">Using demo data (API unavailable)</p>}
                  {!usingFallback && <Link href={"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"}> <p className="text-xs text-amber-300 mt-1">api.coingecko.com</p> </Link>}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error && cryptoData.length === 0 ? (
            <div className="text-center p-8 text-red-300">
              <p>{error}</p>
              <button
                onClick={() => setRetryCount((prev) => prev + 1)}
                className="mt-4 px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cryptoData.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
