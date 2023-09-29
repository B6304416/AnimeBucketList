import express from "express";
import { Character } from "../models/characterModel.js";
import { authMiddleware } from "../middleware.js";

const router = express.Router();

//Route for Get rate of each animes
router.get('/popular', async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: null, // Group all documents into a single group
                    maxScore: { $max: '$score' }, // Calculate the maximum score
                },
            },
            {
                $lookup: {
                    from: 'characters', // Your collection name
                    let: { maxScore: '$maxScore' }, // Define a variable to hold the maximum score
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$score', '$$maxScore'] }, // Find documents where score matches the maximum score
                            },
                        },
                    ],
                    as: 'topCharacters',
                },
            },
        ];
        const result = await Character.aggregate(pipeline);
        const topCharacters = result[0]?.topCharacters || {};
        return res.status(200).json(topCharacters);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
});

//Route for Get All Character
router.get('/', async (req, res) => {
    try {
        const characters = await Character.find({});
        return res.status(200).json(characters);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Get a Character by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const character = await Character.findById(id);
        return res.status(200).json(character);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Post a new Character
router.post('/', authMiddleware, async (req, res) => {
    try {
        if (
            !req.body.name
        ) {
            return res.status(400).send({
                message: 'required field invalid!',
                req: req
            });
        }
        const newCharacter = {
            name: req.body.name,
            score: req.body.score,
            animeId: req.body.animeId,
            mangaId: req.body.mangaId,
            imgUrl: req.body.imgUrl,
        }
        const character = await Character.create(newCharacter);
        return res.status(201).send(character);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//Route for Update a new Character
router.put('/:id', authMiddleware, async (req, res) => {
    try {

        if (
            !req.body.name
        ) {
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        const { id } = req.params;
        const result = await Character.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        return res.status(200).send({ message: 'character update successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//Route for Delete a Character by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Character.findByIdAndRemove(id);
        if (!result) {
            return res.status(404).json({ message: 'character not found' })
        }
        return res.status(200).send({ message: 'character delete successfully' });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

export default router;