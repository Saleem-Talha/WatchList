import CreateMediaItem from "@/app/components/createMediaItem";
import ShowMediaItem from "../components/showMediaItem";
export default function Dashboard(){
    return(
        <>
        <div className="mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            

        </div>
        <CreateMediaItem/>
        <ShowMediaItem/>
        </>
    )
}