import express from 'express';
import database from '../../database';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await database.categories.getAll();
        res.json(categories)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Unable to get categories.'});     
    }
});

export default router;