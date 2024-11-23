import express from 'express';
import logger from 'morgan';
// import routes
import indexRouter from './api/v1/routes/index.js';
import catalogRouter from './api/v1/routes/catalog.js';
// import error handler middleware
import errorHandler from './api/v1/middlewares/errorHandler.js';

// init app
const app = express();
const port = process.env.PORT || 3000;

// *** MIDDLEWARES *** //
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// set up routes
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);

// error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port: ${port}`));
