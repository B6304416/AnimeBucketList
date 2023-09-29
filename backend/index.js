import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

import { tokenVerify } from "./middleware.js";
import { setupDatabase } from "./setupDatabase.js"
import dotenv from 'dotenv';

//Import controller
import bookController from "./controllers/bookController.js";
import authController from "./controllers/authController.js";
import animeController from "./controllers/animeController.js";
import animeReviewController from "./controllers/animeReviewController.js";
import characterController from "./controllers/characterController.js";

const app = express();

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT;
const mongoDBURL = process.env.mongoDBURL;

//Middleware for parsing request body
app.use(express.json());

//CORS configuration 
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'UserRole'],
        credentials: true,
    })
)

app.use(
    session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: true
    })
);

//setup database ฟังชั่นนี้ให้ใช้ครั้งตอนที่สร้างเดต้าเบสใหม่
// setupDatabase()
//     .then(() => {
//         console.log("Database setup completed.");
//     })
//     .catch((error) => {
//         console.error("Error seeding data:", error);
//     });

//Route for auth
app.use('', authController);

//Route for CRUD books
app.use('/book', tokenVerify, bookController);

//Route for CRUD animes
app.use('/anime', animeController);
//Route for CRUD animes
app.use('/anime_review', tokenVerify, animeReviewController);
//Route for CRUD animes
app.use('/character', characterController);

//Connect database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    })