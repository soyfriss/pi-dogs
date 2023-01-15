const { Breed, Temperament, BreedTemperament, conn } = require('../../src/db.js');

const breed = {
  name: 'Jack Russell Terrier',
  height: '1 - 1',
  weight: '1 - 1',
  lifeSpan: '1 - 1',
  image: ''
}

const temperament = {
  name: 'Friendly'
}

describe('BreedTemperament model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => conn.sync({ force: true }));

    it('should throw an error if temperament is invalid', (done) => {
      Breed.create(breed)
        .then(newBreed => {
          // console.log('breed created: ', newBreed.id);
          // return newBreed.addTemperament(1, { logging: console.log })
          return newBreed.addTemperament(1)
        })
        .then(() => done(new Error('It requires a valid temperament')))
        .catch(() => done());
    });
    it('should throw an error if breed is invalid', (done) => {
      Temperament.create(temperament)
        .then(newTemperament => {
          return newTemperament.addBreed(1)
        })
        .then(() => done(new Error('It requires a valid breed')))
        .catch(() => done());
    });
    it('should work when breed and temperament are valid', async () => {
      const newBreed = await Breed.create(breed);
      const newTemperament = await Temperament.create(temperament);
      await newBreed.addTemperament(newTemperament.id);
    });
  });
});
