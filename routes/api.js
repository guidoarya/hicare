import express from 'express';
import { ArticleList } from '../controllers/api.js';
const router = express.Router();

router.get('/article-list', ArticleList);

export default router;
