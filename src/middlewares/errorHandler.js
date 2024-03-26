import mongoose from 'mongoose';
import errorBase from '../errors/errorBase.js';
import incorrectRequest from '../errors/incorrectRequest.js';
import validationError from '../errors/validationError.js';

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next)  {
    if (err instanceof mongoose.Error.CastError) {
        new incorrectRequest().sendReponse(res);
    } else if(err instanceof mongoose.Error.ValidationError) {
        new validationError(err).sendReponse(res);
    } else if (err instanceof errorBase) {
        err.sendReponse(res);
    }else {
        new errorBase().sendReponse(res);
    }}

export default errorHandler;