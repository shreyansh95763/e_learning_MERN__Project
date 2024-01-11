const errorMiddleware = (err,req,res,next) =>{
    const status = err.status || 500;
    const message = err.message || "Backend from error";
    const extraDetaile = err.extraDetaile || "BACKEND ERROR";

    return res.status(status).json({message,extraDetaile});
}

module.exports = errorMiddleware;
