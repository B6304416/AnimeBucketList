import mongoose from "mongoose";

const suggestionSchema = mongoose.Schema(
    {
        detail: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
 
export const Suggestion = mongoose.model('Suggestion', suggestionSchema);