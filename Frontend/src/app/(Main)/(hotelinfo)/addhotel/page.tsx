import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AddHotel from "@/components/AddHotel";
import { getServerSession } from "next-auth";

export default async function AddHotelPage() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    return (
        <AddHotel />
    )
}