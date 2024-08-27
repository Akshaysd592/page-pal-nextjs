import mongoose from "mongoose";

type ConnectionType={
    isConnected?:number;
}

const connection: ConnectionType = {};

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database")
        return;
    }


    try {
        const db = await mongoose.connect(process.env.MONGODB_URI||"");

        // console.log(db);
        connection.isConnected = db.connections[0].readyState
        console.log("DB connected Successfully")

    } catch (error) {
        console.log("Database connection failed due to :",error);
        process.exit(1);

    }
}

export default dbConnect;