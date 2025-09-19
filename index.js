import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoute from "./routes/auth.routes.js";
import session from "express-session";


dotenv.config();
const app = express();

// db connection
dbConnect();

// middlewares 
const corsOption = {
    origin: ["http://localhost:5713"],
    credentials: true,
};
app.use(cors(corsOption));
app.use(session({
    secret: "My Session Secret",
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}))
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100md', extended: true}));

// routes setup
app.use("/api/auth", authRoute);

//  main app runner 
app.listen(3000, () => console.log("Server running on port 3000"));
