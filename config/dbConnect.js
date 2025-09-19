import { connect } from "mongoose";

const dbConnect = async () => {
    try {
        const mongoDBConnection = await connect(process.env.MONGO_DB_URI);
        console.log("Database connected: ", mongoDBConnection.connection.host)
    } catch (error) {
        console.log(error);
        console.log("DataBase connection failed")
    }
}

export default dbConnect;
