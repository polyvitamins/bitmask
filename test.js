var should = require('should');
var bittag = require('./index.js');
describe('Main', function() {
  describe('set get', function () {
  	var test = function() { }.bit.set(2 | 4 | 12);
  	test.bit.inc(6); // Include 6
  	test.bit.exc(12); // Exclude 7
    it('get must return same value as was in set', function () {
      should(test.bit.test(2)).be.ok;
      should(test.bit.test(4 | 6)).be.ok;
      should(test.bit.test(2 ^ 12)).be.ok;
      should(test.bit.test(12)).be.not.ok;
      should(test.bit.is(4)).be.not.ok;
      should(test.bit.is(2 | 4 | 12)).be.ok;
      should(test.bit.is(2 | 4 | 12)).be.ok;
      should(test.bit.is(2 | 4 | 12)).be.not.ok;
      test.bit.reset();
      should(test.bit.test(2)).be.not.ok;
      test.bit.reverse();
      should(test.bit.test(2)).be.ok;
    });
  });
});