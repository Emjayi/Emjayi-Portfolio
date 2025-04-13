"use client";
import { cn } from "@/util/cn";
import Image from "next/image";
import Link from "next/link";

export function CardDemo({ src, title, readTime, description, href }: any) {
	return (
		<Link href={href}>
			<div className=" w-full group/card">
				<div
					className={cn(
						" cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto backgroundImage flex flex-col justify-between p-4",
						" bg-cover",
					)}
					style={{ backgroundImage: `url('${src}')` }}
				>
					<div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60" />
					<div className="flex flex-row items-center space-x-4 z-10">
						<Image
							height="100"
							width="100"
							alt="Avatar"
							src="/favicon.png"
							className="h-10 w-10 rounded-full border-2 object-cover"
						/>
						<div className="flex flex-col">
							<p className="font-normal text-base text-gray-50 relative z-10">
								Emjay
							</p>
							<p className="text-sm text-gray-400">{readTime}</p>
						</div>
					</div>
					<div className="text content">
						<h2 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
							{title}
						</h2>
						<p className="font-normal text-sm text-gray-50 relative z-10 my-4">
							{description}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
