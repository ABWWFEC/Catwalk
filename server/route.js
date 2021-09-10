<<<<<<< HEAD
/* eslint-disable camelcase */
=======
>>>>>>> 3da8193d93871be72d534ace8f87ddb0ee607a2b
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
<<<<<<< HEAD
  })
  .post((req, res) => {
    const {
      rating, summary, body, recommend, name, email, photos, characteristics,
    } = req.body;
    const data = {
      product_id: req.params.product_id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    };

    const config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${req.params.product_id}`,
      headers: {
        Authorization: TOKEN,
      },
      data,
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
=======
  });
//   .post(function)
>>>>>>> 3da8193d93871be72d534ace8f87ddb0ee607a2b

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
<<<<<<< HEAD
  })
  .post((req, res) => {
    const {
      body, name, email, product_id,
    } = req.body;
    const data = {
      body,
      name,
      email,
      product_id,
    };

    const config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?product_id=${req.params.product_id}/qa/questions`,
      headers: {
        Authorization: TOKEN,
      },
      data,
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
=======
>>>>>>> 3da8193d93871be72d534ace8f87ddb0ee607a2b
  });

module.exports = router;
