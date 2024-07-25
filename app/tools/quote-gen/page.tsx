'use client'
// pages/quote-generator.js
import { useState, useEffect, useRef } from 'react';

export default function QuoteGenerator() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    const fetchQuote = async () => {
        try {
            const response = await fetch('https://type.fit/api/quotes');
            const data = await response.json();
            const randomNum = Math.floor(Math.random() * 16)
            setQuote(data[randomNum].text);
            setAuthor((data[randomNum].author).split(", type.fit"));
        } catch (error) {
            setQuote("Couldn't fetch.");
        }
    };

    return (
        <>
            <p className=' text-center text-xl lg:text-3xl'>{quote}</p>
            <p className='text-zinc-400 text-sm'>{author}</p>
            {!quote && <p className='text-center'>Use button below to generate random quotes.</p>}
            <button onClick={fetchQuote} className='bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-700 duration-300 p-2 text-white rounded-md'>New Quote</button>
            {quote && <p className='text-center '>API Resource: <a className='text-zinc-400 hover:text-blue-600' target='_blank' href="https://type.fit/api/quotes">type.fit/api/quotes</a></p>}
        </>
    );
}
