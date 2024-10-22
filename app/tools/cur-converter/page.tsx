'use client';

import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [currency, setCurrency] = useState<string>('EUR');
  const [rate, setRate] = useState<number | null>(null);

  const fetchRate = async () => {
    try {
      const response = await fetch(
        'https://api.exchangerate-api.com/v4/latest/USD',
      );
      const data = await response.json();
      setRate(data.rates[currency]);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
    }
  };

  useEffect(() => {
    fetchRate();
  }, [currency]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Select
          value={currency}
          onValueChange={(value: string) => setCurrency(value)}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="EUR" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
            <SelectItem value="IRR">IRR</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="w-full bg-white/40 dark:bg-black/40 p-2 rounded-lg">
        {amount} USD = {(amount * (rate ?? 0)).toFixed(2)} {currency}
      </p>
      <p className="w-full text-center p-2 rounded-lg">
        API Reference:{' '}
        <a href="https://www.exchangerate-api.com/" className="text-zinc-500">
          https://www.exchangerate-api.com/
        </a>
      </p>
    </div>
  );
};

export default CurrencyConverter;
