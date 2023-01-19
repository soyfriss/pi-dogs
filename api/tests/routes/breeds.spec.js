/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, Temperament, conn } = require('../../src/db.js');
const breedValidations = require('../../src/utils/constants.js');
const httpStatusCodes = require('../../src/utils/http-status-codes.js');

const agent = session(app);

const breed = {
  name: 'Jack Russell Terrier',
  height: `${breedValidations.VALID_RANGE_HEIGHT[0]} - ${breedValidations.VALID_RANGE_HEIGHT[1]}`,
  weight: `${breedValidations.VALID_RANGE_WEIGHT[0]} - ${breedValidations.VALID_RANGE_WEIGHT[1]}`,
  lifeSpan: '',
  image: 'https://www.bunko.pet/__export/1637095587280/sites/debate/img/2021/11/16/jack_russell_terrier_crop1637095545804.jpg_172596871.jpg'
}

xdescribe('Dog routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));


  describe('GET /dogs', () => {
    beforeEach('beforeEach in GET /dogs', function () {
      console.log('Initialising...');
    })
    // beforeEach(() => conn.sync({ force: true })
    //   .then(() => Breed.create(breed)));

    it('should get 200', async () =>
      agent.get('/dogs').expect(httpStatusCodes.OK)
    );
    it('should get at least 1 breed with search letter J', async () => {
      const res = await agent.get('/dogs?name=J');
      expect(res.statusCode).to.equal(httpStatusCodes.OK);
      expect(res.body.length).to.gte(1);
    });
    it("should get breed with search name 'Jack Russell Terrier'", async () => {
      const res = await agent.get('/dogs?name=Jack Russell Terrier');
      expect(res.statusCode).to.equal(httpStatusCodes.OK);
      console.log('res.body: ', res.body);
      expect(res.body.length).to.equal(1);
    });
    it("should get breed with exact search name 'Jack Russell Terrier'", async () => {
      const res = await agent.get('/dogs?name=Jack Russell Terrier&exactSearch=true');
      expect(res.statusCode).to.equal(httpStatusCodes.OK);
      expect(res.body.length).to.equal(1);
    });
    it("should not get any breeds with search name 'asdf1234'", async () => {
      const res = await agent.get('/dogs?name=asdf1234');
      expect(res.statusCode).to.equal(httpStatusCodes.NOT_FOUND);
      expect(res.error.text).to.equal('asdf1234 breed not found');
    });
  });

  describe('GET /dogs/:id', () => {
    // beforeEach('beforeEach in GET /dogs/:id', () => conn.sync({ force: true })
    //   .then(() => Breed.create(breed)));

    it('should get 200', async () =>
      agent.get('/dogs/1?source=local').expect(httpStatusCodes.OK)
    );
    it('should get breed with id=1 from DB', async () => {
      const res = await agent.get('/dogs/1?source=local');
      expect(res.statusCode).to.equal(httpStatusCodes.OK)
      expect(res.body).to.eql({
        ...breed,
        id: 1,
        temperament: '',
        source: 'local'
      });
    });
    it('should get breed with id=1 from thedogapi', async () => {
      const res = await agent.get('/dogs/1?source=external');
      expect(res.statusCode).to.equal(httpStatusCodes.OK)
      expect(res.body.id).to.equal(1);
      expect(res.body.source).to.equal('external');
    });
  });

  describe('GET invalid path /superdogs', async () => {
    it('should get 404', async () => {
      const res = await agent.get('/superdogs');
      expect(res.statusCode).to.equal(httpStatusCodes.NOT_FOUND);
      expect(res.error.text).to.equal('invalid path');
    });
  });

  describe('POST /dogs', () => {
    // beforeEach('beforeEach in POST /dogs', () => conn.sync({ force: true })
    //   .then(() => Temperament.create({ name: 'Happy' })));

    const newBreed = {
      ...breed,
      temperaments: ['Happy']
    };

    describe('name', () => {
      it('should not create a breed with empty name', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          name: null
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
      it('should not create a breed with length name exceeded', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          name: 'n'.repeat(breedValidations.MAX_LENGTH_NAME + 1)
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
    });

    describe('height', () => {
      it('should not create a breed with empty height', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          height: null
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
      it('should not create a breed with invalid min height range', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          height: `${breedValidations.VALID_RANGE_HEIGHT[0] - 1} - ${breedValidations.VALID_RANGE_HEIGHT[1]}`
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
      it('should not create a breed with invalid max height range', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          height: `${breedValidations.VALID_RANGE_HEIGHT[0]} - ${breedValidations.VALID_RANGE_HEIGHT[1] + 1}`
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
    });

    describe('weight', () => {
      it('should not create a breed with empty weight', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          weight: null
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
      it('should not create a breed with invalid min weight range', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          weight: `${breedValidations.VALID_RANGE_WEIGHT[0] - 1} - ${breedValidations.VALID_RANGE_WEIGHT[1]}`
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
      it('should not create a breed with invalid max weight range', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          weight: `${breedValidations.VALID_RANGE_WEIGHT[0]} - ${breedValidations.VALID_RANGE_WEIGHT[1] + 1}`
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
    });

    describe('life span', () => {
      it('should not create a breed with invalid life span', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          lifeSpan: 'no-valid'
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
    });

    describe('image', () => {
      it('should not create a breed with invalid image', async () => {
        const res = await agent.post('/dogs').send({
          ...newBreed,
          image: 'no-valid'
        });
        expect(res.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
    });

    describe('new breed', () => {
      it('should create a breed', async () => {
        const res = await agent.post('/dogs').send(newBreed);
        expect(res.statusCode).to.equal(httpStatusCodes.OK);
      });
      it('should not create a breed with same name', async () => {
        const res = await agent.post('/dogs').send(newBreed);
        expect(res.statusCode).to.equal(httpStatusCodes.OK);
        const resNameDuplicated = await agent.post('/dogs').send(duplicatedBreed);
        expect(resNameDuplicated.statusCode).to.equal(httpStatusCodes.BAD_REQUEST);
      });
    });

  });
});
