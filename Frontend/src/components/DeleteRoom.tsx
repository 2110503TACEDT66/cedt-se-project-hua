"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";


export default function RemoveBtn({ id }:{ id :string}) {
  const router = useRouter();
  const removeRoom = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      /*รอใส่ link สำหรับ fetch delete มาใส่*/ 
      const res = await fetch(``, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeRoom} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}