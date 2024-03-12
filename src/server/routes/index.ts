import express from 'express';
import apiIndex from './api';
import authIndex from './auth';

const router = express.Router();

router.use('/api', apiIndex);
router.use('/auth', authIndex);

export default router;