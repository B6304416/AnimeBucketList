import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

import { PORT, mongoDBURL, SECRET_KEY } from "./config.js";
import tokenVerify from "./middleware.js";

//Import controller
import bookController from "./controllers/bookController.js";
import authController from "./controllers/authController.js";
import animeController from "./controllers/animeController.js";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//CORS configuration 
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
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

//Route for auth
app.use('', authController);

//Route for CRUD books
app.use('/book', tokenVerify, bookController);

//Route for CRUD animes
app.use('/anime', animeController);

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