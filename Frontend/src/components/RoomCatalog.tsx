import RoomCard from "./RoomCard";

export default async function RoomCatalog({roomJson}:{roomJson:Promise<RoomJson>}){
    const roomJsonReady = await roomJson
    const sortedData = roomJsonReady.data.sort((a, b) => a.roomNo.localeCompare(b.roomNo));
    return (
        <div className="m-5 flex flex-row flex-wrap justify-around content-around p-2.5 w-full">
        {
            sortedData.sort().map((RoomItem)=>(
                <div className="w-4/5 py-5 flex flex-col relative" key={RoomItem._id}> 
                  <RoomCard RoomItem={RoomItem} />
                  </div>
            ))
        }
        </div>
    )
}