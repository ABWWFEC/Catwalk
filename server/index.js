/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { routeProducts, routeQA, routeReviews } = require('./routes/index');
const { TOKEN } = require('../config.js');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/products', routeProducts);
app.use('/api/qa', routeQA);
app.use('/api/reviews', routeReviews);

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

module.exports = app;