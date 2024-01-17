import express from 'express';
import booksRouter from './books';
import categoriesRouter from './categories';

const router = express.Router();

router.use('/books', booksRouter);
router.use('/categories', categoriesRouter);

export default router;