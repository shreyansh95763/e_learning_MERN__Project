const jwt =require("jsonwebtoken");
const User = require("../model/user-model");

const authMiddleware=(req,res,next)=>{
    const token = req.header("Authorization");

    if(!token){
        return res.status(402)
        .json({msg:"Your request is not authorised"});
    }
    const jwtToken = token.replace("Bearer","").trim();
    console.log(jwtToken);
    try{
        const isVarified = jwt.verify(jwtToken,process.env.JWT_SECRETE_KEY);

        const userData = User.findOne({email:isVarified.email});

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
    }
    catch(error){
        return res.status(401).json(`Unauthorized to access the user getting ${error}`);
    }

};

module.exports = authMiddleware;