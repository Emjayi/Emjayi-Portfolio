
const exp = [
    {
        title: "Fidar",
        startDate: "February 2022",
        endDate: "July 2022",
        jobTitle: "WordPress Developer"
    },
    {
        title: "KherseBozorg",
        startDate: "July 2022",
        endDate: "April 2023",
        jobTitle: "Junior Front-End Developer"
    },
    {
        title: "Khatoon advertising agency",
        startDate: "April 2023",
        endDate: "May 2024",
        jobTitle: "Senior Front-End Developer"
    },
]
const std = [
    {
        title: "FrontEnd-Developer",
        issued: "Coursera - Meta",
        year: "2021"
    },
    {
        title: "Complete Intro to CS",
        issued: "Udemy - Frontend Masters",
        year: "2021"
    },
    {
        title: "Complete Path To Javascript Mastery",
        issued: "Udemy - JavaScript Mastery",
        year: "2021"
    },
    {
        title: "UX Designer",
        issued: "Coursera - Google",
        year: "2022"
    },
    {
        title: "React Course",
        issued: "Scrimba",
        year: "2023"
    },
]
export default function Index() {
    return (
        <div id="experiences" className="flex flex-col justify-center items-center w-full pt-24">
            <h1 className="text-xl mb-5 self-start mt-12 px-[10%]">Experience</h1>
            {exp.map((e, index) => (
                <div
                    key={index}
                    className="flex gap-2 border-t-2 mb-4 pt-2 w-full px-[10%]">
                    <p className="text-2xl">{e.title} / </p>
                    <div className="flex gap-2">
                        <p className="text-2xl">{e.startDate}</p>
                        <p className="text-2xl"> - </p>
                        <p className="text-2xl">{e.endDate} / </p>
                    </div>
                    <p className="text-2xl">{e.jobTitle}</p>
                </div>
            ))
            }
            <h1 className="text-xl mb-5 self-start mt-12 px-[10%]">Studies</h1>
            {std.map((e, index) => (
                <div
                    key={100 + index}
                    className="flex gap-2 border-t-2 mb-4 pt-2 w-full px-[10%]">
                    <p className="text-2xl">{e.title} / </p>
                    <p className="text-2xl">{e.issued} / </p>
                    <p className="text-2xl">{e.year}</p>
                </div>
            ))
            }
        </div>
    );
}