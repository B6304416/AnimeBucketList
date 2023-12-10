import mongoose from "mongoose";

const characterSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
        },
        animeId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        mangaId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        // imgUrl: {
        //     type: String,
        // },
        detail:{
            type: String,
        },
        imgProfile: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);



export const Character = mongoose.model('Character', characterSchema);