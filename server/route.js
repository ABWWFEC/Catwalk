var router = require('express').Router();
var axios = require('axios');
var {TOKEN} = require('../config.js');

router.route('/reviews/:product_id')
  .get(function (req, res) {
    var data = '';

    var config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews?product_id=${req.params.product_id}`,
      headers: {
        'Authorization': TOKEN
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.status(200).send(JSON.stringify(response.data));
      res.end();
    })
    .catch(function (error) {
      res.status(400).send()
      console.log(error);
    });
  })
//   .post(function)

router.route('/products/:product_id')
   .get(function (req, res) {
    var data = '';

    var config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products?product_id=${req.params.product_id}`,
      headers: {
        'Authorization': TOKEN
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.status(200).send(JSON.stringify(response.data));
      res.end();
    })
    .catch(function (error) {
      res.status(400).send();
      console.log(error);
    });
   })

// router.route('/related')
//   .get(function)

// router.route('/questions')
//   .get(function)
//   .post(function)

module.exports = router;