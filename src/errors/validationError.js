import incorrectRequest from './incorrectRequest.js';

class validationError extends incorrectRequest {
    constructor(err) {
        const errorMessage = Object.values(err.errors).map(err => err.message).join('; ');

        super(`Os seguintes erros foram encontrados: ${errorMessage}`);
    }
}

export default validationError;