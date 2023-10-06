import mongoose from "mongoose";

const animeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        typeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        studioId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        sourceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        episode: {
            type: Number,
            required: true,
        },
        genre: {
            type: Array,
        },
        imgUrl: {
            type: String,
        },
        synopsis: {
            type: String,
        },
        trailerUrl: {
            type: String,
        },
        imgCover: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const animeStudioSchema = mongoose.Schema(
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

const animeTypeSchema  = mongoose.Schema(
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

const animeSourceSchema = mongoose.Schema(
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

export const Anime = mongoose.model('Anime', animeSchema);
export const AnimeStudio = mongoose.model('AnimeStudio', animeStudioSchema);
export const AnimeType = mongoose.model('AnimeType', animeTypeSchema);
export const AnimeSource = mongoose.model('AnimeSource', animeSourceSchema);