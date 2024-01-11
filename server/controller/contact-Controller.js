
const Contact = require("../model/contact-model");

const contactForm = async (req,res)=> {
    try{
        const response = req.body;
        // console.log("Response data : ",response);
        const contactData = await Contact.create(response);
        return res.status(200).json({message:"Successful message send of contact "});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"contact are not delivered !"});
        // next(err);
    }
};

module.exports = contactForm;