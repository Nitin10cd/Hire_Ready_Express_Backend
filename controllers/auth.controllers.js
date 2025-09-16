import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";

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

export async function _Login(request , response) {

};
 

export async function _Update_Profile(request , response) {
    
};

export async function _Otp_Verification_Starter_Email_Verification(request , response) {

};

export async function _Otp_Verification_Password(request , response) {
    
};

export async function _Security_Questions_Password_Reset (request , response) {

};

export async function _Security_Question_Set (request , response) {

};

export async function _Security_Question_Reset (request , response) {

};

export async function _Delete_Account (request , response) {
    
}