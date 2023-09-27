import express from "express";
import { AnimeReview } from "../models/animeReviewModel.js";

const router = express.Router();

//Route for Get rate of each animes
router.get('/rate', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: '$animeId',
                    totalRate: { $sum: '$rate' },
                    countRate: { $count: {} },
                    averageRate: { $avg: '$rate' },
                }
            },
            {
                $lookup: {
                    from: 'animes', 
                    localField: '_id',
                    foreignField: '_id',
                    as: 'animeDetails'
                }
            },
            {
                $unwind: '$animeDetails'
            },
            {
                $project: {
                    _id: 1,
                    totalRate: 1,
                    countRate: 1,
                    averageRate: 1,
                    animeName: '$animeDetails.name' 
                }
            }
        ];
        const result = await AnimeReview.aggregate(pipeline);
        const animeNames = result.map(item => item.animeName)
        return res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
});


//Route for Get All animeReviews
router.get('/', async (req, res) => {
    try {
        const animeReview = await AnimeReview.find({});
        return res.status(200).json({
            count: animeReview.length,
            data: animeReview
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
        const animeReview = await AnimeReview.findById(id);
        return res.status(200).json({ animeReview });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { comment, rate, animeId } = req.body;
        const userId = req.user.userId;
        if (!comment || !rate || !userId || !animeId) {
            return res.status(400).send({
                message: 'Required fields are invalid or missing!',
            });
        }
        const newAnimeReview = {
            comment,
            rate,
            userId,
            animeId,
        };
        const animeReview = await AnimeReview.create(newAnimeReview);
        return res.status(201).send(animeReview);
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
        const result = await AnimeReview.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        return res.status(200).send({ message: 'animeReview update successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//Route for Delete a animeReviews by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await AnimeReview.findByIdAndRemove(id);
        if (!result) {
            return res.status(404).json({ message: 'animeReview not found' })
        }
        return res.status(200).send({ message: 'animeReview delete successfully' });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router;