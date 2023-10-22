import { user } from "../model/user.js";
import bcrypt from "bcrypt";
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
       
        const userData = await user.findOne({ email });
        if (userData) 
        return res.status(400).cookie( {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: false,
            message: "User already Register"
        });

        const hashedPassword = bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log("error in has", err);
            } else {
                console.log("hass ", hash);
            }
        });

        const saveUser = new user({ name, email, password: hashedPassword });
        await saveUser.save();
        res.status(201).cookie( {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            user: saveUser, 
            message: "User Register successfully"
        });
    } catch (e) {
        console.log(e);
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
        return res.status(200).cookie( {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "User login successfully"
        });
else
return res.status(400).cookie( {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
}).json({
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
        return res.status(200).cookie( {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "User login successfully"
        });
else
return res.status(400).cookie( {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
}).json({
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