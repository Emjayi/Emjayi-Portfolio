import React from 'react'
import { Navigation } from '../components/nav'

const page = () => {
	return (
		<div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-300/50 dark:via-zinc-900 to-zinc-900/0">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto animate-fade-in-1">
				<h1 className='text-3xl sm:text-5xl'>Soon...</h1>
			</div>
		</div >
	)
}

export default page