// pages/password-generator.js
'use client'
// pages/password-generator.js
import { useState } from 'react';
import crypto from 'crypto';

export default function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [useSHA256, setUseSHA256] = useState(false);

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const symbols = '!@#$%^&*()';
        const selectedChars = chars + (includeSymbols ? symbols : '');
        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += selectedChars.charAt(Math.floor(Math.random() * selectedChars.length));
        }

        if (useSHA256) {
            newPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
        }

        setPassword(newPassword);
    };

    return (
        <div className='flex flex-col gap-3 justify-center items-center w-[100dw] h-[100dvh]'>
            <h1 className='text-xl'>Password Generator</h1>
            <div className='flex flex-col gap-2 justify-center items-center p-6 bg-zinc-800 rounded-md text-white w-[40%] h-[50%]'>
                <label>
                    Length:
                    <input type="text" value={length} onChange={(e) => setLength(e.target.value)} className='bg-zinc-700 rounded-md text-white text-center w-12' />
                </label>
                <label>
                    Include Symbols:
                    <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                </label>
                <label>
                    Use SHA-256:
                    <input type="checkbox" checked={useSHA256} onChange={() => setUseSHA256(!useSHA256)} />
                </label>
                <button onClick={generatePassword} className='bg-zinc-700 p-2 text-white rounded-md'>Generate Password</button>
                <p>{password}</p>
            </div>
        </div>
    );
}

