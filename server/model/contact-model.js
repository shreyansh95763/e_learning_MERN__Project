const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    message:{
        type:String,
        require:true
    }
});

//create collection and model
const Contact = new model("Contacts",contactSchema);


module.exports=Contact;