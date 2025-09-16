import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import jwtToken from "../config/json_web_token.js";
import jwt from "jsonwebtoken";

// Validation middleware for the register 
export const registerValidationRules = [
    body("email").isEmail().withMessage("Valid email is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("phone").isMobilePhone().withMessage("Valid phone is required"),
    body("dob").isDate().withMessage("Valid date of birth is required"),
    body("gender").isIn(["male", "female", "other"]).withMessage("Invalid gender"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];

// CONTROLLER FOR THE REGISTER A user
export async function _Register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { email, name, username, phone, dob, gender, password } = req.body;

    try {
        // Check is User is already Exists or not
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email or Username already exists",
            });
        }

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            email,
            name,
            username,
            phone,
            dob,
            gender,
            passwordHash: hashedPassword,
            is_verified: false,
            subscription: { type: "free", exists: false },
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: newUser._id,
        });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

// login way one with credentials
export async function _Login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required",
        });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        if (!user.is_verified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // json web token based => access token , refresh token
        const { accessToken, refreshToken } = jwtToken(user._id);

        // Securely adding in the cookies access_token , refresh_token, user info
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 15 * 60 * 1000,
            path: "/",
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        res.cookie("user_info", JSON.stringify({ id: user._id, username: user.username, email: user.email }), {
            httpOnly: false,
            secure: true,
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Refresh a Access token after the expiry
export async function _Refresh_Access_Token(request, response) {
    // temp added here 
    const ACCESS_TOKEN_SECRET = "access-token-secret-key";
    const REFRESH_TOKEN_SECRET = "refresh-token-secret-key";

    try {
        const refresh_token = request.cookies.refresh_token;
        if (!refresh_token) return res.status(401).json({ success: false, message: "Refresh Token is Missing" });

        // verify the refresh token
        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Invalid Refresh Token" });
            }

            const userId = decoded.userId;

            // generating the new_access_token
            const newAccessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

            // set new access token in cookie
            res.cookie("access_token", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 15 * 60 * 1000, 
                path: "/",
            });
        })
    } catch (error) {

    }
}

// Login using the QR  => 2FA Start
export async function _Login_Using_The_QR(request, response) {

};



export async function _Update_Profile(request, response) {

};

export async function _Otp_Verification_Starter_Email_Verification(request, response) {

};

export async function _Otp_Verification_Password(request, response) {

};

export async function _Security_Questions_Password_Reset(request, response) {

};

export async function _Security_Question_Set(request, response) {

};

export async function _Security_Question_Reset(request, response) {

};

export async function _Delete_Account(request, response) {

}