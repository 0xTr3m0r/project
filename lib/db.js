import mongoose from "mongoose";


export const ConnectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected : ',conn.connection.host);
    } catch (error) {
        console.log(`Connection failed : ${error}`);
    }
}

