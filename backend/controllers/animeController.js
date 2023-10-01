import express from "express";
import { Anime, AnimeStudio, AnimeSource, AnimeType } from "../models/animeModel.js";
import { authMiddleware } from "../middleware.js";
import { ObjectId } from 'mongodb';

const router = express.Router();

//Route for Get All Studios
router.get('/studios', async (req, res) => {
    try {
        const studios = await AnimeStudio.find({});
        return res.status(200).json(studios);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Get All Types
router.get('/types', async (req, res) => {
    try {
        const types = await AnimeType.find({});
        // console.log(req)
        return res.status(200).json(types);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Get All Sources
router.get('/sources', async (req, res) => {
    try {
        const sources = await AnimeSource.find({});
        // console.log(req)
        return res.status(200).json(sources);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Get All animes
router.get('/', async (req, res) => {
    try {
        const animes = await Anime.find({});
        // console.log(req)
        return res.status(200).json(animes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Get a anime by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const anime = await Anime.findById(id);
        return res.status(200).json(anime);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})


//Route for Post a new Anime
router.post('/', authMiddleware, async (req, res) => {

    try {
        
        if (
            !req.body.name ||
            !req.body.typeId ||
            !req.body.studioId ||
            !req.body.sourceId ||
            !req.body.episode
        ) {
            return res.status(400).send({
                message: 'required field invalid!',
                req: req
            });
        }
        const typeId = req.body.typeId;
        const studioId = req.body.studioId;
        const sourceId = req.body.sourceId;
        const typeObjectId = new ObjectId(typeId);
        const studioObjectId = new ObjectId(studioId);
        const sourceObjectId = new ObjectId(sourceId);

        const newAnime = {
            name: req.body.name,
            typeId: typeObjectId,
            studioId: studioObjectId,
            sourceId: sourceObjectId,
            episode: req.body.episode,
            genre: req.body.genre,
            imgUrl: req.body.imgUrl,
            synopsis: req.body.synopsis,
        }
        const anime = await Anime.create(newAnime);
        return res.status(201).send(anime);
    } catch (error) {
        console.log(error.message);
        // console.log(req);
        // console.log(typeId)
        // console.log(studioId)
        // console.log(typeObjectId)
        // console.log(studioObjectId)
        res.status(500).send({ message: error.message })
    }
})

//Route for Update a new Anime
router.put('/:id', authMiddleware, async (req, res) => {
    try {

        if (
            !req.body.name ||
            !req.body.typeId ||
            !req.body.studioId ||
            !req.body.episode ||
            !req.body.sourceId
        ) {
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        const { id } = req.params;
        const result = await Anime.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        return res.status(200).send({ message: 'anime update successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//Route for Delete a anime by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Anime.findByIdAndRemove(id);
        if (!result) {
            return res.status(404).json({ message: 'anime not found' })
        }
        return res.status(200).send({ message: 'anime delete successfully' });
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})



export default router;
