import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`);
        console.log(`MONGODB CONNECTED!! DB HOST : ${connectionInstance.connection.host} `);
    } catch (error) {
        console.error(`MONGODB connection ERROR: ${error}`);
    }
}

export default connectDB