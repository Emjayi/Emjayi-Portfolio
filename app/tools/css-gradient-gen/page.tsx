"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

const CSSGradientGen = () => {
	const [color1, setColor1] = useState<string>("#ff0000");
	const [color2, setColor2] = useState<string>("#0000ff");
	const [angle, setAngle] = useState<number>(90);
	const [gradient, setGradient] = useState<string>("");

	const generateGradient = () => {
		const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
		setGradient(gradientString);
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">CSS Gradient Generator</h1>
			<Input
				type="color"
				value={color1}
				onChange={(e) => setColor1(e.target.value)}
				className="mb-4"
			/>
			<Input
				type="color"
				value={color2}
				onChange={(e) => setColor2(e.target.value)}
				className="mb-4"
			/>
			<Input
				type="number"
				value={angle}
				onChange={(e) => setAngle(Number(e.target.value))}
				className="mb-4"
			/>
			<Button className="mb-4" onClick={generateGradient}>
				Generate Gradient
			</Button>
			<div
				style={{ background: gradient, height: "200px", marginTop: "20px" }}
			/>
			<p>CSS: {gradient}</p>
		</div>
	);
};

export default CSSGradientGen;
