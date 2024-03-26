import express  from 'express';
import AuthorController from '../controllers/authorController.js';
import pagination from '../middlewares/pagination.js';

const routes = express.Router();

routes.get('/autores', AuthorController.listAuthors, pagination);
routes.get('/autores/:id', AuthorController.searchAuthor);
routes.post('/autores', AuthorController.createAuthor);
routes.put('/autores/:id', AuthorController.updateAuthor);
routes.delete('/autores/:id', AuthorController.deleteAuthor);

export default routes;