import express from "express";
import { _Register, registerValidationRules } from "../controllers/auth.controllers.js";

const authRoute = express.Router();
// routes

authRoute.post("/register", registerValidationRules , _Register);

authRoute.post("/login", function (req,res) {

});

authRoute.post("/otp-verification-email", function (req,res) {
    
});

authRoute.post("/otp-verification-no", function (req,res) {
    
});

authRoute.post("/google-login", function (req,res) {
    
});

authRoute.post('/logout', function (req,res) {

});

authRoute.post("/2Fa/setup", function (req,res) {
    
})
authRoute.post("/2Fa/verify", function (req,res) {
    
})
authRoute.post("/2Fa/reset", function (req,res) {
    
});

// password - reset features
authRoute.post('/password-reset-security-questions', function (req,res) {

});

authRoute.post('/password-reset-email', function (request , response) {

});

authRoute.post('/password-reset-phone', function (req , res){})

export default authRoute;