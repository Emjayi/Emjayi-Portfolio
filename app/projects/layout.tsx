"use client";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<Button
				onClick={() => window.history.back()}
				className="fixed z-50 left-4 top-4"
				variant="outline"
			>
				Back
			</Button>
			{children}
		</section>
	);
}
