/* eslint-disable camelcase */
const router = require('express').Router();
const axios = require('axios');
const { TOKEN } = require('../../config');

router.route('/reviews/:product_id')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${req.params.product_id}`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        res.status(200).json(response.data);
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  })
  .post((req, res) => {
    const { product_id } = req.params;

    const config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${product_id}`,
      headers: {
        Authorization: TOKEN,
      },
      data: { product_id, ...req.body },
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        res.status(201).send('CREATED');
      })
      .catch((err) => {
        console.log(`err on create review: ${err}`);
        res.status(400).send(err);
      });
  });

router.route('/related/:product_id')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?product_id=${req.params.product_id}/related`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        res.status(200).json((response.data));
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

module.exports = router;
