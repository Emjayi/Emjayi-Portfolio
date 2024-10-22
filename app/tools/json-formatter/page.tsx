'use client';

import { useState } from 'react';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';

const JSONFormatter = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const formatJSON = () => {
    try {
      const formattedJSON = JSON.stringify(JSON.parse(input), null, 2);
      setOutput(formattedJSON);
    } catch {
      setOutput('Invalid JSON');
    }
  };

  return (
    <div className="p-6 w-full">
      <Textarea
        placeholder="Enter JSON"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-40 mb-4"
      />
      <Button onClick={formatJSON} className="mb-4">
        Format JSON
      </Button>
      <pre className="border p-4 rounded">{output}</pre>
    </div>
  );
};

export default JSONFormatter;
