import mongoose from "mongoose";

const mangaSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        authorId: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Manga = mongoose.model('Manga', mangaSchema);