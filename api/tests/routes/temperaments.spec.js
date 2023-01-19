/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { conn } = require('../../src/db.js');
const httpStatusCodes = require('../../src/utils/http-status-codes.js');

const agent = session(app);

describe('Temperaments routes', () => {
  before(() => conn.authenticate()
    .then(() => conn.sync({ force: true }))
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('GET /temperaments', () => {
    it('should get 200', async () =>
      agent.get('/temperaments').expect(httpStatusCodes.OK)
    );
    it('should get at least 1 temperament', async () => {
      const res = await agent.get('/temperaments');
      expect(res.statusCode).to.equal(httpStatusCodes.OK);
      expect(res.body.length).to.gte(1);
    });
  });
});
