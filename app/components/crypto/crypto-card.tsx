"use client"

import { useState } from "react"
import type { CryptoData } from "@/lib/crypto/types"
import { ArrowDown, ArrowUp } from "lucide-react"
import Image from "next/image"

interface CryptoCardProps {
  crypto: CryptoData
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const priceChangeColor = crypto.priceChangePercentage24h >= 0 ? "text-green-400" : "text-red-400"

  const priceChangeIcon =
    crypto.priceChangePercentage24h >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />

  const glowColor =
    crypto.priceChangePercentage24h >= 0
      ? "from-green-400/30 via-green-400/10 to-transparent"
      : "from-red-400/30 via-red-400/10 to-transparent"

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 z-0"></div>

      {/* Card content */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 h-full relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10">
            <Image
              src={crypto.image || "/placeholder.svg"}
              alt={crypto.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="font-bold text-white">{crypto.name}</h3>
            <p className="text-white/70 text-sm">{crypto.symbol.toUpperCase()}</p>
          </div>
        </div>

        {/* Price with glow effect */}
        <div className={`relative ${isHovered ? "animate-pulse" : ""}`}>
          <div className={`absolute inset-0 bg-gradient-radial ${glowColor} blur-lg opacity-70`}></div>
          <p className="text-2xl font-bold text-white relative z-10">
            ${crypto.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Price change */}
        <div className="mt-4 flex items-center gap-1">
          <div className={`flex items-center ${priceChangeColor}`}>
            {priceChangeIcon}
            <span className="font-medium">{Math.abs(crypto.priceChangePercentage24h).toFixed(2)}%</span>
          </div>
          <span className="text-white/70 text-sm">24h</span>
        </div>

        {/* Additional stats */}
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-white/70">Market Cap</p>
            <p className="text-white font-medium">${formatLargeNumber(crypto.marketCap)}</p>
          </div>
          <div>
            <p className="text-white/70">Volume (24h)</p>
            <p className="text-white font-medium">${formatLargeNumber(crypto.totalVolume)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T"
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"
  return num.toString()
}
