const  {Schema,model} = require("mongoose");

const serviceSchema = new Schema({
    service:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:String, require:true},
});
const Service = new model("Service",serviceSchema);

module.exports = Service;