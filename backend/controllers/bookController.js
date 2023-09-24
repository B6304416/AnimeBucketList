import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Route for Get All book
router.get('/', async (req, res) =>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route for Get a book by ID
router.get('/:id',async (req, res) =>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json({book});
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route for Post a new Book
router.post('/', async (req, res) =>{
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ){
            return res.status(400).send({
                message: 'Required field invalid!',
            });
        }
        const newBook = {
            title: req.body.title, 
            author: req.body.author, 
            publishYear: req.body.publishYear 
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route for Update a new Book
router.put('/:id', async (req, res) =>{
    try {
        
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
        ){
            return res.status(400).send({
                message: 'Required field invalid!',
            });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result){
            return res.status(400).send({
                message: 'Required field invalid!',
            });
        }
        return res.status(200).send({message: 'Book update successfully'});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Route for Delete a book by ID
router.delete('/:id',async (req, res) =>{
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndRemove(id);
        if(!result){
            return res.status(404).json({message:'book not found'})
        }
        return res.status(200).send({message: 'Book delete successfully'});
    }catch(error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;
