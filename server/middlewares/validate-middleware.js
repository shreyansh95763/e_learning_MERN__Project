// const { Schema } = require("zod");

const validate = (schema) =>async(req,res,next)=>{
    try{
        const parsebody = await schema.parseAsync(req.body);
        req.body = parsebody;
        next();
    }
    catch(err){
        // console.log(err);
        // const messages = err.errors[0].message;
        // console.log(messages);
        // next(messages);

        const status = 500;
        const message = "Fill the input properly !!";
        const extraDetaile = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetaile,
        }
        next(error);

        // res.status(400).json({message:messages});
    }
};

module.exports = validate;
