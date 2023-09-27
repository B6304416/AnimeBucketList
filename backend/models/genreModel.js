import mongoose from "mongoose";

const genreSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true,
    }
);

export const Genre = mongoose.model('Genre', genreSchema);