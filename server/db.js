import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
       await  mongoose.connect('// mongosh "mongodb+srv://cluster-1.ivdkyjp.mongodb.net/" --apiVersion 1 --username rolandmario2_db_user --password eVwzrtbJIc73x14Q', { useNewUrlParser: true, useUnifiedTopology: true });
       console.log("Database connected successfully");
} 
    catch (error) {
        console.log(error)
    }
}