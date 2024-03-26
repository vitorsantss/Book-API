import notFound from '../errors/notFound.js';
import { author } from '../models/index.js';


class AuthorController {

    static async listAuthors(req, res, next) {
        try {
            const authors =  author.find({});

            req.result = authors;
        
            next();
        } catch (err) {
            next(err);
        }
    }

    static async searchAuthor(req, res, next) {
        try {
            const id = req.params.id;
            const authorFound = await author.findById(id);

            if (authorFound !== null) {
                res.status(200).json(authorFound);
            } else {
                next(new notFound('Autor não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    }


    static async createAuthor(req, res, next) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: 'Autor Criado com sucesso!', autor: newAuthor });
        } catch (err) {
            next(err);
        }
    }

    static async updateAuthor(req, res, next) {
        try {
            const id = req.params.id;
            const authorFound = await author.findById(id);
            if (authorFound !== null) {
                await author.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: 'Autor Atualizado com sucesso.' });
            } else {
                next(new notFound('Autor não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    }

    static async deleteAuthor(req, res, next) {
        try {
            const id = req.params.id;
            const authorFound = await author.findById(id);
            if (authorFound !== null) {
                await author.findByIdAndDelete(id);
                res.status(200).json({ message: 'Autor deletado com sucesso.' });
            } else {
                next(new notFound('Autor não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    }
}

export default AuthorController;