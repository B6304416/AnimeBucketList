import express from "express";
import { MangaReview } from "../models/mangaReviewModel.js";
import { ObjectId } from 'mongodb';
import { authMiddleware, tokenVerify } from "../middleware.js";
const router = express.Router();

//Route for Get rate of each animes
router.get('/avg_rate', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$mangaId',
                    totalRate: { $sum: '$rate' },
                    countRate: { $count: {} },
                    averageRate: { $avg: '$rate' },
                }
            },
            {
                $lookup: {
                    from: 'mangas', 
                    localField: '_id',
                    foreignField: '_id',
                    as: 'mangaDetails'
                }
            },
            {
                $unwind: '$mangaDetails'
            },
            {
                $project: {
                    _id: 1,
                    totalRate: 1,
                    countRate: 1,
                    averageRate: 1,
                    mangaName: '$mangaDetails.name',
                    mangaImgUrl: '$mangaDetails.imgUrl',
                    mangaEpisode: '$mangaDetails.episode',
                    mangaSynopsis: '$mangaDetails.synopsis',
                    mangaGenre: '$mangaDetails.genre',
                }
            }
        ];
        const result = await MangaReview.aggregate(pipeline);
        return res.status(200).json(
            result
        );
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
});

//Route for Get review by animeId
router.get('/rate/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const mangaObjectId = new ObjectId(id);
        const pipeline = [
            {
                $match: {
                    mangaId: mangaObjectId
                }
            },
            {
                $lookup: {
                    from: 'users', // Assuming your collection name for types is 'types'
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    _id: 1,
                    comment: 1,
                    rate: 1,
                    user: '$user.name' ,
                }
            }
            // Add more stages if needed
        ];
        const result = await MangaReview.aggregate(pipeline);
        return res.status(200).json(
            result
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Server Error' });
    }
});

//Route for Get All animeReviews
router.get('/', async (req, res) => {
    try {
        const mangaReview = await MangaReview.find({});
        return res.status(200).json({
            count: mangaReview.length,
            data: mangaReview
            // userId: req.user.userId
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Get a animeReviews by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const mangaReview = await MangaReview.findById(id);
        return res.status(200).json({ mangaReview });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.post('/', tokenVerify,async (req, res) => {
    try {
        // const { comment, rate, animeId } = req.body;
        const comment = req.body.comment;
        const rate = req.body.rate;
        const mangaId = req.body.mangaId;
        const mangaIdObjectId = new ObjectId(mangaId);
        const userId = req.user.userId;
        const userIdObjectId = new ObjectId(userId);

        if (!comment || !rate || !userId || !mangaId) {
            return res.status(400).send({
                message: 'Required fields are invalid or missing!',
            });
        }
        const newMangaReview = {
            comment : comment,
            rate : rate,
            userId : userIdObjectId,
            mangaId : mangaIdObjectId,
        };
        const mangaReview = await MangaReview.create(newMangaReview);
        return res.status(201).send(mangaReview);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route for Update a new animeReviews
router.put('/:id', async (req, res) => {
    try {

        if (
            !req.body.comment ||
            !req.body.rate ||
            !req.body.userId ||
            !req.body.animeId
        ) {
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        const { id } = req.params;
        const result = await MangaReview.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        return res.status(200).send({ message: 'mangaReview update successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//Route for Delete a animeReviews by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await MangaReview.findByIdAndRemove(id);
        if (!result) {
            return res.status(404).json({ message: 'mangaReview not found' })
        }
        return res.status(200).send({ message: 'mangaReview delete successfully' });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router;
