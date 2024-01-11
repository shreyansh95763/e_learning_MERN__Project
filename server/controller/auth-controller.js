const { raw } = require("express");
const User = require("../model/user-model");
const bcrypt = require("bcrypt")


// *_______________
//  Home Page
//*________________
const home = async (req,res)=>{
    try{
        res
            .status(200)
            .send(`This is the Home Page with Router And controller again !!`);
    }
    catch(error){
        console.log("Getting to on home pages",error);
    }
}

// *_______________
//   LOGIN LOGIC
//*________________
    const login = async (req,res) =>{
        try{
            const{email, password} = req.body;
           
            const userExist = await User.findOne({ email:email });
            console.log("user exist" , userExist); // in the userExist all data will get

            if(!userExist){
                return res.status(400).json({msg:"Invalid User ! "});
            }
            
            console.log("client password :",password);
            console.log("server password :",userExist.password);
            const user = await bcrypt.compare(password, userExist.password);
            // const user = await userExist.comparePassword(password);

            if(user){
                res.status(201)
                .json({
                    msg: "Login Successfully ",
                    token:await userExist.generateTacken(),
                    userId: userExist._id.toString()
                })
                console.log("login user",user);
            }
            else{
                res.status(405).json({msg:"Invalid email or password"});
            }
        }
        catch(error){
            res.status(500).json("Internal Server failed ");
            // next(error);
        }
    }

// *_______________
//   Registration
//*________________

const register = async (req,res)=>{
    try{
        console.log(User);
        // console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist =await User.findOne({email:email});

        if(userExist){
            return res.status(400).json({msg : "Your data is already exist in database. "});
        }
        
                /********* Way of password encryption by bcrypt **************/
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password,saltRound);
        // const data = await User.create({ username, email, phone, password:hash_password});

        const data = await User.create({ username, email, phone, password});

        res.status(201)
        .json({msg:"Successfully Registered !! " , 
        token:await data.generateTacken(), 
        userId:data._id.toString(),});   // jwt mostly represent in strings
        console.log(data);
            // .send(`This is the Registration Page with Router and controller !!`);
    }
    catch(error){
        console.log("Getting to on home pages",error);
    }
}

module.exports = {home,register,login};