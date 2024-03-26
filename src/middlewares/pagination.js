import incorrectRequest from '../errors/incorrectRequest.js';

async function pagination (req, res, next) {
    try {
        let { limite = 5, pagina = 1, ordenacao = '_id:-1'  } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(':');    
        
        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const result = req.result;

        if (limite > 0 && pagina > 0) {
            const resultPagination = await result.find({}).skip((pagina-1) * limite).limit(limite).sort({ [campoOrdenacao]: ordem });
            res.status(200).json(resultPagination);
        } else {
            next(new incorrectRequest());
        }
    }  catch (err) {
        next(err);
    }
}

export default pagination;