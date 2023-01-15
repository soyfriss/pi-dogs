/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Temperament, conn } = require('../../src/db.js');
const httpStatusCodes = require('../../src/utils/httpStatusCodes.js');

const agent = session(app);

describe('Temperaments routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => conn.sync({ force: true }));

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
