/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { routeProducts, routeQA, routeReviews, outfit } = require('./routes/index');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/product', routeProducts);
app.use('/api/QA', routeQA);
app.use('/api/review', routeReviews);
app.use('/api/outfit', outfit);

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});

module.exports = app;