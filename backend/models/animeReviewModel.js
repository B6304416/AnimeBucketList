import mongoose from "mongoose";

const animeReviewSchema = mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        rate: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5]
        },
        userId: {
            type: String,
            required: true,
        },
        animeId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const AnimeReview = mongoose.model('AnimeReview', animeReviewSchema);