'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Calculator() {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<string>('');

    const handleButtonClick = (value: string) => {
        setInput((prev) => prev + value);
    };

    const calculateResult = () => {
        try {
            const evalResult = eval(input); // Note: eval() is dangerous and should not be used in production code.
            const resultStr = evalResult.toString();
            setResult(resultStr);
            setInput(resultStr);
        } catch {
            setResult('Error');
            setInput('');
        }
    };

    const clearInput = () => {
        setInput('');
        setResult('');
    };

    const handleOperatorClick = (operator: string) => {
        if (input !== '') {
            const lastChar = input.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                setInput(input.slice(0, -1) + operator);
            } else {
                setInput(input + operator);
            }
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
            <div className="flex gap-2">
                <Input
                    type="text"
                    value={input}
                    readOnly
                    className=""
                />
                <Button onClick={clearInput} className='bg-primary'>
                    Clear
                </Button>
            </div>
            <div className="flex gap-2">
                <div className="grid grid-cols-3 gap-2 flex-grow">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                        <Button
                            key={num}
                            onClick={() => handleButtonClick(num.toString())}
                            variant="default"
                            className="bg-secondary text-default"
                        >
                            {num}
                        </Button>
                    ))}
                    <Button
                        onClick={calculateResult}
                        className="bg-green-600 dark:bg-green-900 col-span-2"
                    >
                        =
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {['+', '-', '*', '/'].map((op) => (
                        <Button
                            key={op}
                            onClick={() => handleOperatorClick(op)}
                            variant="default"
                            className="bg-primary"
                        >
                            {op}
                        </Button>
                    ))}

                </div>
            </div>
        </div>
    );
}
