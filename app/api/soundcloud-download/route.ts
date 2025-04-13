import { type NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";

const execPromise = promisify(exec);

export async function POST(request: NextRequest) {
	try {
		const { url } = await request.json();

		if (!url || !url.includes("soundcloud.com")) {
			return NextResponse.json(
				{ error: "Invalid SoundCloud URL" },
				{ status: 400 },
			);
		}

		// Create a temporary directory
		const tempDir = path.join(os.tmpdir(), "soundcloud-downloads");
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
		}

		// Generate a unique filename
		const timestamp = Date.now();
		const outputPath = path.join(tempDir, `track-${timestamp}.mp3`);

		// Execute youtube-dl (or yt-dlp) to download the track
		// Note: This requires youtube-dl or yt-dlp to be installed on the server
		try {
			const command = `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`;
			await execPromise(command);
		} catch (error) {
			console.error("Download error:", error);
			return NextResponse.json(
				{ error: "Failed to download track" },
				{ status: 500 },
			);
		}

		// Check if file exists
		if (!fs.existsSync(outputPath)) {
			return NextResponse.json(
				{ error: "Failed to download file" },
				{ status: 500 },
			);
		}

		// Read the file
		const fileBuffer = fs.readFileSync(outputPath);

		// Get track info from the URL to create a better filename
		const urlParts = url.split("/");
		const trackName = urlParts[urlParts.length - 1] || "soundcloud-track";
		const safeTrackName = trackName.replace(/[^a-z0-9]/gi, "-").toLowerCase();

		// Clean up the temporary file
		fs.unlinkSync(outputPath);

		// Return the file as a response
		return new NextResponse(fileBuffer, {
			headers: {
				"Content-Disposition": `attachment; filename="${safeTrackName}.mp3"`,
				"Content-Type": "audio/mpeg",
			},
		});
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
