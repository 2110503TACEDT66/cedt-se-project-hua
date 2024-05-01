import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ButtonForPath from "@/components/ButtonForPath";
import RoomCatalog from "@/components/RoomCatalog";
import getHotel from "@/libs/getHotel";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";

export default async function HotelDetailPage({params}:{params:{hid:string}}){
    const session = await getServerSession(authOptions)
    let profile;
    if (session) {
        profile = await getUserProfile(session.user.token)
    }
    const hotelDetail = await getHotel(params.hid)
    const roomDetail = hotelDetail.data.rooms

    return(
        <main className="bg-cover bg-center bg-no-repeat">
            <div className="text-white flex justify-center align-middle w-[100vw] p-3 h-96 ">
                <div className="flex flex-row gap-4 shadow-lg shadow-purple-300 p-5 rounded-xl">
                    <img src={hotelDetail.data.picture}
                    alt="Hotel picture"
                    className="rounded-lg object-cover" 
                    />
                    <div className="flex flex-col justify-center text-bold text-black text-2xl ">
                        <p className="">{hotelDetail.data.name} </p>
                        <p className=""> Address : {hotelDetail.data.address}</p>
                        <p className=""> Tel : {hotelDetail.data.tel}</p>
                    </div>
                    {profile.data.role === 'hotelAdmin' && profile.data.hid._id === params.hid &&
                    <div className="flex justify-end items-end">
                        <ButtonForPath text="Add Room" path={`/hotel/${params.hid}/addroom`} />
                    </div> }
                </div>
            </div>
            <div className="flex flex-row">
                <RoomCatalog roomItem={roomDetail} hid={params.hid} profile={profile.data}/>
            </div>
        </main>
    )
}