require('dotenv').config()
const mongoose = require('mongoose')

const connection = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
       console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}

connection();