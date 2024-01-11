const {z} = require("zod");

//create an object schema
const signUpSchema = z.object({
    username: z
        .string({ required_error: "Name is required"})
        .trim()
        .min(3,{message:"Name must be at least of 3 characters"})
        .max(255,{message:"Name must be at most 255 characters "}),
    email: z
        .string({ required_error: "Email is required"})
        .trim()
        .email({message:"Invalid email address "})
        .min(3,{message:"Email must be at least of 3 characters"})
        .max(255,{message:"Email must be at most 255 characters "}),
    phone: z
        .string({ required_error: "Phone is required"})
        .trim()
        .min(10,{message:"Phone must be at least of 10 characters"})
        .max(20,{message:"Phone must be at most 20 characters "}),
    password: z
        .string({ required_error: "Password is required"})
        .trim()
        .min(7,{message:"Password must be at least of 3 characters"})
        .max(255,{message:"Password must be at most 255 characters "}),
});

module.exports = signUpSchema;