import express  from 'express';
import connectDatabase from './config/dbConnect.js';
import errorHandler from './middlewares/errorHandler.js';
import routes from './routes/index.js';
import error404 from './middlewares/error404.js';

const connection = await connectDatabase();

connection.on('error', (err) => {
    console.log('Erro de conexão: ', err);
});

connection.once('open', () => {
    console.log('Conexão com o banco feita com sucesso');
});

const app = express();
routes(app);

app.use(error404);

app.use(errorHandler);


export default app;