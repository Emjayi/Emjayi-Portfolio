// pages/password-generator.js
'use client'
// pages/password-generator.js
import { useState } from 'react';
import crypto from 'crypto';

export default function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [useSHA256, setUseSHA256] = useState(false);

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const symbols = '!@#$%^&*()';
        const numbers = '0123456789';
        const selectedChars = chars + (includeSymbols ? symbols : '') + (includeNumbers ? numbers : '');
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
        <>
            <label className='flex items-center w-36 gap-2'>
                Length:
                <select value={length} onChange={(e) => setLength(Number(e.target.value))} className='bg-zinc-700 p-2 text-white rounded-md w-full flex-[5]'>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
                </select>
            </label>
            <label>
                Include Symbols:
                <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
            </label>
            <label>
                Include Numbers:
                <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
            </label>
            <label>
                Use SHA-256:
                <input type="checkbox" checked={useSHA256} onChange={() => setUseSHA256(!useSHA256)} />
            </label>
            <button onClick={generatePassword} className='bg-zinc-700 p-2 text-white rounded-md'>Generate Password</button>
            <p>{password}</p>
        </>
    );
}

