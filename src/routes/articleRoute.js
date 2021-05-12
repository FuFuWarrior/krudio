import { Router } from 'express';
const router = Router();
import ArticleCtrl from '../controller/articleCtrl.js';

router.get('/all/', ArticleCtrl.getAllArticle);
router.get('/articles/:articleId/', ArticleCtrl.getOneArticle);
router.post('/articles/create', ArticleCtrl.createArticle);
router.patch('/articles/:articleId/edit/', ArticleCtrl.editOneArticle);
router.delete('/articles/:articleId/', ArticleCtrl.deleteOneArticle);
router.delete('/articles/', ArticleCtrl.deleteAllArticle);

export default router;