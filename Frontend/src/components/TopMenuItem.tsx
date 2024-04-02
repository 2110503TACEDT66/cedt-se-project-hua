import Link from "next/link";

export default function TopMenuItem ( {title, pageRef}: {title: string, pageRef: string}) {
    return (
        <Link className="w-32 text-center my-auto font-serif font-10 text-gray-500" href={pageRef}>
            {title}
        </Link>
    )
}