import os
import requests
import yt_dlp
from tempfile import NamedTemporaryFile
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel

app = FastAPI()

class DownloadRequest(BaseModel):
    url: str

@app.post("/api/soundcloud-download")
async def download_track(request: DownloadRequest):
    try:
        # Configure yt-dlp options
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': '%(title)s.%(ext)s',
            'quiet': True,
            'no_warnings': True,
        }
        
        # Create a temporary file to store the download
        with NamedTemporaryFile(delete=False, suffix='.mp3') as temp_file:
            temp_path = temp_file.name
        
        # Extract info and download using yt-dlp
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(request.url, download=False)
            
            # Get the best audio format
            for format in info.get('formats', []):
                if format.get('acodec') != 'none' and format.get('vcodec') == 'none':
                    download_url = format['url']
                    break
            else:
                # If no suitable format found, use the default download
                ydl.download([request.url])
                download_url = None
            
            # If we found a direct URL, download it manually
            if download_url:
                response = requests.get(download_url, stream=True)
                with open(temp_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
            
            # Get filename from info
            title = info.get('title', 'soundcloud_track')
            filename = f"{title}.mp3"
            
            # Read the file
            with open(temp_path, 'rb') as f:
                file_content = f.read()
            
            # Clean up the temporary file
            os.unlink(temp_path)
            
            # Return the file as a response
            response = Response(content=file_content)
            response.headers["Content-Disposition"] = f'attachment; filename="{filename}"'
            response.headers["Content-Type"] = "audio/mpeg"
            return response
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
