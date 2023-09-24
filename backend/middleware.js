import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config.js";

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

export default tokenVerify;
