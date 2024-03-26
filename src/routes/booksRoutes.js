import express  from 'express';
import BookController from '../controllers/bookController.js';
import pagination from '../middlewares/pagination.js';

const routes = express.Router();

routes.get('/livros', BookController.listBooks, pagination);
routes.get('/livros/busca', BookController.listBooksByFilter, pagination);
routes.get('/livros/:id', BookController.searchBook);
routes.post('/livros', BookController.createBook);
routes.put('/livros/:id', BookController.updateBook);
routes.delete('/livros/:id', BookController.deleteBook);

export default routes;