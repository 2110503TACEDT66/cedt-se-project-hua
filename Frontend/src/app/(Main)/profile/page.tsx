import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import InputCompo from "@/components/InputCompo";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation"
import addHotelDB from "@/libs/addHotelDB";

export default async function Profile() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)

    const addHotel = async (addHotelForm: FormData) => {
        "use server"
        const name = addHotelForm.get("name")
        const address = addHotelForm.get("address")
        const district = addHotelForm.get("district")
        const province = addHotelForm.get("province")
        const postalcode = addHotelForm.get("postalcode")
        const tel = addHotelForm.get("tel")
        const region = addHotelForm.get("region")
        const picture = "/Images/hotel/hotel4.jpg"

        if (name && address && district && province && postalcode && tel && region && picture) {
            const newHotel:HotelData = {
                name,address,district,province,postalcode,tel,region,picture
            }
            try {
                await addHotelDB(session.user.token, newHotel);
            } catch (err) {
                console.log(err)
            }
            revalidateTag("hotels")
            redirect("/")
        }

    }

    return (
        <main className="fixed left-0 top-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-40 bg-[url('/Images/bg.png')] bg-cover bg-center bg-no-repeat">
            <div className="bg-white/30 backdrop-blur-md rounded-lg p-8 w-[25em] text-black">
                <div className="text-3xl font-bold text-white">Name : {profile.data.name}</div>
                <table className="table-auto border-seperate border-spacing-2">
                    <tbody className="font-normal text-2xl text-white">
                        <tr><td>Email </td><td>: {profile.data.email}</td></tr>
                        <tr><td>Tel. </td><td>: {profile.data.tel}</td></tr>
                        <tr><td>Role </td><td>: {profile.data.role}</td></tr>
                    </tbody>
                </table>
            </div>
            {
                (profile.data.role === 'admin') ? 
                    <form action={addHotel} className="bg-blue-200 m-4 p-5 w-1/2">
                        <div className="text-xl text-blue-700">Add New Hotel</div>
                        <InputCompo name="name" text="Hotel Name" type="text" />
                        <InputCompo name="address" text="Hotel Address" type="text" />
                        <InputCompo name="district" text="Hotel District" type="text" />
                        <InputCompo name="province" text="Hotel Province" type="text" />
                        <InputCompo name="postalcode" text="Hotel postalcode" type="text" />
                        <InputCompo name="tel" text="Hotel Tel" type="text" />
                        <InputCompo name="region" text="Hotel Region" type="text" />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg">Add</button>
                    </form> : null
            }
        </main>
    )
}
