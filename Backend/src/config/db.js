const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const connectToDB = ()=>{
     const connection = mongoose.connect(`${MONGO_URI}/lead_managment_system`)
     return connection
}


module.exports = connectToDB