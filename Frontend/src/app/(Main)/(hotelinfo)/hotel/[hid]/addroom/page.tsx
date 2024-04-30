'use client'
import addRoom from "@/libs/addRoom";
import getRoomForHotel from "@/libs/getRoom";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputCompo from "@/components/InputCompo";
import FormCompo from "@/components/FormCompo";
import { toast } from "react-toastify";

type ErrorType = {
    roomNo?: string;
    roomType?: string;
    price?: string;
}

export default function AddRoomPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { hid } = useParams();
    const hidString = hid.toString();
    const [takenRoomNumbers, setTakenRoomNumbers] = useState<string[]>([]);

    useEffect(() => {
        getRoomForHotel(hidString).then((response) => {
            const rooms = response.data.map((room: { roomNo: string; }) => room.roomNo);
            setTakenRoomNumbers(rooms);
        });
    }, []);

    const InitForm = {
        roomNo: '',
        roomType: '',
        price: '',
    }

    const [form, setForm] = useState(InitForm);
    const [errors, setErrors] = useState<ErrorType>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({
            ...form,
            roomType: e.target.value,
        });
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const validationErrors: ErrorType = {};
        if (!form.roomNo.trim()) {
            validationErrors.roomNo = "Room Number is required";
        } else if (isNaN(Number(form.roomNo)) || form.roomNo.trim().length !== 3) {
            validationErrors.roomNo = "Room Number must be a 3-digit number";
        } else if (takenRoomNumbers.includes(form.roomNo)) {
            validationErrors.roomNo = "Room Number is already taken";
        }

        if (!form.roomType.trim()) {
            validationErrors.roomType = "Room Type is required";
        }

        if (!form.price.trim()) {
            validationErrors.price = "Price is required";
        } else if (isNaN(Number(form.price))) {
            validationErrors.price = "Price must be a number";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            let roomPic;
            if (form.roomType === 'Standard') {
                roomPic = '/Images/room/room-stand.jpg';
            } else {
                roomPic = '/Images/room/room-lux.jpg';
            }

            // Create the payload
            const payload = {
                roomNo: form.roomNo,
                roomType: form.roomType,
                price: form.price,
                picture: roomPic
            };

            if (session) {
                const token = session.user.token;
            
                // Call the addRoom function
                addRoom({payload, hid: hidString, token})
                .then(() => {
                    toast.success('Add Room Success');
                    setTimeout(() => {
                        router.push(`/hotel/${hidString}`);
                        router.refresh();
                    }, 1000)
                })
                .catch((err) => {
                    toast.error('Add Room Failed');
                    console.log(err);
            })
            }
        }
    }
    
    return (
        <FormCompo header="Add Room" typeSubmit="ADD ROOM" handleSubmit={handleSubmit}>
            <InputCompo name="roomNo" text="Room Number" type="text" handleChange={handleChange} error={errors.roomNo}/>
            <div className="flex justify-center items-center my-7 flex-col">
                <select onChange={handleSelectChange}
                    className='bg-gray-50 border-2 border-gray-700 text-gray-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option hidden>Select Room Type</option>
                    <option key="Standard" value="Standard">Standard Room</option>
                    <option key="Luxury" value="Luxury">Luxury Room</option>
                </select>
                {errors.roomType && <span className="text-red-500 text-sm">{errors.roomType}</span>}
            </div>
            <InputCompo name="price" text="Price" type="text" handleChange={handleChange} error={errors.price}/>
        </FormCompo>
    )
}