import errorBase from './errorBase.js';

class incorrectRequest extends errorBase {
    constructor(message= 'Um ou mais dados fornecidos estão incorretos') {
        super(message, 400);
    }
}

export default incorrectRequest;