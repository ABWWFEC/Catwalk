const router = require('express').Router();
const axios = require('axios');
const { TOKEN } = require('../../config');

router.route('/questions/:product_id')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions?product_id=${req.params.product_id}`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
      .then((response) => {
        res.status(200).send(response.data);
        res.end();
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  })

router.route('/questions/:question_id/answers')
  .get((req, res) => {
    const data = '';

    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${req.params.question_id}/answers`,
      headers: {
        Authorization: TOKEN,
      },
      data,
    };

    axios(config)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((error) => {
      res.status(400).send(error);
    })
  })

  .post((req, res) => {
    const {
      body, name, email, photos,
    } = req.body;

    const data = {
      body, name, email, photos,
    };


    const config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${req.params.question_id}/answers`,
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/json',
      },
      data,
    };
    axios(config)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

module.exports = router;

/*
{
    "product_id": "42366",
    "results": [
        {
            "question_id": 348449,
            "question_body": "Can I wash it?",
            "question_date": "2018-02-08T00:00:00.000Z",
            "asker_name": "cleopatra",
            "question_helpfulness": 9,
            "reported": false,
            "answers": {
                "3257729": {
                    "id": 3257729,
                    "body": "I've thrown it in the wash and it seems fine",
                    "date": "2018-02-08T00:00:00.000Z",
                    "answerer_name": "marcanthony",
                    "helpfulness": 8,
                    "photos": []
                },
                "3257747": {
                    "id": 3257747,
                    "body": "It says not to",
                    "date": "2018-03-08T00:00:00.000Z",
                    "answerer_name": "ceasar",
                    "helpfulness": 0,
                    "photos": []
                },
                "3257779": {
                    "id": 3257779,
                    "body": "I wouldn't machine wash it",
                    "date": "2018-03-08T00:00:00.000Z",
                    "answerer_name": "ceasar",
                    "helpfulness": 0,
                    "photos": []
                },
                "3257784": {
                    "id": 3257784,
                    "body": "Only if you want to ruin it!",
                    "date": "2018-03-08T00:00:00.000Z",
                    "answerer_name": "ceasar",
                    "helpfulness": 5,
                    "photos": []
                },
                "3257790": {
                    "id": 3257790,
                    "body": "Yes",
                    "date": "2018-03-08T00:00:00.000Z",
                    "answerer_name": "Seller",
                    "helpfulness": 4,
                    "photos": []
                }
            }
        },
    ]
}
*/
