import CryptoTracker from "@/app/components/crypto/crypto-tracker"

export const metadata = {
  title: "Crypto Tracker | Portfolio",
  description: "Real-time cryptocurrency price tracker with glassmorphism design",
}

export default function CryptoTrackerPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-zinc-700 via-white-900 to-neutral-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      <CryptoTracker />
    </main>
  )
}
