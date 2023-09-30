import express from "express";
import { User } from "../models/userModel.js";
import { SECRET_KEY } from "../config.js"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { tokenVerify } from "../middleware.js";

const router = express.Router();

//Route for create a new User
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        }
        const user = await User.create(newUser);
        return res.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//Route for login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        //Check user
        if (!user) {
            return res.status(401).json({ 
                message: "The email or password may been wrong!",
            });
        }
        //Check password
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                message: "The email or password may been wrong!",
            });
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        req.session.userId = user._id
        return res.status(200).json({
            token: token, 
            userId: req.session.userId,
            userRole: user.role,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

export default router;