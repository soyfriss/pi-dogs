const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const httpStatusCodes = require('../../src/utils/http-status-codes.js');

const agent = session(app);

describe('GET invalid path /superdogs', async () => {
    it('should get 404', async () => {
        const res = await agent.get('/superdogs');
        expect(res.statusCode).to.equal(httpStatusCodes.NOT_FOUND);
        expect(res.error.text).to.equal('invalid path');
    });
});
