'use client'
// pages/css-gradient-gen.tsx
import { useState } from 'react';

const CSSGradientGen = () => {
    const [color1, setColor1] = useState<string>('#ff0000');
    const [color2, setColor2] = useState<string>('#0000ff');
    const [angle, setAngle] = useState<number>(90);
    const [gradient, setGradient] = useState<string>('');

    const generateGradient = () => {
        const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        setGradient(gradientString);
    };

    return (
        <div>
            <h1>CSS Gradient Generator</h1>
            <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
            />
            <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
            />
            <input
                type="number"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
            />
            <button onClick={generateGradient}>Generate Gradient</button>
            <div style={{ background: gradient, height: '200px', marginTop: '20px' }}></div>
            <p>CSS: {gradient}</p>
        </div>
    );
}

export default CSSGradientGen;
