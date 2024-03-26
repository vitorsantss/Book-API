import ErrorBase from './errorBase.js';

class notFound extends ErrorBase {
    constructor(message = 'Página não encontrada.') {
        super(message, 404);
    }
}

export default notFound;