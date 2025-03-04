import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to the database ${conn.connection.host}`);
    }
    catch(error){
        console.log('Error connecting to the database');
        console.error(error);
        // process.exit(1);
    }
};