const { Breed, conn } = require('../../src/db.js');

const breed = {
  name: 'Jack Russell Terrier',
  height: '1 - 1',
  weight: '1 - 1',
  lifeSpan: '1 - 1',
  image: ''
}

describe('Breed model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Breed.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Breed.create({
          ...breed,
          name: null
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Breed.create(breed);
      });
    });
    describe('unique name', () => {
      it('should throw an error if name is not unique', (done) => {
        Breed.create(breed)
          .then(() => Breed.create({
            ...breed,
            height: '2 - 2',
            weight: '2 - 2'
          }))
          .then(() => done(new Error('It requires a unique name')))
          .catch(() => done());
      });
      it('should work when its a unique name', async () => {
        await Breed.create(breed);
        await Breed.create({
          ...breed,
          name: 'Bulldog'
        });
      });
    });
    describe('weight', () => {
      it('should throw an error if weight is null', (done) => {
        Breed.create({
          ...breed,
          weight: null
        })
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should work when its a valid weight', () => {
        Breed.create(breed);
      });
    });
    describe('height', () => {
      it('should throw an error if height is null', (done) => {
        Breed.create({
          ...breed,
          height: null
        })
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
      it('should work when its a valid height', () => {
        Breed.create(breed);
      });
    });
  });
});
