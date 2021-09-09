const router = require('express').Router();
const axios = require('axios');
const { TOKEN } = require('../config');

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
        res.status(200).send(JSON.stringify(response.data));
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });
//   .post(function)

router.route('/products/:product_id')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?product_id=${req.params.product_id}`,
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
        res.status(200).send(JSON.stringify(response.data));
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

router.route('/questions/:product_id')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?product_id=${req.params.product_id}/qa/questions`,
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
