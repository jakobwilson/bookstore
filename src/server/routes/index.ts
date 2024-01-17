import express from 'express';
import apiIndex from './api';

const router = express.Router();

router.use('/api', apiIndex);

export default router;