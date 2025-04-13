"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

const LoremIpsumGenerator = () => {
	const [paragraphs, setParagraphs] = useState<number>(1);
	const [loremIpsum, setLoremIpsum] = useState<string>("");

	const generateLoremIpsum = () => {
		const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
		setLoremIpsum(Array(paragraphs).fill(loremText).join("\n\n"));
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Lorem Ipsum Generator</h1>
			<Input
				type="number"
				className="mb-4"
				value={paragraphs}
				onChange={(e) => setParagraphs(Number(e.target.value))}
			/>
			<Button onClick={generateLoremIpsum} className="mb-4">
				Generate
			</Button>
			<Textarea rows={10} value={loremIpsum} readOnly className="w-full p-2" />
		</div>
	);
};

export default LoremIpsumGenerator;
