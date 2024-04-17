import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";

export default async function Profile() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)

    return (
        <main className="fixed left-0 top-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-40 bg-cover bg-center bg-no-repeat">
            <div className="bg-white/30 backdrop-blur-md rounded-lg p-8 w-auto text-black">
                <div className="text-3xl font-bold text-white">Name : {profile.data.name}</div>
                <table className="table-auto border-seperate border-spacing-2">
                    <tbody className="font-normal text-2xl text-white">
                        <tr><td>Email </td><td>: {profile.data.email}</td></tr>
                        <tr><td>Tel. </td><td>: {profile.data.tel}</td></tr>
                        <tr><td>Role </td><td>: {profile.data.role}</td></tr>
                        { (profile.data.role === 'hotelAdmin') ?
                            <tr><td>Hotel </td><td>: {profile.data.hid.name}</td></tr> : null
                        }
                    </tbody>
                </table>
                {
                    (profile.data.role === 'admin') ? 
                    <div>
                        <Link href="/registerhoteladmin">
                            <button className="p-2 bg-blue-400 rounded-xl text-white mt-2">Add Hotel Admin</button>
                        </Link>
                        <Link href="/addhotel">
                            <button className="p-2 bg-blue-400 rounded-xl text-white mt-2 mx-4">Add Hotel</button>
                        </Link>
                    </div>
                    : null
                }
            </div>
        </main>
    )
}