import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {

}
getData()

export default async function Page() {
    const query = `
    *[_type == 'post']
    `
    const data = await client.fetch(query)

    return (
        <div>
            {data.map((p: any, idx: number) => (
                <Link key={idx} href={`/tools/blog-test/${p.slug.current}`}>
                    <div className="p-2 bg-zinc-700 m-2 rounded-md hover:bg-zinc-900 duration-200">
                        {/* <Image src={p}></Image> */}
                        <h1 className="text-2xl">{p.title}</h1>
                        <p>{p.shortDescription}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}