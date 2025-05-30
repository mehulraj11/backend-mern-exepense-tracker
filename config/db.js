const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URI, {})
        console.log("Mongoose Connected");

    } catch (err) {
        console.log("Error connecting DB", err);
        process.exit(1);
    }
}

module.exports = connectDB;