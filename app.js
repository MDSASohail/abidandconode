const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
dotenv.config()
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.mongo_pass);
        console.log("Conneted to DB")
    } catch (error) {
        console.log("Failed to connect DB", error.message)
    }
}

connectMongoDB()





/* Certificate Start */
const certificate = require('./Routes/Certificate');
app.use('/certificate', certificate);


app.listen(8000, () => {
    console.log("Server running on port 8000")
})