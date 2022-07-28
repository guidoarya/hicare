import express from 'express';
import { uploadSingle } from '../middlewares/multer.js';

import {
  addArticle,
  deleteArticle,
  getArticle,
  updateArticle,
} from '../controllers/article.js';
import { Login, Logout, Register } from '../controllers/user.js';

import { isLogin } from '../middlewares/verify.js';
import { ArticleList } from '../controllers/api.js';

const router = express.Router();
router.get('/articlelist', ArticleList);
router.post('/register', uploadSingle, Register);
router.post('/login', uploadSingle, Login);
router.get('/logout', Logout);
router.use(isLogin);

router.get('/article', getArticle);
router.post('/article', uploadSingle, addArticle);
router.patch('/article/:id', uploadSingle, updateArticle);
router.delete('/article/:id', deleteArticle);

export default router;
