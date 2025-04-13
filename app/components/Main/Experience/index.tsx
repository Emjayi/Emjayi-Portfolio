import MyCard from "../../MyCard";

const exp = [
	{
		title: "Fidar",
		startDate: "Feb 2022",
		endDate: "Jul 2022",
		jobTitle: "WordPress Developer",
	},
	{
		title: "KherseBozorg",
		startDate: "Jul 2022",
		endDate: "Apr 2023",
		jobTitle: "Junior Front-End Developer",
	},
	{
		title: "Khatoon advertising agency",
		startDate: "Apr 2023",
		endDate: "May 2024",
		jobTitle: "Senior Front-End Developer",
	},
];
const std = [
	{
		title: "English TEFL (Bachelor degree)",
		issued: "Beheshti University",
		year: "2017-2021",
	},
	{
		title: "Frontend Developer Certificate",
		issued: "Coursera - Meta",
		year: "2021",
	},
	{
		title: "Complete Intro to CS",
		issued: "Udemy - Frontend Masters",
		year: "2021",
	},
	{
		title: "Complete Path To JS Mastery Certificate",
		issued: "Udemy - JS Mastery",
		year: "2022",
	},
	{
		title: "UX Designer Certificate",
		issued: "Coursera - Google",
		year: "2022",
	},
	{
		title: "React Course",
		issued: "Scrimba",
		year: "2022",
	},
	{
		title: "Next.js Course",
		issued: "Youtube - JS Mastery",
		year: "2022",
	},
	{
		title: "The Ultimate Three.js Certificate",
		issued: "Three.js Journey",
		year: "2023",
	},
];
export default function Index() {
	return (
		<div
			id="experiences"
			className="flex flex-col justify-center items-center w-full pt-24"
		>
			<h2 className="text-xl mb-5 self-start mt-12 px-[10%]">Experiences</h2>
			{exp.reverse().map((e, index) => (
				<div
					key={index}
					className="grid grid-cols-5 gap-2 border-t-2 mb-4 pt-2 w-full px-[10%]"
				>
					<p className="text-sm lg:text-2xl col-span-2">{e.title}</p>
					<p className="text-sm lg:text-2xl col-span-2">{e.jobTitle}</p>
					<div className="justify-self-end text-sm lg:text-2xl flex flex-wrap justify-end gap-2 text-right">
						<p className="text-sm lg:text-2xl">{e.startDate}</p>
						<p className="text-sm lg:text-2xl">{e.endDate}</p>
					</div>
				</div>
			))}
			<h2 className="text-xl mb-5 self-start mt-12 px-[10%]">
				Certificates and Courses
			</h2>
			{std.reverse().map((e, index) => (
				<div
					key={100 + index}
					className="grid grid-cols-5 gap-2 border-t-2 mb-4 pt-2 w-full px-[10%]"
				>
					<p className="text-sm lg:text-2xl col-span-2">{e.title}</p>
					<p className="text-sm lg:text-2xl col-span-2">{e.issued}</p>
					<p className="text-sm lg:text-2xl justify-self-end flex justify-end">
						{e.year}
					</p>
				</div>
			))}
		</div>
	);
}
