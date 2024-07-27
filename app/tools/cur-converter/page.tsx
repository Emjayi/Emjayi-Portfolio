// pages/currency-converter.tsx
import { useState, useEffect } from 'react';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState<number>(1);
    const [currency, setCurrency] = useState<string>('EUR');
    const [rate, setRate] = useState<number | null>(null);

    const fetchRate = async () => {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await response.json();
        setRate(data.rates[currency]);
    };

    useEffect(() => {
        fetchRate();
    }, [currency]);

    return (
        <div>
            <h1>Currency Converter</h1>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
            </select>
            <p>{amount} USD = {(amount * (rate ?? 0)).toFixed(2)} {currency}</p>
        </div>
    );
}

export default CurrencyConverter;
