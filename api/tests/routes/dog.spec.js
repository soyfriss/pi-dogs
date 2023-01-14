/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, conn } = require('../../src/db.js');

const agent = session(app);

const breed = {
  name: 'Jack Russell Terrier',
  height: '1 - 1',
  weight: '1 - 1',
  lifeSpan: '1 - 1',
  image: ''
}

describe('Dog routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => conn.sync({ force: true })
    .then(() => Breed.create(breed)));

  xdescribe('GET /dogs', () => {
    it('should get 200', async () =>
      agent.get('/dogs').expect(200)
    );
    it('should get at least 1 breed with search letter J', async () => {
      const res = await agent.get('/dogs?name=J');
      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.gte(1);
    });
    it("should get breed with search name 'Jack Russell Terrier'", async () => {
      const res = await agent.get('/dogs?name=Jack Russell Terrier');
      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(1);
    });
    it("should get breed with exact search name 'Jack Russell Terrier'", async () => {
      const res = await agent.get('/dogs?name=Jack Russell Terrier&exactSearch=true');
      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.equal(1);
    });
    it("should not get any breeds with search name 'asdf1234'", async () => {
      const res = await agent.get('/dogs?name=asdf1234');
      expect(res.statusCode).to.equal(404);
      expect(res.error.text).to.equal('asdf1234 breed not found');
    });
  });

  xdescribe('GET /dogs/:id', () => {
    it('should get 200', async () =>
      agent.get('/dogs/1?source=local').expect(200)
    );
    it('should get breed with id=1 from DB', async () => {
      const res = await agent.get('/dogs/1?source=local');
      expect(res.statusCode).to.equal(200)
      expect(res.body).to.eql({
        ...breed,
        id: 1,
        temperament: '',
        source: 'local'
      });
    });
    it('should get breed with id=1 from thedogapi', async () => {
      const res = await agent.get('/dogs/1?source=external');
      expect(res.statusCode).to.equal(200)
      expect(res.body.id).to.equal(1);
      expect(res.body.source).to.equal('external');
    });
  });

  describe('GET invalid path /superdogs', async () => {
    it('should get 404', async () => {
      const res = await agent.get('/superdogs');
      expect(res.statusCode).to.equal(404);
      expect(res.error.text).to.equal('invalid path');
    });
  });

});
