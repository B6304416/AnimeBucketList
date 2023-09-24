import mongoose from "mongoose";

const mangaReviewSchema = mongoose.Schema(
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
        mangaId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const MangaReview = mongoose.model('MangaReview', mangaReviewSchema);