const router = require('express').Router();
const axios = require('axios');
const { TOKEN } = require('../../config');

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
        res.status(200).json((response.data));
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  })
  .post((req, res) => {
    const config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?product_id=${req.params.product_id}/qa/questions`,
      headers: {
        Authorization: TOKEN,
      },
      data: req.body,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        res.status(201).send('CREATED');
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  });

module.exports = router;
