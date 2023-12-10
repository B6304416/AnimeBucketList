import express from "express";
import { Genre } from "../models/genreModel.js";

const router = express.Router();

//Route for Get All genres
router.get('/', async (req, res) =>{
    try {
        const genres = await Genre.find({});
        return res.status(200).json(genres);
    } catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route for Get a genre by ID
router.get('/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const genre = await Genre.findById(id);
        return res.status(200).json(genre);
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route for Post a new genre
router.post('/', async (req, res) =>{
    try {
        if (
            !req.body.name 
        ){
            return res.status(400).send({
                message: 'required field invalid!',
                req:req
            });
        }
        const newGenre = {
            name: req.body.name, 
        }
        const genre = await Genre.create(newGenre);
        return res.status(201).send(genre);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route for Update a new genre
router.put('/:id', async (req, res) =>{
    try {
        
        if (
            !req.body.name
        ){
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        const {id} = req.params;
        const result = await Genre.findByIdAndUpdate(id, req.body)
        if (!result){
            return res.status(400).send({
                message: 'required field invalid!',
            });
        }
        return res.status(200).send({message: 'genre update successfully'});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route for Delete a genre by ID
router.delete('/:id', async (req, res) =>{
    try{
        const {id} = req.params;
        const result = await Genre.findByIdAndRemove(id);
        if(!result){
            return res.status(404).json({message:'genre not found'})
        }
        return res.status(200).send({message: 'genre delete successfully'});
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;
