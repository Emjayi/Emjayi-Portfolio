'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import diff from 'diff';

const TextDiffChecker = () => {
    const [text1, setText1] = useState<string>('');
    const [text2, setText2] = useState<string>('');
    const [diffs, setDiffs] = useState<string[]>([]);

    const checkDiff = () => {
        const diffResult = diff.diffWords(text1, text2);
        const formattedDiffs = diffResult.map((part) => (
            part.added ? `<span style="color: green;">${part.value}</span>` :
                part.removed ? `<span style="color: red;">${part.value}</span>` :
                    part.value
        ));
        setDiffs(formattedDiffs);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Text Diff Checker</h1>
            <Textarea
                rows={5}
                placeholder="Enter Text 1"
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="mb-4"
            ></Textarea>
            <Textarea
                rows={5}
                placeholder="Enter Text 2"
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="mb-4"
            ></Textarea>
            <Button className="mb-4" onClick={checkDiff}>Check Diff</Button>
            <div dangerouslySetInnerHTML={{ __html: diffs.join('') }}></div>
        </div>
    );
}

export default TextDiffChecker;
