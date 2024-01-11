const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
});

//? Secure the password with bcrypt second way
userSchema.pre('save',async function(next){   // save means before save the value function run and 
    console.log("Pre Methods : ",this);  
    const user = this;  // In this all the values comes the getting by user

    if(!user.isModified("password")){ // that means already created the password then
        next();                        // next function call like code go forword
    }

    try{                               //otherwise run code this
        const saltRound = await bcrypt.genSalt(10); // make the salt for difficulty level of code
        const hash_password = await bcrypt.hash(user.password,saltRound); 
        user.password = hash_password;
    }
    catch(error){
        next(error);
    }
})


// second way of COMPARE PASSWORD to secured password from bscrypt 
// userSchema.methods.comparePassword = async function(password){
//     try{
//         const isCompared = await bcrypt.compare(password,this.password, function(err, res) {
//             if(password != this.password){
//               return res.json({success: false, message: 'passwords do not match'});
//             } else {
//               // Send JWT
//               return res.json({success: true,message:"passwords matched !"})
//             }
//           });
//         // console.log("is Compared to passward:",isCompared);
//         return isCompared;
//     }
//     catch(error){
//         console("error to camapre the password : ",error);
//     }
// }

// JWT (Json Web Tocken
 /***  By userSchema.methods we can create lots of methods/function and use in controllers */
userSchema.methods.generateTacken = async function(){  //genrateToccken is instance method you can create like different methods
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
        },
        process.env.JWT_SECRETE_KEY,
        {
            expiresIn: "38d"
        }
        )
    }
    catch(error){
        console.error(error);
    }
}


// define the model or collection name
//Syntax =>  const MODEL_NAME = new mongoose.model("COLLECTION_NAME",COLLECTOIN_STRUCTURE/SCHEMA);
const User = new mongoose.model("Users",userSchema);

module.exports = User;