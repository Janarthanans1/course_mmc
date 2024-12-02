import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    department:{type:String},
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    video:{type:String},
})

const Video = mongoose.models.Video || mongoose.model("Video",videoSchema)

export default Video