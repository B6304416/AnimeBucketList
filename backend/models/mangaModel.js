import mongoose from "mongoose";

const mangaSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        genre: {
            type: String,
        },
        imgUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const authorSchema = mongoose.Schema(
    {
        eng_name: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true,
    }
);

export const Manga = mongoose.model('Manga', mangaSchema)
export const Author = mongoose.model('Author', authorSchema);