/* eslint-disable no-console */
const compression = require('compression');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { routeProducts, routeQA, routeReviews } = require('./routes/index');
const dependencies = ['bootstrap', 'jquery'];

const app = express();
app.use(compression());

const port = 3000;
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/product', routeProducts);
app.use('/api/QA', routeQA);
app.use('/api/review', routeReviews);
dependencies.forEach(dep => {
  app.use(`/${dep}`, express.static(path.resolve(`node_modules/${dep}`)));
});

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

module.exports = app;