'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
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
    const selectedChars =
      chars + (includeSymbols ? symbols : '') + (includeNumbers ? numbers : '');
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += selectedChars.charAt(
        Math.floor(Math.random() * selectedChars.length),
      );
    }

    if (useSHA256) {
      newPassword = crypto
        .createHash('sha256')
        .update(newPassword)
        .digest('hex');
    }

    setPassword(newPassword);
  };

  return (
    <div className="space-y-4 flex flex-col items-center space-x-2">
      <div className="flex items-center space-x-2">
        <span>Length:</span>
        <Select
          value={length.toString()}
          onValueChange={(value) => setLength(Number(value))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Select length" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="18">18</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="symbols"
          checked={includeSymbols}
          onCheckedChange={() => setIncludeSymbols(!includeSymbols)}
        />
        <label htmlFor="symbols">Include Symbols</label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="numbers"
          checked={includeNumbers}
          onCheckedChange={() => setIncludeNumbers(!includeNumbers)}
        />
        <label htmlFor="numbers">Include Numbers</label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="sha256"
          checked={useSHA256}
          onCheckedChange={() => setUseSHA256(!useSHA256)}
        />
        <label htmlFor="sha256">Use SHA-256</label>
      </div>

      <Button onClick={generatePassword} className="">
        Generate Password
      </Button>

      <p className="text-lg font-mono text-center">{password}</p>
    </div>
  );
}
