import mongoose from "mongoose";

const characterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        score: {
            type: Number,
            required: true,
        },
        animeId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        mangaId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        imgUrl: {
            type: String,
        },
        detail:{
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

export const Character = mongoose.model('Character', characterSchema);