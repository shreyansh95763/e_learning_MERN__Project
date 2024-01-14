const Service = require("../model/service-model");

const services = async (req,res)=>{
    try{
        const response = await Service.find();
        if(!response){
            res.status(400).json({msg:"No Service found "});
            return;
        }
        return res.status(200).json({msg:"Service found ", data:response});
    }
    catch(error){
        console.log(`error from the server ${error}`);
    }
};

module.exports = services;