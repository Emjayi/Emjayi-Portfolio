"use client";
import Link from "next/link";
import { HoverBorderGradient } from "@/app/components/ui/Hover-Border-Gradient";
import { tools } from "@/content/data";

export default function Page() {
	return (
		<div className="flex flex-wrap justify-center w-full px-[10%] pb-[10%] gap-5">
			{tools.map((t, index) => (
				<Link key={index} href={`/${t.href}`}>
					<HoverBorderGradient className=" py-4 px-8 inline">
						<p className="">{t.name}</p>
					</HoverBorderGradient>
				</Link>
			))}
		</div>
	);
}
