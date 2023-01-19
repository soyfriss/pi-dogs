const { assert } = require('chai');

let a = 0;
before(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            a = 1;
            resolve();
        }, 200);
    });
});
it('a should be set to 1', () => {
    assert(a === 1);
});