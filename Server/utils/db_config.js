import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected ${connect.connection.host}`);
    } catch (error) {
        console.log("Error connecting database");
    }
}

export default connectDB;