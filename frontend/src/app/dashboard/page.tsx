import CreateMediaItem from "../components/createMediaItem";
import ShowMediaItem from "../components/showMediaItem";
import LayoutCard from "@/app/components/Layout";

export default function Dashboard(){
    return(
        <LayoutCard title="Dashboard" subtitle="Manage your watchlist — add, update, and remove items.">
            <div className="grid gap-6 md:grid-cols-1">
                <div>
                    <CreateMediaItem/>
                </div>
                <div>
                    <ShowMediaItem/>
                </div>
            </div>
        </LayoutCard>
    )
}