import mongoose from "mongoose";

const MediaItemsSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true, index:true},
    title:{type:String, required:true},
    type:{type:String, enum:["movie","series","anime"], required:true},
    notes:{type:String},
    imgUrl:{type:String, trim:true},
    status:{type:String, enum:["planned","watching","watched"], default:"planned"},
},{timestamps:true});

export default mongoose.model("MediaItem", MediaItemsSchema);