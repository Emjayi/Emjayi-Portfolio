'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

const hexToRgb = (hex: string) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (num: number) => {
    const hex = num.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const getComplementaryColor = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(255 - r, 255 - g, 255 - b);
};

const getAnalogousColors = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  const rotate = (color: number) => (color + 60) % 360;

  return [rgbToHex(rotate(r), g, b), rgbToHex(rotate(r), rotate(g), b)];
};

const getTriadicColors = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  return [rgbToHex(b, r, g), rgbToHex(g, b, r)];
};

const PaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState<string>('#7C3AED');
  const [complementaryColor, setComplementaryColor] =
    useState<string>('#83c512');
  const [analogousColors, setAnalogousColors] = useState<string[]>([
    '#b83aed',
    '#b876ed',
  ]);
  const [triadicColors, setTriadicColors] = useState<string[]>([
    '#ed7c3a',
    '#3aed7c',
  ]);

  const generatePalette = () => {
    setComplementaryColor(getComplementaryColor(baseColor));
    setAnalogousColors(getAnalogousColors(baseColor));
    setTriadicColors(getTriadicColors(baseColor));
  };

  return (
    <div className="p-12 space-y-12">
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
        <p>Choose Color:</p>
        <Input
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="w-16 h-16"
        />
        <Button onClick={generatePalette}>Generate Palette</Button>
      </div>
      <div className="flex sm:flex-row flex-col gap-2 sm:gap-0">
        <div>
          <div className="flex flex-col items-center ">
            <div
              className="w-32 h-16"
              style={{ backgroundColor: complementaryColor }}
            />
            <span>{complementaryColor}</span>
          </div>
        </div>
        <div>
          <div className="flex">
            {analogousColors.map((color, index) => (
              <div key={index} className="flex flex-col items-center ">
                <div className="w-32 h-16" style={{ backgroundColor: color }} />
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex">
            {triadicColors.map((color, index) => (
              <div key={index} className="flex flex-col items-center space-x-2">
                <div className="w-32 h-16" style={{ backgroundColor: color }} />
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaletteGenerator;
