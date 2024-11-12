import express from 'express';
import logger from 'morgan';

// import routes
import indexRouter from './routes/index.js';
import catalogRouter from './routes/catalog.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(logger('dev'));

// set up routes
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

app.listen(port, () => console.log(`Listening on port: ${port}`));
