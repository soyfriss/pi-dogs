const { Temperament, conn } = require('../../src/db.js');

describe('Temperament model', () => {
  before(() => conn.authenticate()
    .then(() => Temperament.sync({ force: true }))
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  describe('name', () => {
    it('should throw an error if name is null', (done) => {
      Temperament.create({})
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
    });
    it('should work when its a valid name', () => {
      Temperament.create({ name: 'Friendly' });
    });
  });
  describe('unique name', () => {
    it('should throw an error if name is not unique', (done) => {
      Temperament.create({ name: 'Friendly' })
        .then(() => Temperament.create({ name: 'Friendly' }))
        .then(() => done(new Error('It requires a unique name')))
        .catch(() => done());
    });
    it('should work when its a unique name', () => {
      Temperament.create({ name: 'Happy' })
        .then(() => Temperament.create({ name: 'Happy' }));
    });
  });
});
