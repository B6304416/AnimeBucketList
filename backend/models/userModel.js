import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            required: true,
            enum: [1, 2]
        },
        favCharacter: {
            type: mongoose.Schema.Types.ObjectId,
        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema);