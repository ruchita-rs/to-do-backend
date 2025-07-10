const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db_url = process.env.DB_URL;

async function connectDatabase() {
    try {
        await mongoose.connect(db_url);
        console.log('Database connected successfully');
    } catch (error) {
        console.error(error.message);
    }
}

async function disconnectDatabase() {
    try {
        await mongoose.disconnect();
        console.log('Database disconnected successfully');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { connectDatabase, disconnectDatabase };