import Image from "next/image";

export default function Banner(){

    const cover = ['/Images/cover.png']
    return(
        <div className="block w-screen justify-center relative">
            <img src={cover[0] }
            className="w-full"
            alt="Banner"
            />
        </div>
    )
}