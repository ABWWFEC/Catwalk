/* eslint-disable no-undef */

const request = require('supertest');
const app = require('./server/index');

app.listen(5000, () => {
  console.log('test server is listening on 5000')
});

test('adds 1 + 2', () => {
  expect(1 + 2).toBe(3);
});


test("testing the GET request for qa/questions ", async () => {

  await request(app).get("/api/qa/questions/42366")
    .expect(200)
    .then((response) => {
      const text = JSON.parse(response.text)
      // Check type and length
      expect(Array.isArray(text)).toBeTruthy();

      // Check data
      expect(text[0].campus).toBe('hr-lax');
      expect(text[0].name).toBe('Camo Onesie')
    })
});
