'use client'
// pages/calculator.js
import { useState } from 'react';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const handleButtonClick = (value: any) => {
        setInput((prev) => prev + value);
    };

    const calculateResult = () => {
        try {
            setResult(eval(input)); // Note: eval() is dangerous and should not be used in production code.
        } catch {
            setResult('Error');
        }
    };

    const clearInput = () => {
        setInput('');
        setResult("");
    };

    return (
        <>
            <div className='flex gap-2 w-full'>
                <input type="text" value={input} readOnly className='bg-zinc-700 p-2 text-white rounded-md w-full flex-[5]' />
                <button onClick={clearInput} className='bg-zinc-400 p-2 text-zinc-800 rounded-md w-full flex-1' >Clear</button>
            </div>
            <div className='flex gap-2 w-full'>
                <div className='grid grid-cols-3 gap-2 w-full flex-[3]'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                        <button key={num} onClick={() => handleButtonClick(num)} className=' bg-zinc-600 p-2 text-white rounded-md'>{num}</button>
                    ))}
                    <button onClick={calculateResult} className='bg-green-700 p-2 text-white rounded-md col-span-2'>=</button>
                </div>
                <div className='grid grid-cols-1 gap-2 w-full flex-1'>
                    {['+', '-', '*', '/'].map((op) => (
                        <button key={op} onClick={() => handleButtonClick(op)} className='bg-zinc-700 p-2 text-white rounded-md'>{op}</button>
                    ))}
                </div>

            </div>
            {result !== null && <div className='bg-zinc-700 p-2 min-w-32 h-10 text-center text-white rounded-md'>{result}</div>}
        </>
    );
}
