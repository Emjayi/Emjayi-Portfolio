"use client";

import { useState, useEffect } from "react";
import MusicPlayer from "./music-player";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Set loading to false after a short delay to ensure CSS is loaded
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<main>
			{isLoading ? (
				<div className="loading-container">
					<div className="loading-spinner" />
				</div>
			) : (
				<MusicPlayer />
			)}

			<style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to bottom right, #1a1a1a, #000000);
        }
        
        .loading-spinner {
          width: 3rem;
          height: 3rem;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
		</main>
	);
}
