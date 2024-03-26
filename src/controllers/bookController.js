import { book } from '../models/index.js';
import { author } from '../models/index.js';
import notFound from '../errors/notFound.js';

class BookController {

    static async listBooks(req, res, next) {
        try {
            const searchBooks = book.find();
            req.result = searchBooks;
            next();
        } catch (err) {
            next(err);
        }
    }

    static async searchBook(req, res, next) {
        try {
            const id = req.params.id;
            const bookFound = await book.findById(id);
            
            if (bookFound !== null) {
                res.status(200).json(bookFound);
            } else {
                next(new notFound('Livro não encontrado.'));
            }
            res.status(200).json(bookFound);
        } catch (err) {
            next(err);
        }
    }

    static async createBook(req, res, next) {
        const newBook = req.body;
        try {
            if (newBook.author) {
                const authorFound = await author.findById(newBook.author);
                const bookCompleted = { ...newBook, author: { ...authorFound._doc }};
                await book.create(bookCompleted);
                res.status(201).json({ message: 'Livro Criado com sucesso!', livro: bookCompleted });
            } else {
                await book.create(newBook);
                res.status(201).json({ message: 'Livro Criado com sucesso!', livro: newBook });
            }
        } catch (err) {
            next(err);
        }
    }

    static async updateBook(req, res, next) {
        try {
            const id = req.params.id;
            const bookFound = await book.findById(id);

            if (bookFound !== null) {
                await book.findByIdAndUpdate(id, req.body);
                res.status(200).json({message: 'Livro Atualizado com sucesso.'});
            } else {
                next(new notFound('Livro não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    }

    static async deleteBook(req, res, next) {
        try {
            const id = req.params.id;
            
            const bookFound = await book.findById(id);

            if (bookFound !== null) {
                await book.findByIdAndDelete(id);
                res.status(200).json({message: 'Livro Deletado com sucesso.'});
            } else {
                next(new notFound('Livro não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    }

    static async listBooksByFilter(req, res, next) {
        try {
            const search = await processSearch(req.query);

            if (search !== null) {
                const booksByFilter = book.find(search).populate('author');

                req.result = booksByFilter;

                next();
            } else {
                res.status(200).send([]);
            }
        } catch (err) {
            next(err);
        }
    }

}

async function processSearch(query) {
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = query;

    let search = {};

    if (editora) search.editora = { $regex: editora, $options: 'i' };
    if (titulo) search.titulo = { $regex: titulo, $options: 'i' };

    if (minPaginas || maxPaginas) search.paginas = {};
    if (minPaginas) search.paginas.$gte = minPaginas;
    if (maxPaginas) search.paginas.$lte = maxPaginas;

    if (nomeAutor) {
        const autor = await author.findOne({ nome: nomeAutor});

        if (autor !== null) {
            search.author = autor;
        } else {
            search = null;
        }
    }

    return search;
}

export default BookController;