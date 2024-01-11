const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/"
// mongoose.connect(URI);

// const URI = "mongodb+srv://ansh_admin:ansh95763@cluster0.zkxqkso.mongodb.net/ansh_admin?retryWrites=true&w=majority"

// url send on env file for encryption
const URI = process.env.MONGODB_URI;

const connectDB = async ()=>{
    try{
        await mongoose.connect(URI);
        console.log("Database connection successfull !");
    }
    catch(error){
        console.error("Database connection failed !");
        process.exit(0);
    }
}

module.exports =connectDB;