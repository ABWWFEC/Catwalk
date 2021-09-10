const router = require('express').Router();
const axios = require('axios');
const { TOKEN } = require('../../config');

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
<<<<<<< HEAD
        res.status(200).send(response.data);
=======
        res.status(200).json((response.data));
>>>>>>> 2ef1fff6277cc84b03b5952f1ad686083edabc44
        res.end();
      })
      .catch((error) => {
        res.status(400).send();
        console.log(error);
      });
  });

module.exports = router;
