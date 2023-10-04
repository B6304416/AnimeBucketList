import express from "express";
import { Character } from "../models/characterModel.js";
import { User } from "../models/userModel.js";
import { authMiddleware, tokenVerify } from "../middleware.js";

const router = express.Router();

router.get('/detail', async (req, res) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'animes', // Assuming your collection name for types is 'types'
                    localField: 'animeId',
                    foreignField: '_id',
                    as: 'anime'
                }
            },
            {
                $lookup: {
                    from: 'mangas', // Assuming your collection name for studios is 'studios'
                    localField: 'mangaId',
                    foreignField: '_id',
                    as: 'manga'
                }
            },

            // {
            //     $unwind: '$anime'
            // },
            // {
            //     $unwind: '$manga'
            // },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    score: 1,
                    imgUrl: 1,
                    anime: '$anime.name' ,
                    manga: '$manga.name' ,

                }
            }

        ];
        
        const result = await Character.aggregate(pipeline);
        return res.status(200).json(
            result
        );
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
});

//Route for Vote for a Character
router.get('/vote_character/:id', tokenVerify, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.userId);

        const oldCharacter = await Character.findById(user.favCharacter);
        oldCharacter.score -= 1
        console.log(user.favCharacter)
        await oldCharacter.save();

        const newCharacter = await Character.findById(id);
        newCharacter.score += 1
        user.favCharacter = newCharacter._id
        console.log(user.favCharacter)
        await newCharacter.save();

        await user.save();
        return res.status(200).json(newCharacter);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

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
            detail: req.body.detail,
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
