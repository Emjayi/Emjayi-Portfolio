'use client';

import { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const QRCodeGenerator = () => {
    const [text, setText] = useState<string>('');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const downloadQRCode = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qrcode.png';
            link.click();
        }
    };

    return (
        <div className="p-6 w-full flex flex-col items-center justify-center">
            <Input
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mb-4"
            />
            {text && (
                <div ref={canvasRef}>
                    <QRCode value={text} />
                </div>
            )}
            {text && (
                <Button onClick={downloadQRCode} className="mt-4">
                    Download QR Code
                </Button>
            )}
        </div>
    );
}

export default QRCodeGenerator;
