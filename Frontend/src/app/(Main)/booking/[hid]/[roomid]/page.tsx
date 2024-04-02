import CheckIncheckoutDate from "@/components/CheckIncheckOutdate";

export default async function BookingPage({params} : {params: {hid:string,roomid:string}}) {

    return (
        <main className="left-0 top-0 w-full h-full flex items-center justify-center bg-[url('/Images/bg.png')]  bg-cover bg-center bg-no-repeat h-screen">
            <CheckIncheckoutDate hid={params.hid} roomid={params.roomid} />
        </main>
    )
}