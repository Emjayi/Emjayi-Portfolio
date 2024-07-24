'use client'
// pages/quote-generator.js
import { useState, useEffect } from 'react';

export default function QuoteGenerator() {
    const [quote, setQuote] = useState('');

    const fetchQuote = async () => {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category={}');
        const data = await response.json();
        setQuote(data.qoute);
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className='flex flex-col gap-3 justify-center items-center w-[100dw] h-[100dvh]'>
            <h1 className='text-xl'>Password Generator</h1>
            <div className='flex flex-col gap-2 justify-center items-center p-6 bg-zinc-800 rounded-md text-white w-[40%] h-[50%]'>
                <h1>Random Quote Generator</h1>
                <p>{quote}</p>
                <button onClick={fetchQuote}>New Quote</button>
            </div>
        </div>
    );
}
