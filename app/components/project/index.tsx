"use client";
import React from "react";
import styles from "./style.module.css";
import Link from "next/link";

export default function index({
	href,
	index,
	title,
	setModal,
}: { href: string; index: string; title: string; setModal: any }) {
	return (
		<Link href={href}>
			<div
				onMouseEnter={() => {
					setModal({ active: true, index });
				}}
				onMouseLeave={() => {
					setModal({ active: false, index });
				}}
				className={`${styles.project} `}
			>
				<h2 className=" text-xl md:text-4xl">{title}</h2>
			</div>
		</Link>
	);
}
