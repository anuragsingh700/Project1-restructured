const mongoose = require('mongoose');

// MongoDB URI is read from the environment (see .env.example)
const URI = process.env.MONGO_URI;

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected successfully");
        const fetchData = mongoose.connection.db.collection("users");
        console.log("Fetching data from 'users' collection...");
        global.userdata = await fetchData.find({}).toArray();
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = connectDB;
