'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

const StringSplitter = () => {
    const [inputString, setInputString] = useState<string>('');
    const [delimiter, setDelimiter] = useState<string>(',');
    const [splitStrings, setSplitStrings] = useState<string[]>([]);

    const splitString = () => {
        const results = inputString.split(delimiter);
        setSplitStrings(results);
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">String Splitter</h1>

            <Textarea
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                placeholder="Enter your string here"
                className="w-full"
            />

            <div className="flex items-center space-x-2">
                <span>Delimiter:</span>
                <Select value={delimiter} onValueChange={(value) => setDelimiter(value)}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select delimiter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value=",">Comma (,)</SelectItem>
                        <SelectItem value=" ">Space</SelectItem>
                        <SelectItem value="|">Pipe (|)</SelectItem>
                        <SelectItem value="-">Dash (-)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={splitString} className="">
                Split String
            </Button>

            {splitStrings.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Results</h2>
                    <ul className="list-disc pl-5">
                        {splitStrings.map((str, index) => (
                            <li key={index}>{str}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StringSplitter;
