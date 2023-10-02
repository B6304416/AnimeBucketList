import express from "express";
import { Manga, Author } from "../models/mangaModel.js";
import { MangaReview } from "../models/mangaReviewModel.js";
import { authMiddleware } from "../middleware.js";
import { ObjectId } from 'mongodb';

const router = express.Router();

//Route for Get rate of each mangas
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
                    mangaName: '$mangaDetails.name' ,
                    mangaGenre: '$mangaDetails.genre' ,
                    mangaImgUrl: '$mangaDetails.imgUrl',
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

//Route for Get All authors
router.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find({});
        return res.status(200).json(authors);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//Route for Get All mangas
router.get('/', async (req, res) =>{
    try {
        const mangas = await Manga.find({});
        return res.status(200).json(mangas);
    } catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route for Get a manga by ID
router.get('/:id',async (req, res) =>{
    try{
        const {id} = req.params;
        const manga = await Manga.findById(id);
        return res.status(200).json(manga);
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route for Post a new manga
router.post('/', authMiddleware, async (req, res) =>{
    try {
        if (
            !req.body.name ||
            !req.body.authorId
        ){
            return res.status(400).send({
                message: 'required field invalid!',
                req:req
            });
        }
        const authorId = req.body.authorId;
        const authorObjectId = new ObjectId(authorId);

        const newManga = {
            name: req.body.name, 
            authorId: authorObjectId,
            genre: req.body.genre,
            imgUrl: req.body.imgUrl
        }
        const manga = await Manga.create(newManga);
        return res.status(201).send(manga);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route for Update a new manga
router.put('/:id', authMiddleware, async (req, res) =>{
    try {
        
        if (
            !req.body.name ||
            !req.body.authorId
        ){
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        const {id} = req.params;
        const result = await Manga.findByIdAndUpdate(id, req.body)
        if (!result){
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        return res.status(200).send({message: 'manga update successfully'});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route for Delete a manga by ID
router.delete('/:id', authMiddleware, async (req, res) =>{
    try{
        const {id} = req.params;
        const result = await Manga.findByIdAndRemove(id);
        if(!result){
            return res.status(404).json({message:'manga not found'})
        }
        return res.status(200).send({message: 'manga delete successfully'});
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;
