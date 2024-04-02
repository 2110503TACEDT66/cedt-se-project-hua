import Image from "next/image";

export default function Banner(){

    const cover = ['/Images/cover.jpg']
    return(
        <div className="block p-5 m-0 w-screen h-4/5 flex justify-center mt-20  ">
            <Image src={cover[0]}
        alt="Banner"
        width="1000"
        height="10"          
            />
        </div>
    )
}