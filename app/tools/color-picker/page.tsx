'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';

const ColorPicker = () => {
  const [color, setColor] = useState<string>('#c41717');

  return (
    <div className="p-6 flex flex-col gap-3 w-full items-center justify-center">
      <div className="flex gap-2 justify-center items-center">
        <p>Choose Color:</p>
        <Input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mb-4 p-1 h-16 w-16"
        />
      </div>

      <p className="text-center">
        Selected Color: <span style={{ color }}>{color}</span>
      </p>
    </div>
  );
};

export default ColorPicker;
