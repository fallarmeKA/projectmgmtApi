const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Error: ${error}`);
    }
};

module.exports = connectDB; // Use module.exports for CommonJS syntax
