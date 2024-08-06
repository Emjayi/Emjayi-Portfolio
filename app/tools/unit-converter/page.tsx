'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const UnitConverter = () => {
    const [value, setValue] = useState<number>(0);
    const [fromUnit, setFromUnit] = useState<string>('meters');
    const [toUnit, setToUnit] = useState<string>('kilometers');
    const [result, setResult] = useState<number | null>(null);
    const [units, setUnits] = useState<{ [key: string]: string[] }>({});
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        // Fetch unit categories and units from Unit Conversion API
        const fetchUnits = async () => {
            try {
                // Replace with your actual API key and endpoint
                const response = await fetch('https://unit-conversion-api.com/api/v1/units?apiKey=YOUR_API_KEY');
                const data = await response.json();

                const unitCategories = data.categories;
                const unitData = data.units;

                setCategories(unitCategories);
                setUnits(unitData);

                // Set default units if available
                if (unitCategories.length > 0) {
                    const firstCategory = unitCategories[0];
                    setFromUnit(unitData[firstCategory][0]);
                    setToUnit(unitData[firstCategory][1] || unitData[firstCategory][0]);
                }
            } catch (error) {
                console.error('Error fetching units:', error);
            }
        };

        fetchUnits();
    }, []);

    const convertUnits = async () => {
        try {
            // Replace with your actual API key and endpoint
            const response = await fetch(`https://akshayanand.herokuapp.com/api/unit/?type=type&from=${fromUnit}&to=${toUnit}&value=${value}`);
            const data = await response.json();
            setResult(data.result);
        } catch (error) {
            console.error('Error converting units:', error);
        }
    };

    return (
        <div className="p-6">
            <Input
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="mb-4"
            />
            <div className="flex gap-4 mb-4">
                <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger>
                        <SelectValue placeholder="From Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.flatMap(category => units[category]?.map(unit => (
                            <SelectItem key={unit} value={unit}>
                                {unit}
                            </SelectItem>
                        )))}
                    </SelectContent>
                </Select>
                <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger>
                        <SelectValue placeholder="To Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.flatMap(category => units[category]?.map(unit => (
                            <SelectItem key={unit} value={unit}>
                                {unit}
                            </SelectItem>
                        )))}
                    </SelectContent>
                </Select>
            </div>
            <Button onClick={convertUnits}>Convert</Button>
            {result !== null && <p className="mt-4">Result: {result} {toUnit}</p>}
        </div>
    );
}

export default UnitConverter;
