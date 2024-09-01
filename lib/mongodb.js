const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI

async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // You can add other options here if needed
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process if connection fails
    }
}

module.exports = connectToDatabase;
