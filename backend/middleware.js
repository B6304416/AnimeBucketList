import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config.js";
import { User } from "./models/userModel.js";

const tokenVerify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is invalid or expired' });
        }
        req.user = decoded;
        next();
    });
}

const adminVerify = async (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(req)
    try {
        // console.log(req.user.userId)
        const user = await User.findOne({ _id: req.user.userId })
        // console.log(user)
        if (!token || !user.role) {
            throw new Error('Unauthorized');
        }
        const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject('Token is invalid or expired');
                }
                resolve(decoded);
            });
        });
        let decoded; // Define decoded outside of the if condition
        if (user.role == 1) {
            console.log(user.role)
            decoded = decodedToken; // Assign decodedToken to decoded
        }
        else if (user.role == 2) {
            console.log(user.role + ' You are not admin')
            reject('UserRole is invalid');
        } else {
            reject('UserRole is invalid');
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: error.toString() });
    }
}


const authMiddleware = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            tokenVerify(req, res, (error) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });

        await new Promise((resolve, reject) => {
            adminVerify(req, res, (adminError) => {
                if (adminError) {
                    reject(adminError);
                }
                resolve();
            });
        });

        next(); // If both tokenVerify and adminVerify pass, proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: error.toString() });
    }
};

export { tokenVerify, adminVerify, authMiddleware };
