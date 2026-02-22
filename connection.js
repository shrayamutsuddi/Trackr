const mongoose = require("mongoose");
const connectToDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb Atlas")
    }
    catch(error){
        console.log("Error connecting to MongoDb Atlas: ", error);
        process.exit(1);
    }
}

module.exports = connectToDb;