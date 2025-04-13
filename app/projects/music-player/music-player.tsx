"use client";

import type React from "react";

// Extend the Window interface to include the SC property
declare global {
	interface Window {
		SC?: any;
	}
}
import { useState, useRef, useEffect } from "react";
import {
	Play,
	Pause,
	SkipBack,
	SkipForward,
	Shuffle,
	Search,
	Download,
	Moon,
	Sun,
	Palette,
} from "lucide-react";

interface SoundCloudTrack {
	title: string;
	artwork_url: string | null;
	user: {
		username: string;
	};
	duration: number;
	permalink_url: string;
	downloadable?: boolean;
	download_url?: string;
}

type Theme = "classic" | "dark" | "retro";

export default function MusicPlayer() {
	// State management
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(90);
	const [bass, setBass] = useState(50);
	const [treble, setTreble] = useState(50);
	const [soundCloudUrl, setSoundCloudUrl] = useState("");
	const [trackInfo, setTrackInfo] = useState<SoundCloudTrack | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [iframeUrl, setIframeUrl] = useState<string | null>(null);
	const [isDraggingProgress, setIsDraggingProgress] = useState(false);
	const [theme, setTheme] = useState<Theme>("classic");
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
	const [isDownloading, setIsDownloading] = useState(false);
	const [activeKnob, setActiveKnob] = useState<string | null>(null);
	const [knobStartY, setKnobStartY] = useState(0);
	const [knobStartValue, setKnobStartValue] = useState(0);
	const [isInitializing, setIsInitializing] = useState(true);

	// Refs
	const progressRef = useRef<HTMLInputElement>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const widgetRef = useRef<any>(null);
	const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const volumeKnobRef = useRef<HTMLDivElement>(null);
	const bassKnobRef = useRef<HTMLDivElement>(null);
	const trebleKnobRef = useRef<HTMLDivElement>(null);

	// Preload SoundCloud API
	useEffect(() => {
		const preloadSoundCloudAPI = () => {
			const link = document.createElement("link");
			link.rel = "preload";
			link.href = "https://w.soundcloud.com/player/api.js";
			link.as = "script";
			document.head.appendChild(link);

			// Then load the actual script
			const script = document.createElement("script");
			script.src = "https://w.soundcloud.com/player/api.js";
			script.async = true;
			document.body.appendChild(script);

			return () => {
				document.body.removeChild(script);
				document.head.removeChild(link);
			};
		};

		return preloadSoundCloudAPI();
	}, []);

	// Add this at the beginning of the component
	useEffect(() => {
		// Simulate initialization to prevent layout shifts
		const timer = setTimeout(() => {
			setIsInitializing(false);
		}, 300);

		return () => clearTimeout(timer);
	}, []);

	// Load SoundCloud Widget API
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://w.soundcloud.com/player/api.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	// Setup progress tracking interval
	useEffect(() => {
		if (widgetRef.current && isPlaying && !isDraggingProgress) {
			// Clear any existing interval
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
			}

			// Create new interval to update progress
			progressIntervalRef.current = setInterval(() => {
				widgetRef.current.getPosition((position: number) => {
					setCurrentTime(Math.floor(position / 1000));
				});
			}, 100); // Update more frequently for smoother progress
		} else if (progressIntervalRef.current) {
			clearInterval(progressIntervalRef.current);
		}

		return () => {
			if (progressIntervalRef.current) {
				clearInterval(progressIntervalRef.current);
			}
		};
	}, [isPlaying, isDraggingProgress]);

	// Initialize SoundCloud Widget when iframe URL changes
	useEffect(() => {
		if (!iframeUrl || !window.SC) return;

		const setupWidget = () => {
			if (iframeRef.current) {
				widgetRef.current = window.SC.Widget(iframeRef.current);

				widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
					// Apply boosted volume
					applyVolumeBoost(volume);

					// Get duration when ready
					widgetRef.current.getDuration((durationMs: number) => {
						setDuration(Math.floor(durationMs / 1000));
					});

					// Bind play event
					widgetRef.current.bind(window.SC.Widget.Events.PLAY, () => {
						setIsPlaying(true);
						// Ensure boosted volume is applied when playback starts
						applyVolumeBoost(volume);
					});

					// Bind pause event
					widgetRef.current.bind(window.SC.Widget.Events.PAUSE, () => {
						setIsPlaying(false);
					});

					// Bind finish event
					widgetRef.current.bind(window.SC.Widget.Events.FINISH, () => {
						setIsPlaying(false);
						setCurrentTime(0);
					});
				});
			}
		};

		if (window.SC) {
			setupWidget();
		} else {
			window.addEventListener("scWidgetApiReady", setupWidget);
		}

		return () => {
			window.removeEventListener("scWidgetApiReady", setupWidget);
		};
	}, [iframeUrl, volume]);

	// Ensure volume changes are applied to the widget
	useEffect(() => {
		if (widgetRef.current) {
			widgetRef.current.setVolume(volume / 100);
		}
	}, [volume]);

	// Setup global mouse/touch event listeners for knob control
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (activeKnob) {
				handleKnobMove(e.clientY);
			}
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (activeKnob && e.touches[0]) {
				handleKnobMove(e.touches[0].clientY);
			}
		};

		const handleMouseUp = () => {
			setActiveKnob(null);
		};

		if (activeKnob) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("touchmove", handleTouchMove, { passive: false });
			window.addEventListener("mouseup", handleMouseUp);
			window.addEventListener("touchend", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchend", handleMouseUp);
		};
	}, [activeKnob]);

	// Format time display (mm:ss)
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	// Toggle play/pause
	const togglePlay = () => {
		if (widgetRef.current) {
			if (isPlaying) {
				widgetRef.current.pause();
			} else {
				widgetRef.current.play();
			}
		}
	};

	// Handle progress bar change
	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = Number.parseInt(e.target.value);
		setCurrentTime(newTime);

		if (widgetRef.current) {
			widgetRef.current.seekTo(newTime * 1000);
		}
	};

	// Handle progress bar interaction start
	const handleProgressDragStart = () => {
		setIsDraggingProgress(true);
	};

	// Handle progress bar interaction end
	const handleProgressDragEnd = () => {
		setIsDraggingProgress(false);
	};

	// Add this function after the handleVolumeChange function
	// Volume boost function to enhance audio levels
	const applyVolumeBoost = (baseVolume: number) => {
		// Apply a non-linear curve to boost volume at lower levels
		// This helps with SoundCloud's sometimes quiet tracks
		const boostedVolume = Math.min(1, Math.pow(baseVolume / 100, 0.8));

		if (widgetRef.current) {
			widgetRef.current.setVolume(boostedVolume);
			console.log("Applied volume boost:", boostedVolume);
		}

		return boostedVolume * 100;
	};

	// Handle volume change
	const handleVolumeChange = (newVolume: number) => {
		// Ensure volume is within bounds
		const boundedVolume = Math.max(0, Math.min(100, newVolume));
		setVolume(boundedVolume);

		// Apply the volume boost
		applyVolumeBoost(boundedVolume);
	};

	// Handle knob mouse/touch down
	const handleKnobDown = (
		knobType: string,
		e: React.MouseEvent | React.TouchEvent,
	) => {
		e.preventDefault();

		// Get the starting Y position
		const clientY =
			"touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

		setKnobStartY(clientY);
		setActiveKnob(knobType);

		// Set the starting value based on knob type
		if (knobType === "volume") {
			setKnobStartValue(volume);
		} else if (knobType === "bass") {
			setKnobStartValue(bass);
		} else if (knobType === "treble") {
			setKnobStartValue(treble);
		}
	};

	// Handle knob movement
	const handleKnobMove = (clientY: number) => {
		if (!activeKnob) return;

		// Calculate the change in Y position (negative for upward movement)
		const deltaY = knobStartY - clientY;

		// Scale the movement (adjust sensitivity as needed)
		const valueChange = Math.round(deltaY * 0.5);

		// Update the appropriate value based on active knob
		if (activeKnob === "volume") {
			const newVolume = Math.max(
				0,
				Math.min(100, knobStartValue + valueChange),
			);
			handleVolumeChange(newVolume);
		} else if (activeKnob === "bass") {
			const newBass = Math.max(0, Math.min(100, knobStartValue + valueChange));
			setBass(newBass);
		} else if (activeKnob === "treble") {
			const newTreble = Math.max(
				0,
				Math.min(100, knobStartValue + valueChange),
			);
			setTreble(newTreble);
		}
	};

	// Change theme
	const cycleTheme = () => {
		if (theme === "classic") setTheme("dark");
		else if (theme === "dark") setTheme("retro");
		else setTheme("classic");
	};

	// Fetch track from SoundCloud
	const fetchSoundCloudTrack = async () => {
		if (!soundCloudUrl.trim()) {
			setError("Please enter a SoundCloud URL");
			return;
		}

		setIsLoading(true);
		setError(null);
		setDownloadUrl(null);

		try {
			// Validate URL format
			let url: URL;
			try {
				url = new URL(soundCloudUrl);
				if (!url.hostname.includes("soundcloud.com")) {
					throw new Error("Not a valid SoundCloud URL");
				}
			} catch (e) {
				throw new Error("Please enter a valid URL");
			}

			// Set the iframe URL for the SoundCloud widget
			const widgetUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
				soundCloudUrl,
			)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
			setIframeUrl(widgetUrl);

			// Fetch track info from SoundCloud oEmbed API
			const oEmbedUrl = `https://soundcloud.com/oembed?url=${encodeURIComponent(
				soundCloudUrl,
			)}&format=json`;
			const response = await fetch(oEmbedUrl);

			if (!response.ok) {
				throw new Error("Failed to fetch track information");
			}

			const data = await response.json();

			// Extract track title and author from oEmbed response
			setTrackInfo({
				title: data.title || "Unknown Track",
				artwork_url: null, // oEmbed doesn't provide artwork
				user: {
					username: data.author_name || "Unknown Artist",
				},
				duration: 0, // Will be set by the widget
				permalink_url: soundCloudUrl,
			});

			// Set download URL
			setDownloadUrl(soundCloudUrl);

			// Reset playback state
			setIsPlaying(false);
			setCurrentTime(0);
		} catch (err) {
			console.error(err);
			setError(err instanceof Error ? err.message : "Failed to load track");
			setTrackInfo(null);
			setIframeUrl(null);
		} finally {
			setIsLoading(false);
		}
	};

	// Handle download with Python backend
	const handleDownload = () => {
		if (downloadUrl) {
			window.open(downloadUrl, "_blank");
		}
	};

	// Fallback download (open in SoundCloud)
	const handleOpenInSoundCloud = () => {
		if (downloadUrl) {
			window.open(downloadUrl, "_blank");
		}
	};

	return (
		<>
			<div className={`player-wrapper ${theme}`}>
				{isInitializing ? (
					<div className="initializing-overlay">
						<div className="loading-spinner large" />
					</div>
				) : null}
				<div className="music-player-container">
					{/* Metallic frame with texture */}
					<div className="metallic-texture" />

					<div className="player-body">
						{/* Top screws for realistic hardware look */}
						<div className="screw top-left" />
						<div className="screw top-right" />

						{/* SoundCloud URL input */}
						<div className="soundcloud-input">
							<div className="input-container">
								<input
									type="text"
									value={soundCloudUrl}
									onChange={(e) => setSoundCloudUrl(e.target.value)}
									placeholder="Enter SoundCloud URL"
									className="url-input"
								/>
								<button
									onClick={fetchSoundCloudTrack}
									disabled={isLoading}
									className="load-button"
								>
									{isLoading ? (
										<div className="loading-spinner" />
									) : (
										<>
											<Search className="search-icon" />
											<span>Load Track</span>
										</>
									)}
								</button>
							</div>
							{error && <div className="error-message">{error}</div>}
						</div>

						{/* Theme switcher */}
						<button
							onClick={cycleTheme}
							className="theme-switcher"
							aria-label="Change theme"
						>
							{theme === "classic" ? (
								<Moon className="theme-icon" />
							) : theme === "dark" ? (
								<Palette className="theme-icon" />
							) : (
								<Sun className="theme-icon" />
							)}
						</button>

						{/* Hidden SoundCloud iframe */}
						{iframeUrl && (
							<iframe
								ref={iframeRef}
								width="100%"
								height="0"
								scrolling="no"
								frameBorder="no"
								allow="autoplay"
								src={iframeUrl}
								className="hidden-iframe"
							/>
						)}

						{/* Digital display */}
						<div className="display-panel">
							<div className="digital-display">
								<div className="display-header">
									<div className="display-label">NOW PLAYING</div>
									<div className="display-status">
										{isPlaying ? "PLAYING" : "PAUSED"}
									</div>
								</div>
								<div className="track-title">
									{trackInfo ? trackInfo.title : "No Track Loaded"}
								</div>
								<div className="track-artist">
									{trackInfo
										? trackInfo.user.username
										: "Load a SoundCloud track to begin"}
								</div>
								<div className="time-display">
									<div>{formatTime(currentTime)}</div>
									<div>{formatTime(duration)}</div>
								</div>
							</div>
						</div>

						{/* Progress slider */}
						<div className="progress-container">
							<input
								ref={progressRef}
								type="range"
								min="0"
								max={duration || 100}
								value={currentTime}
								onChange={handleProgressChange}
								onMouseDown={handleProgressDragStart}
								onMouseUp={handleProgressDragEnd}
								onTouchStart={handleProgressDragStart}
								onTouchEnd={handleProgressDragEnd}
								disabled={!trackInfo}
								className="progress-slider"
								style={{
									backgroundSize: `${
										duration ? (currentTime / duration) * 100 : 0
									}% 100%`,
								}}
							/>
						</div>

						{/* Control buttons */}
						<div className="controls-panel">
							<button
								className="control-button shuffle-button"
								disabled={!trackInfo}
							>
								<Shuffle className="button-icon" />
							</button>

							<button
								className="control-button prev-button"
								disabled={!trackInfo}
							>
								<SkipBack className="button-icon" />
							</button>

							<button
								onClick={togglePlay}
								disabled={!trackInfo}
								className="play-button"
							>
								{isPlaying ? (
									<Pause className="play-icon" />
								) : (
									<Play className="play-icon play-offset" />
								)}
							</button>

							<button
								className="control-button next-button"
								disabled={!trackInfo}
							>
								<SkipForward className="button-icon" />
							</button>

							<button
								onClick={handleOpenInSoundCloud}
								disabled={!downloadUrl || isDownloading}
								className="control-button download-button"
								title="Open in SoundCloud"
							>
								{isDownloading ? (
									<div className="loading-spinner small" />
								) : (
									<Download className="button-icon" />
								)}
							</button>
						</div>

						{/* Python download button */}
						{downloadUrl && (
							<div className="download-container">
								<button
									onClick={handleDownload}
									className="python-download-button"
								>
									Open in SoundCloud
								</button>
								<div className="download-hint">
									To download, open in SoundCloud and use the download button
									there if available
								</div>
							</div>
						)}

						{/* Knobs and sliders panel */}
						<div className="knobs-panel">
							{/* Volume knob */}
							<div className="knob-container">
								<div className="knob-label">VOLUME</div>
								<div
									ref={volumeKnobRef}
									className={`knob volume-knob ${
										activeKnob === "volume" ? "active" : ""
									}`}
									onMouseDown={(e) => handleKnobDown("volume", e)}
									onTouchStart={(e) => handleKnobDown("volume", e)}
								>
									<div
										className="knob-indicator"
										style={{
											transform: `translateX(-50%) rotate(${volume * 2.7}deg)`,
										}}
									/>
									<div className="knob-center" />
									<div className="knob-value-display">{volume}%</div>
								</div>
								<div className="knob-value">{volume}%</div>
								<div className="knob-touch-hint">Drag up/down to adjust</div>
							</div>

							{/* Bass knob */}
							<div className="knob-container">
								<div className="knob-label">BASS</div>
								<div
									ref={bassKnobRef}
									className={`knob bass-knob ${
										activeKnob === "bass" ? "active" : ""
									}`}
									onMouseDown={(e) => handleKnobDown("bass", e)}
									onTouchStart={(e) => handleKnobDown("bass", e)}
								>
									<div
										className="knob-indicator"
										style={{
											transform: `translateX(-50%) rotate(${bass * 2.7}deg)`,
										}}
									/>
									<div className="knob-center" />
									<div className="knob-value-display">{bass}%</div>
								</div>
								<div className="knob-value">{bass}%</div>
								<div className="knob-touch-hint">Drag up/down to adjust</div>
							</div>

							{/* Treble knob */}
							<div className="knob-container">
								<div className="knob-label">TREBLE</div>
								<div
									ref={trebleKnobRef}
									className={`knob treble-knob ${
										activeKnob === "treble" ? "active" : ""
									}`}
									onMouseDown={(e) => handleKnobDown("treble", e)}
									onTouchStart={(e) => handleKnobDown("treble", e)}
								>
									<div
										className="knob-indicator"
										style={{
											transform: `translateX(-50%) rotate(${treble * 2.7}deg)`,
										}}
									/>
									<div className="knob-center" />
									<div className="knob-value-display">{treble}%</div>
								</div>
								<div className="knob-value">{treble}%</div>
								<div className="knob-touch-hint">Drag up/down to adjust</div>
							</div>
						</div>

						{/* Bottom screws for realistic hardware look */}
						<div className="screw bottom-left" />
						<div className="screw bottom-right" />
					</div>
				</div>
			</div>

			{/* Component-scoped styling */}
			<style jsx>{`
        /* Base styles for all themes */
        .player-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
          transition: background 0.3s ease;
        }

        .music-player-container {
          position: relative;
          width: 100%;
          max-width: 32rem;
          border-radius: 0.75rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .metallic-texture {
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjOWU5ZTllIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=');
          opacity: 0.1;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .player-body {
          position: relative;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        /* Theme switcher */
        .theme-switcher {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .theme-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Screws */
        .screw {
          position: absolute;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .top-left {
          top: 0.75rem;
          left: 0.75rem;
        }

        .top-right {
          top: 0.75rem;
          right: 0.75rem;
        }

        .bottom-left {
          bottom: 0.75rem;
          left: 0.75rem;
        }

        .bottom-right {
          bottom: 0.75rem;
          right: 0.75rem;
        }

        /* SoundCloud input */
        .soundcloud-input {
          margin-bottom: 1.5rem;
          padding-right: 3rem; /* Make space for theme button */
        }

        .input-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        @media (min-width: 640px) {
          .input-container {
            flex-direction: row;
          }
        }

        .url-input {
          flex: 1;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .url-input:focus {
          outline: none;
        }

        .load-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .load-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .search-icon {
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }

        .loading-spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-spinner.small {
          width: 1rem;
          height: 1rem;
          border-width: 1px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .error-message {
          font-size: 0.875rem;
          margin-top: 0.5rem;
          transition: color 0.3s ease;
        }

        .hidden-iframe {
          display: none;
        }

        /* Digital display */
        .display-panel {
          margin-bottom: 1.5rem;
          border-radius: 0.5rem;
          padding: 1rem;
          transition: all 0.3s ease;
        }

        .digital-display {
          border-radius: 0.375rem;
          padding: 0.75rem;
          font-family: monospace;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .digital-display::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          40%,
          100% {
            left: 100%;
          }
        }

        .display-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .display-label,
        .display-status {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .track-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 0.5rem;
          letter-spacing: 0.05em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-artist {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .time-display {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          margin-top: 0.75rem;
        }

        /* Progress slider */
        .progress-container {
          margin-bottom: 1.5rem;
          padding: 0 0.5rem;
        }

        .progress-slider {
          width: 100%;
          height: 0.375rem;
          -webkit-appearance: none;
          appearance: none;
          border-radius: 0.25rem;
          background-repeat: no-repeat;
          transition: all 0.3s ease;
        }

        .progress-slider:focus {
          outline: none;
        }

        .progress-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .progress-slider::-moz-range-thumb {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .progress-slider:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Control buttons */
        .controls-panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .control-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .button-icon {
          width: 1.25rem;
          height: 1.25rem;
          transition: color 0.3s ease;
        }

        .play-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .play-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .play-icon {
          width: 1.75rem;
          height: 1.75rem;
          transition: color 0.3s ease;
        }

        .play-offset {
          margin-left: 0.25rem;
        }

        /* Python download button */
        .download-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .python-download-button {
          padding: 0.5rem 1.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-weight: 500;
        }

        .python-download-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Knobs panel */
        .knobs-panel {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .knobs-panel {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .knob-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1rem;
        }

        .knob-label {
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
          font-weight: bold;
        }

        .knob {
          position: relative;
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: grab;
          touch-action: none;
        }

        .knob.active {
          cursor: grabbing;
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }

        .knob-indicator {
          position: absolute;
          width: 0.125rem;
          height: 2rem;
          border-radius: 9999px;
          top: 0.25rem;
          left: 50%;
          transform: translateX(-50%);
          transform-origin: bottom;
          transition: all 0.2s ease;
        }

        .knob-center {
          position: absolute;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }

        .knob-value-display {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.75rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 0.8);
          pointer-events: none;
        }

        .knob-value {
          font-size: 0.875rem;
          margin-top: 0.5rem;
          transition: color 0.3s ease;
          font-weight: bold;
        }

        .knob-touch-hint {
          font-size: 0.7rem;
          margin-top: 0.25rem;
          opacity: 0.7;
          text-align: center;
        }

        /* Metallic texture and reflections */
        .music-player-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          z-index: 1;
          transition: background 0.3s ease;
        }

        .music-player-container::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          z-index: 1;
          transition: background 0.3s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .player-body {
            padding: 1rem;
          }

          .theme-switcher {
            top: 1rem;
            right: 1rem;
            width: 2rem;
            height: 2rem;
          }

          .controls-panel {
            margin-bottom: 1.5rem;
          }

          .control-button {
            width: 2rem;
            height: 2rem;
          }

          .button-icon {
            width: 1rem;
            height: 1rem;
          }

          .play-button {
            width: 3rem;
            height: 3rem;
          }

          .play-icon {
            width: 1.5rem;
            height: 1.5rem;
          }

          .knobs-panel {
            gap: 1rem;
          }

          .knob {
            width: 3.5rem;
            height: 3.5rem;
          }

          .knob-indicator {
            height: 1.75rem;
          }

          .knob-center {
            width: 1.25rem;
            height: 1.25rem;
          }

          .knob-value-display {
            font-size: 0.7rem;
          }
        }

        /* Classic Theme (Default) */
        .classic {
          background: linear-gradient(to bottom right, #1a1a1a, #000000);
        }

        .classic .player-body {
          background: linear-gradient(to bottom, #4a4a4a, #2a2a2a);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .classic .theme-switcher {
          background: linear-gradient(to bottom, #555, #333);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .classic .theme-icon {
          color: #ddd;
        }

        .classic .screw {
          background: linear-gradient(to bottom right, #a0a0a0, #606060);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5);
        }

        .classic .url-input {
          background-color: #333;
          border: 1px solid #555;
          color: white;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
        }

        .classic .url-input::placeholder {
          color: #999;
        }

        .classic .url-input:focus {
          border-color: #00ccff;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 204, 255, 0.3);
        }

        .classic .load-button {
          background: linear-gradient(to bottom, #555, #333);
          color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .classic .load-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #666, #444);
        }

        .classic .load-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #444, #333);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .classic .error-message {
          color: #ff6b6b;
        }

        .classic .display-panel {
          background: linear-gradient(to bottom, #222, #111);
          border: 1px solid #444;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
        }

        .classic .digital-display {
          background-color: #1a3040;
          color: #00ffcc;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
        }

        .classic .progress-slider {
          background: linear-gradient(to right, #222, #333);
          background-image: linear-gradient(to right, #00ffcc, #00ccff);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.9);
        }

        .classic .progress-slider::-webkit-slider-thumb {
          background: linear-gradient(to bottom, #ccc, #999);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .classic .progress-slider::-moz-range-thumb {
          background: linear-gradient(to bottom, #ccc, #999);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .classic .control-button {
          background: linear-gradient(to bottom, #555, #333);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .classic .control-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #666, #444);
        }

        .classic .control-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #444, #333);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .classic .button-icon {
          color: #ddd;
        }

        .classic .play-button {
          background: linear-gradient(to bottom, #444, #222);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .classic .play-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #555, #333);
        }

        .classic .play-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #333, #222);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .classic .play-icon {
          color: white;
        }

        .classic .python-download-button {
          background: linear-gradient(to bottom, #00ccff, #0099cc);
          color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .classic .python-download-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #00d6ff, #00a3d6);
        }

        .classic .python-download-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #0099cc, #00ccff);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .classic .knob-label, .classic .knob-value, .classic .knob-touch-hint {
          color: #aaa;
        }

        .classic .knob {
          background: linear-gradient(to bottom, #333, #222);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .classic .knob-indicator {
          background-color: #ddd;
        }

        .classic .knob-center {
          background: linear-gradient(to bottom, #555, #333);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
        }

        .classic .music-player-container::before {
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
        }

        .classic .music-player-container::after {
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
        }

        /* Dark Theme */
        .dark {
          background: linear-gradient(to bottom right, #000000, #0a0a0a);
        }

        .dark .player-body {
          background: linear-gradient(to bottom, #1a1a1a, #0a0a0a);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .dark .theme-switcher {
          background: linear-gradient(to bottom, #333, #111);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .dark .theme-icon {
          color: #6b8aff;
        }

        .dark .screw {
          background: linear-gradient(to bottom right, #444, #222);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.7);
        }

        .dark .url-input {
          background-color: #111;
          border: 1px solid #333;
          color: #ddd;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.7);
        }

        .dark .url-input::placeholder {
          color: #666;
        }

        .dark .url-input:focus {
          border-color: #6b8aff;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(107, 138, 255, 0.3);
        }

        .dark .load-button {
          background: linear-gradient(to bottom, #333, #111);
          color: #ddd;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .dark .load-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #444, #222);
        }

        .dark .load-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #222, #111);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .dark .error-message {
          color: #ff6b8a;
        }

        .dark .display-panel {
          background: linear-gradient(to bottom, #111, #000);
          border: 1px solid #333;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.7);
        }

        .dark .digital-display {
          background-color: #0a1a2a;
          color: #6b8aff;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.9);
        }

        .dark .progress-slider {
          background: linear-gradient(to right, #111, #222);
          background-image: linear-gradient(to right, #6b8aff, #8a6bff);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.9);
        }

        .dark .progress-slider::-webkit-slider-thumb {
          background: linear-gradient(to bottom, #888, #555);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        }

        .dark .progress-slider::-moz-range-thumb {
          background: linear-gradient(to bottom, #888, #555);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        }

        .dark .control-button {
          background: linear-gradient(to bottom, #333, #111);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .dark .control-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #444, #222);
        }

        .dark .control-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #222, #111);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .dark .button-icon {
          color: #6b8aff;
        }

        .dark .play-button {
          background: linear-gradient(to bottom, #222, #000);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .dark .play-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #333, #111);
        }

        .dark .play-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #111, #000);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        .dark .play-icon {
          color: #6b8aff;
        }

        .dark .python-download-button {
          background: linear-gradient(to bottom, #6b8aff, #4a69ff);
          color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .dark .python-download-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #7b9aff, #5a79ff);
        }

        .dark .python-download-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #4a69ff, #6b8aff);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        .dark .knob-label, .dark .knob-value, .dark .knob-touch-hint {
          color: #888;
        }

        .dark .knob {
          background: linear-gradient(to bottom, #222, #111);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }

        .dark .knob-indicator {
          background-color: #6b8aff;
        }

        .dark .knob-center {
          background: linear-gradient(to bottom, #333, #111);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.05);
        }

        .dark .music-player-container::before {
          background: linear-gradient(to right, transparent, rgba(107, 138, 255, 0.2), transparent);
        }

        .dark .music-player-container::after {
          background: linear-gradient(to right, transparent, rgba(107, 138, 255, 0.1), transparent);
        }

        /* Retro Theme */
        .retro {
          background: linear-gradient(to bottom right, #8b4513, #654321);
        }

        .retro .player-body {
          background: linear-gradient(to bottom, #deb887, #cd853f);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          border: 4px solid #a0522d;
        }

        .retro .theme-switcher {
          background: linear-gradient(to bottom, #8b4513, #654321);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          border: 2px solid #a0522d;
        }

        .retro .theme-icon {
          color: #f5deb3;
        }

        .retro .screw {
          background: linear-gradient(to bottom right, #b8860b, #8b4513);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.5);
          border: 1px solid #a0522d;
        }

        .retro .url-input {
          background-color: #f5deb3;
          border: 2px solid #a0522d;
          color: #8b4513;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
          font-family: 'Courier New', monospace;
        }

        .retro .url-input::placeholder {
          color: #b8860b;
        }

        .retro .url-input:focus {
          border-color: #8b4513;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(139, 69, 19, 0.3);
        }

        .retro .load-button {
          background: linear-gradient(to bottom, #8b4513, #654321);
          color: #f5deb3;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          border: 2px solid #a0522d;
          font-family: 'Courier New', monospace;
        }

        .retro .load-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #a0522d, #8b4513);
        }

        .retro .load-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #654321, #8b4513);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .retro .error-message {
          color: #a52a2a;
          font-family: 'Courier New', monospace;
        }

        .retro .display-panel {
          background: linear-gradient(to bottom, #a0522d, #8b4513);
          border: 2px solid #a0522d;
          box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
        }

        .retro .digital-display {
          background-color: #2f4f4f;
          color: #32cd32;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
          font-family: 'Courier New', monospace;
        }

        .retro .progress-slider {
          background: linear-gradient(to right, #8b4513, #a0522d);
          background-image: linear-gradient(to right, #32cd32, #228b22);
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.7);
          border: 1px solid #a0522d;
        }

        .retro .progress-slider::-webkit-slider-thumb {
          background: linear-gradient(to bottom, #f5deb3, #deb887);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          border: 1px solid #a0522d;
        }

        .retro .progress-slider::-moz-range-thumb {
          background: linear-gradient(to bottom, #f5deb3, #deb887);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          border: 1px solid #a0522d;
        }

        .retro .control-button {
          background: linear-gradient(to bottom, #8b4513, #654321);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          border: 2px solid #a0522d;
        }

        .retro .control-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #a0522d, #8b4513);
        }

        .retro .control-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #654321, #8b4513);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .retro .button-icon {
          color: #f5deb3;
        }

        .retro .play-button {
          background: linear-gradient(to bottom, #a0522d, #8b4513);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          border: 2px solid #a0522d;
        }

        .retro .play-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #b8860b, #a0522d);
        }

        .retro .play-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #8b4513, #a0522d);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .retro .play-icon {
          color: #f5deb3;
        }

        .retro .python-download-button {
          background: linear-gradient(to bottom, #228b22, #006400);
          color: #f5deb3;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          border: 2px solid #006400;
          font-family: 'Courier New', monospace;
        }

        .retro .python-download-button:hover:not(:disabled) {
          background: linear-gradient(to bottom, #32cd32, #228b22);
        }

        .retro .python-download-button:active:not(:disabled) {
          background: linear-gradient(to bottom, #006400, #228b22);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
        }

        .retro .knob-label, .retro .knob-value, .retro .knob-touch-hint {
          color: #8b4513;
          font-family: 'Courier New', monospace;
          font-weight: bold;
        }

        .retro .knob {
          background: linear-gradient(to bottom, #a0522d, #8b4513);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          border: 2px solid #a0522d;
        }

        .retro .knob-indicator {
          background-color: #f5deb3;
          border: 1px solid #a0522d;
        }

        .retro .knob-center {
          background: linear-gradient(to bottom, #deb887, #cd853f);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.3);
          border: 1px solid #a0522d;
        }

        .retro .music-player-container::before {
          background: linear-gradient(to right, transparent, rgba(245, 222, 179, 0.4), transparent);
        }

        .retro .music-player-container::after {
          background: linear-gradient(to right, transparent, rgba(245, 222, 179, 0.2), transparent);
        }

        .download-hint {
          font-size: 0.7rem;
          opacity: 0.7;
          text-align: center;
        }

        .initializing-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .loading-spinner.large {
          width: 3rem;
          height: 3rem;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
        }
      `}</style>
		</>
	);
}
