import express from "express";
import { Character } from "../models/characterModel.js";
import { User } from "../models/userModel.js";
import { authMiddleware, tokenVerify } from "../middleware.js";
import { upload } from "../uploadImg.js";
import { ObjectId } from 'mongodb';
// import fs from 'fs';
// import path from 'path';

const router = express.Router();

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
                    _id: null,
                    maxScore: { $max: '$score' },
                },
            },
            {
                $lookup: {
                    from: 'characters',
                    let: { maxScore: '$maxScore' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$score', '$$maxScore'] },
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
        return res.status(200).json([character]);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Post a new Character
router.post('/', upload.single('imgProfile'), async (req, res) => {
    try {
        console.log(req.body.animeId)
        console.log(req.body.mangaId)
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
            score: 0,
            detail: req.body.detail,
        }
        if (req.body.animeId != 'null'){
            const animeId = req.body.animeId;
            var animeObjectId = new ObjectId(animeId);
            newCharacter.animeId = animeObjectId
            console.log(req.body.animeId)
        } 
        if(req.body.mangaId != 'null'){
            const mangaId = req.body.mangaId;
            var mangaObjectId = new ObjectId(mangaId);
            newCharacter.animeId = mangaObjectId
            console.log(req.body.mangaId)
        }
        if (req.file) {
            newCharacter.imgProfile = '/uploads/' + req.file.filename;
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

// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);

//Route for Delete a Character by ID ยังลบรูปด้วยไม่ได้
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // const character = await Character.findById(id);
        // if (character.imgProfile) {
        //     const imagePath = path.join(__dirname, '..', character.imgProfile);
        //     try {
        //         await fsPromises.unlink(imagePath);
        //         console.log('Image file deleted successfully');
        //     } catch (err) {
        //         console.error('Error deleting image file:', err);
        //     }
        // }
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
