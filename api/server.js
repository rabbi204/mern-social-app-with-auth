import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import studentRoute from './routes/student.js';
import userRoute from './routes/user.js';
import mongoDBConnect from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

// initialize express
const app = express();
dotenv.config();



// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// initialize enviornment variable
const PORT = process.env.SERVER_PORT || 5000;

//routes declare
app.use('/api/student', studentRoute);
app.use('/api/user', userRoute);

//express error handler
app.use( errorHandler );



//listen server
app.listen(PORT, () => {
    mongoDBConnect();
    console.log(`server running on port ${ PORT }`.bgGreen.black);  
});