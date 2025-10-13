import MediaItemsSchema from "../models/MediaItemsSchema.js";

export async function createMediaItem(req, res){
    const data = req.validated.body;
    try{
        const newItem = await MediaItemsSchema.create({...date, userId: req.user.id});
        return res.status(201).json({message:"Media item created", item:newItem});
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}

export async function getMediaItems(req, res){
    try{
        const items = await MediaItemsSchema.find({userId:req.user.id});
        return res.status(200).json(items);
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}

export async function getItemById(req, res){
    const {id} = req.validated.params;
    try{
        const items = await MediaItemsSchema.findOne({_id:id, userId:req.user.id});
        if (!item) return res.status(404).json({ error: "not found" });
        return res.json(item);
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}

export async function deleteItem(req, res){
    const {id} = req.validated.params;
    try{
    const item = await MediaItemsSchema.findOneAndDelete({_id:id, userId:req.user.id});
    if (!item) return res.status(404).json({ error: "not found" });
    return res.json({ message: "Item deleted" });
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}


export async function updateItem(req, res){
    const {id} = req.validated.params;
    const data = req.validated.body;
    try{
        const item = await MediaItemsSchema.findOneAndUpdate({_id:id, userId:req.user.id}, data, {new:true});
        if (!item) return res.status(404).json({ error: "not found" });
        return res.json({ message: "Item updated", item });
    }catch(err){
        return res.status(500).json({message:"Server error", error:err.message});
    }
}