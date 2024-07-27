'use client'
// pages/regex-tester.tsx
import { useState } from 'react';

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
        <div>
            <h1>Regular Expression Tester</h1>
            <input
                type="text"
                placeholder="Enter Regex Pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
            />
            <textarea
                rows={5}
                placeholder="Enter Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <button onClick={testRegex}>Test</button>
            <div>
                <h2>Matches</h2>
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
