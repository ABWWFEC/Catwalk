const express = require('express');
const path = require('path');
const morgan = require('morgan');
const route = require('./routes/index');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', route);

app.listen(port, () => {
  console.log(`connected to port: ${port}`);
});
