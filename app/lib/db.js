import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")        
    } catch (err) {
        console.log(`Faild to Database: ${err}`);
        
    }
}

export default connectDb;