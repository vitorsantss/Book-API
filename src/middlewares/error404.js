import notFound from '../errors/notFound.js';

function error404(req, res, next) {
    const error = new notFound();
    next(error);
}

export default error404;