/* eslint-disable no-console */
const router = require('express').Router();
const axios = require('axios');
const { TOKEN } = require('../../config');

router.route('/products')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products',
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        res.status(200).send(JSON.stringify(response.data));
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

router.route('/products/:product_id')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${req.params.product_id}`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        res.status(200).send(JSON.stringify(response.data));
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

module.exports = router;
