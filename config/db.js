const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {})
        console.log("Mongoose Connected");

    } catch (err) {
        console.log("Error connecting DB", err);
        process.exit(1);
    }
}

module.exports = connectDB;