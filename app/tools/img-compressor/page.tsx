'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

const ImageCompressor = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [compressionPercentage, setCompressionPercentage] = useState<number>(80); // Default compression percentage
    const [compressionOptions, setCompressionOptions] = useState({
        maxSizeMB: 2,
        maxWidthOrHeight: 2048,
    });

    // Update compression options based on percentage
    useEffect(() => {
        const newMaxSizeMB = (compressionPercentage / 100) * 5; // Scale max size MB from 0 to 5
        const newMaxWidthOrHeight = (compressionPercentage / 100) * 4096; // Scale max width/height from 0 to 4096

        setCompressionOptions({
            maxSizeMB: newMaxSizeMB,
            maxWidthOrHeight: newMaxWidthOrHeight,
        });
    }, [compressionPercentage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const compressImage = async () => {
        if (selectedFile) {
            try {
                const quality = compressionPercentage / 100;

                const compressedImage = await imageCompression(selectedFile, {
                    ...compressionOptions,
                    initialQuality: quality,
                });

                setCompressedFile(compressedImage);
            } catch (error) {
                console.error('Error compressing image:', error);
            }
        }
    };

    const downloadImage = () => {
        if (compressedFile) {
            const url = URL.createObjectURL(compressedFile);
            const a = document.createElement('a');
            a.href = url;
            a.download = compressedFile.name;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="p-6">
            <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4"
            />
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Compression Options</h2>
                <div className="mt-4">
                    <span>Compression Level: {compressionPercentage}%</span>
                    <Slider
                        defaultValue={[compressionPercentage]}
                        min={1}
                        max={100}
                        step={1}
                        value={[compressionPercentage]}
                        onValueChange={(value) => setCompressionPercentage(value[0])}
                        className="w-full"
                    />
                </div>
                <div className="mt-4">
                    <p>Max File Size: {compressionOptions.maxSizeMB.toFixed(2)} MB</p>
                    <p>Max Dimensions: {compressionOptions.maxWidthOrHeight.toFixed(0)} px</p>
                </div>
                <Button onClick={compressImage} className="mb-4">
                    Compress Image
                </Button>
                {compressedFile && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold mb-2">Compressed Image</h2>
                        <div className="relative w-64 h-64">
                            <Image
                                src={URL.createObjectURL(compressedFile)}
                                alt="Compressed Image"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <Button onClick={downloadImage} className="mt-4">
                            Download Compressed Image
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageCompressor;
