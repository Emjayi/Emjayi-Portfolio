'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { minify } from 'html-minifier';

const HTMLMinifier = () => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');

    const minifyHTML = () => {
        const minifiedHTML = minify(input, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true
        });
        setOutput(minifiedHTML);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">HTML Minifier</h1>
            <Textarea
                rows={5}
                placeholder="Enter HTML"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="mb-4"
            ></Textarea>
            <Button className="mb-4" onClick={minifyHTML}>Minify HTML</Button>
            <Textarea rows={5} value={output} readOnly className="w-full"></Textarea>
        </div>
    );
}

export default HTMLMinifier;
