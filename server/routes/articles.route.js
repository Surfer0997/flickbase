const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
// Middlewares
const auth = require('../middleware/auth'); // cause only admins can create articles
const { addArticleValidator } = require('../middleware/validation');


//// /api/articles/
router.post('/', auth('createAny', 'articles'), addArticleValidator,articlesController.createArticle);

router.route('/article/:id')
.get(auth('readAny', 'articles'), articlesController.getArticleById) // for authorized user
.patch(auth('updateAny', 'articles'), articlesController.updateArticleById)
.delete(auth('deleteAny', 'articles'), articlesController.deleteArticleByID)


router.route('/users/article/:id') // for unauthorized users
.get(articlesController.getNoAuthUserArticleById)

router.route('/all') // get all articles
.get(articlesController.getAllArticles)
.post(articlesController.getMoreArticles)


router.post('/admin/paginate', auth('readAny', 'articles'), articlesController.adminPaginate)
module.exports = router;