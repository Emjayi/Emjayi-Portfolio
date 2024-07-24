export default function Index({
    title,
    startDate,
    endDate,
    jobTitle }:
    {
        title: string,
        startDate: string,
        endDate: string,
        jobTitle: string
    }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <p className="text-2xl">{startDate}</p>
                <p className="text-2xl"> - </p>
                <p className="text-2xl">{endDate}</p>
            </div>
            <p className="text-2xl">{title}</p>
            <div className="flex gap-2">
                <p className="text-2xl">{startDate}</p>
                <p className="text-2xl"> - </p>
                <p className="text-2xl">{endDate}</p>
            </div>
            <p className="text-2xl">{jobTitle}</p>
        </div>
    );
}