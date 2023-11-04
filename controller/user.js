import { user } from "../model/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        console.log("Body of registraion:: " + JSON.stringify(req.body))
        const { name, email, password } = req.body;
       
        const userData = await user.findOne({ email });
        if (userData) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            });
        }


        if (!password) {
          return res.status(400).json({
            success: false,
            message: "Password is missing or undefined",
          });
        } else{
            console.log("password:: " + password);
            // Use bcrypt.promises.hash() to hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            console.log("hashedPassword:: " + hashedPassword);
    
            const saveUser = new user({ name, email, password: hashedPassword });
            await saveUser.save();
            
            res.status(201).json({
                success: true,
                user: saveUser, 
                message: "User registered successfully"
            });
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const login = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
       
        const userData = await user.findOne({ email });
        if (userData) 
        return res.status(200).json({
            success: true,
            userData,
            message: "User login successfully"
        });
else
return res.status(400).json({
    success: false,
    message: "User not register Please Register first"
});


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const reset = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
       
        const userData = await user.findOne({ email });
        if (userData) 
        return res.status(200).json({
            success: true,
            message: "User login successfully"
        });
else
return res.status(400).json({
    success: false,
    message: "User not register Please Register first"
});


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};