"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function PageWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
			{/* <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {children}
                    </motion.div>
                )}
                {/* </motion.div> */}
			{/* </AnimatePresence> */} */
		</>
	);
}

export default PageWrapper;
