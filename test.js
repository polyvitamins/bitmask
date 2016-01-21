var should = require('should');
var bit = require('./index.js');
describe('Main', function() {
  bit.define('TEST_ONE', 1);
  bit.define('TEST_TWO', 2);
  bit.define('TEST_THREE', 3);
  bit.define('TEST_FOUR', 4);
  bit.define('TEST_FIVE', 4);

  describe('basic manipulations', function () {
    it ('constants defines', function() { 
      bit.define('TEST_ONE', 1);
      bit.define('TEST_TWO', 2);
      bit.define('TEST_THREE', 3);
      bit.define('TEST_FOUR', 4);
      bit.define('TEST_FIVE', 5);
      should(TEST_ONE).be.exactly(2); 
    });
    it ('local constant', function() { should(bit.create(1)).be.exactly(2); });
    it ('mix constants', function() { 
      var mixall = bit.join(TEST_ONE, TEST_TWO, TEST_THREE, TEST_FOUR, TEST_FIVE);
      should(mixall).be.exactly(62); 
    });
    it ('mix from array', function() { 
      var mixall = bit.join([TEST_ONE, TEST_TWO, TEST_THREE, TEST_FOUR], TEST_FIVE);
      should(mixall).be.exactly(62); 
    });
  });

  describe('bit object api', function() {
    it ('object created', function() {
      should(bit(TEST_ONE) instanceof bit).be.ok;
    });
    it ('object testing', function() {
      should(bit(TEST_ONE).test(TEST_ONE) instanceof bit).be.ok;
      should(bit(TEST_ONE).test(TEST_TWO) instanceof bit).be.not.ok;
    });
    
    it ('object add', function() {
      var test = bit(TEST_ONE).add(TEST_TWO).test(TEST_ONE, TEST_TWO);
      should(test).be.ok;
    });
    it ('object testing array', function() {
      var test = bit(TEST_ONE).add(TEST_TWO).test([TEST_ONE, TEST_TWO]);
      should(test).be.ok;
    });

    it ('object exclude', function() {
      var test = bit(TEST_ONE | TEST_TWO | TEST_THREE).exclude(TEST_TWO);
      should(test.test(TEST_TWO)).be.not.ok;
      should(test.test(TEST_THREE)).be.ok;
      should(test.test(TEST_ONE, TEST_THREE)).be.ok;
      should(test.test(TEST_ONE | TEST_THREE)).be.ok;
    });

    it ('create a bit with array of bitmasks', function() {
      should(bit([TEST_ONE, TEST_TWO]).test(TEST_ONE | TEST_TWO)).be.ok;
    });

    it ('create a bit with multiple arguments', function() {
      should(bit(TEST_ONE, TEST_TWO).test(TEST_ONE | TEST_TWO)).be.ok;
    });

    it ('inverse', function() {
      should(bit(TEST_ONE, TEST_TWO).inverse().test(TEST_ONE | TEST_TWO)).be.not.ok;
    });

    it ('reset', function() {
      should(bit(TEST_ONE, TEST_TWO).reset().test(TEST_ONE | TEST_TWO)).be.not.ok;
    });

    it ('have', function() {
      should(bit(TEST_ONE, TEST_TWO).have(TEST_FIVE)).be.not.ok;
    });

    it ('havent', function() {
      should(bit(TEST_ONE, TEST_TWO).havent(TEST_FIVE)).be.ok;
    });
});

describe('local mode & functions', function () {
    var test = bit(function() { }).set(TEST_ONE | TEST_THREE);
    it ('test is a function', function() { should(test).be.a.Function(); });
    test.bit.inc(TEST_TWO); // Include 6
    test.bit.exc(TEST_FOUR); // Exclude 7
    it('test in 2', function () { should(test.bit.test(TEST_ONE)).be.ok; });
  });

  describe('global mode & functions', function () {
    
    bit.globalize(); // Make it global

  	var test = function() { }.bit.set(TEST_ONE | TEST_THREE);
    it ('test is a function', function() { should(test).be.a.Function(); });
  	test.bit.inc(TEST_TWO); // Include 6
  	test.bit.exc(TEST_FOUR); // Exclude 7
    it('test in 2', function () { should(test.bit.test(TEST_ONE)).be.ok; });
    it('test in  4 | 6', function () { should(test.bit.test(TEST_TWO | TEST_THREE)).be.ok; });
    it('test in  2 ^ 12', function () { should(test.bit.test(TEST_ONE ^ TEST_FOUR)).be.ok; });
    it('test out 12', function () { should(test.bit.havent(TEST_FOUR)).be.ok; });
    it('test in 32', function () { should(test.bit.test(TEST_FIVE)).be.not.ok; });
    it('is 4', function () { should(test.bit.is(4)).be.not.ok; });
    it('is 2 | 4 | 12', function () { should(test.bit.is(TEST_ONE | TEST_TWO | TEST_THREE)).be.ok; });
    it('not 2 | 4 | 12', function () { should(test.bit.not(TEST_ONE | TEST_TWO | TEST_THREE)).be.not.ok; });
    test.bit.reset();
    it('test 2 after reset', function () { should(test.bit.test(TEST_ONE)).be.not.ok; });
    test.bit.inverse();
    it('test 2 after inverse', function () { should(test.bit.test(TEST_ONE)).be.ok; });
  });
});