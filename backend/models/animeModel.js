import mongoose from "mongoose";

const animeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        typeId: {
            type: String,
            required: true,
        },
        studioId: {
            type: String,
            required: true,
        },
        sourceId: {
            type: String,
            required: true,
        },
        episode: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Anime = mongoose.model('Anime', animeSchema);