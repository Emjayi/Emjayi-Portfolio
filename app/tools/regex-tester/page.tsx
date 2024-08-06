'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const RegexTester = () => {
    const [pattern, setPattern] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [matches, setMatches] = useState<string[]>([]);

    const testRegex = () => {
        try {
            const regex = new RegExp(pattern, 'g');
            const result = text.match(regex) || [];
            setMatches(result);
        } catch (e) {
            setMatches(['Invalid Regular Expression']);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Regular Expression Tester</h1>
            <Input
                type="text"
                placeholder="Enter Regex Pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="mb-4"
            />
            <Textarea
                rows={5}
                placeholder="Enter Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mb-4"
            ></Textarea>
            <Button className="mb-4" onClick={testRegex}>Test</Button>
            <div>
                <h2 className="font-bold">Matches</h2>
                <ul>
                    {matches.map((match, index) => (
                        <li key={index}>{match}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RegexTester;
