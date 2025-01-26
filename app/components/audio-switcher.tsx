'use client';

import { useState, useEffect } from 'react';
import { Slider } from './ui/slider';

export const AudioSwitcher = () => {
    const [audio] = useState(new Audio('/ee.mp3'));
    const [volume, setVolume] = useState(() => {
        // Try to get saved volume from localStorage, default to 0.1 if not found
        const savedVolume = localStorage.getItem('audioVolume');
        return savedVolume ? parseFloat(savedVolume) : 0.1;
    });
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        if (!isMobile) {
            audio.play();
        }
        return () => window.removeEventListener('resize', checkMobile);
    }, [audio, isMobile]);

    useEffect(() => {
        audio.volume = volume;
        // Save volume to localStorage whenever it changes
        localStorage.setItem('audioVolume', volume.toString());
    }, [volume, audio]);

    const handleVolumeChange = (value: number[]) => {
        audio.play();
        setVolume(value[0]);
    };

    return (
        <div className="hidden cursor-pointer md:flex fixed right-12 top-6 z-50 items-center gap-2">
            <Slider
                step={0.005}
                min={0}
                max={.5}
                value={[volume]}
                onValueChange={handleVolumeChange}
                className="w-20"
            />
        </div>
    );
}