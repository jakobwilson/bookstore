import express from 'express';
import database from '../../database';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await database.books.getAll();
        res.json(books);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to get books.'});
    }
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const book = await database.books.getOne(id);
        res.json(book);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to get book.'});
    }
});

router.post('/', async (req, res) => {
    const { title, author, price, categoryid } = req.body;
    try {
        const results = await database.books.create(title, author, price, categoryid);
        res.status(201).json({ message: 'Book posted!', id: results.insertId});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to post.'});
    }
});

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const { title, author, price, categoryid} = req.body;
        await database.books.update(id, title, author, price, categoryid);
        res.status(200).json({ message: 'Updated book!'});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Unable to update book.'});
    }
});

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await database.books.destroy(id);
        res.status(200).json({ message: 'Book deleted.'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to delete book.'});
    }
});

export default router;