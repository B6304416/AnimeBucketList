import express from "express";
import { Manga } from "../models/mangaModel.js";
import { adminVerify } from "../middleware.js";

const router = express.Router();

//Route for Get All animes
router.get('/', async (req, res) =>{
    try {
        const mangas = await Manga.find({});
        return res.status(200).json(mangas);
    } catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route for Get a anime by ID
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

//Route for Post a new Anime
router.post('/', adminVerify, async (req, res) =>{
    try {
        if (
            !req.body.name ||
            !req.body.typeId ||
            !req.body.studioId ||
            !req.body.sourceId ||
            !req.body.episode 
        ){
            return res.status(400).send({
                message: 'required field invalid!',
                req:req
            });
        }
        const newManga = {
            name: req.body.name, 
            typeId: req.body.typeId, 
            studioId: req.body.studioId, 
            episode: req.body.episode, 
            sourceId: req.body.sourceId,
            genre: req.body.genre,
            imgUrl: req.body.imgUrl,
        }
        const manga = await Manga.create(newManga);
        return res.status(201).send(manga);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route for Update a new Anime
router.put('/:id', adminVerify, async (req, res) =>{
    try {
        
        if (
            !req.body.name ||
            !req.body.typeId ||
            !req.body.studioId ||
            !req.body.episode ||
            !req.body.sourceId 
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
        return res.status(200).send({message: 'anime update successfully'});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route for Delete a anime by ID
router.delete('/:id', adminVerify, async (req, res) =>{
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
