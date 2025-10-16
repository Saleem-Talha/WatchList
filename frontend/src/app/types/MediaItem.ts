type MediaItem={
        _id: string;
        title: string;
        type: "movie" | "series" | "anime";
        notes?: string;
        imgUrl?: string;
        status: "planned" | "watching" | "watched";
        createdAt: string;
        updatedAt: string;
    };

export default MediaItem;