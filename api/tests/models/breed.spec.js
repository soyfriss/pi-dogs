const { Breed, conn } = require('../../src/db.js');

describe('Breed model', () => {

  before(() => conn.sync({ force: true })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      })
  );

  describe('name', () => {
    it('should throw an error if name is null', (done) => {
      Breed.create({
        name: null,
        height: '1 - 1',
        weight: '1 - 1'
      })
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });
    it('should work when its a valid name', (done) => {
      Breed.create({
        name: 'Jack Russell Terrier 1',
        height: '2 - 2',
        weight: '2 - 2'
      })
      .then((breed) => {
        console.log('breed created: ', breed);
        return done();
      })
      .catch(error => done(new Error('should work when its a valid name: ', error)));
    });
  });

  xdescribe('unique name', () => {
    it('should throw an error if name is not unique', (done) => {
      Breed.create({
        name: 'Jack Russell Terrier 1',
        height: '1 - 1',
        weight: '1 - 1'
      })
        .then(() => done(new Error('It requires a unique name')))
        .catch(() => done());
    });

    it('should work when its a unique name', () => {
      Breed.create({
        name: 'Jack Russell Terrier 2',
        height: '1 - 1',
        weight: '1 - 1'
      });
    });
  });

  xdescribe('weight', () => {
    it('should throw an error if weight is null', (done) => {
      Breed.create({
        name: 'Jack Russell Terrier 3',
        height: '1 - 1',
        weight: null
      })
        .then(() => done(new Error('It requires a valid weight')))
        .catch(() => done());
    });
    it('should work when its a valid weight', () => {
      Breed.create({
        name: 'Jack Russell Terrier 3',
        height: '1 - 1',
        weight: '1 - 1'
      });
    });
  });

  xdescribe('height', () => {
    it('should throw an error if height is null', (done) => {
      Breed.create({
        name: 'Jack Russell Terrier 4',
        height: null,
        weight: '1 - 1'
      })
        .then(() => done(new Error('It requires a valid height')))
        .catch(() => done());
    });
    it('should work when its a valid height', () => {
      Breed.create({
        name: 'Jack Russell Terrier 4',
        height: '1 - 1',
        weight: '1 - 1'
      });
    });
  });
});
