import "./input.css";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function App({ Component, pageProps, router }) {
	return (
		<div className="">
			<AnimatePresence mode="wait">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 2 }}
				>
					<Component key={router.route} {...pageProps} />
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
