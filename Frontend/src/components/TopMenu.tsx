import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import AuthButton from "./AuthButton";
import Link from "next/link";

export default async function TopMenu() {

    return (
        <div className="fixed h-20 bg-gray-50 inset-x-0 top-0 left-0 right-0 z-30 border-t border-b border-gray-300 flex flex-row items-center">
            <Link href="/">
                <Image src={'/Images/LogoFixed.png'} className="h-auto w-auto" alt='logo' width={0} height={0} sizes="100vh" />
            </Link>
            <TopMenuItem title="myBooking" pageRef="/mybooking" />
            <div className="absolute flex flex-row-reverse right-10">
                <Link href="notificationPage">
                    <Image src={'/Images/noti.jpg'} className="h-auto w-auto mr-10" alt='logo' width={0} height={0} sizes="15vh" />
                </Link>
            </div>
            <AuthButton />
        </div>
    )
}