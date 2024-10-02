'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';

const MarkdownPreviewer = () => {
    const [markdown, setMarkdown] = useState<string>('');

    return (
        <div className="w-full space-y-4">
            <Textarea
                placeholder="Enter Markdown"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-40"
            />
            <div className="border p-4 rounded">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );
}

export default MarkdownPreviewer;
