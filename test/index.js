const debug  = require('debug')('qantra:juice:test');
const Juice  = require('../juice');
const assert = require('assert');
const expect = require('expect.js');

const sets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  special: '@%+!#$?:~'
}

const combos = {
  'lowercase': ['lowercase'],
  'uppercase': ['uppercase'],
  'numbers': ['numbers'],
  'alpha-numeric': ['lowercase','uppercase','numbers'],
  'complex': ['lowercase','uppercase','numbers','special'],
  'lowercase-alpha-numeric': ['lowercase', 'numbers'],
  'uppercase-alpha-numeric': ['uppercase', 'numbers']
}

const models = {
  'email': [
    { 'lowercase-alpha-numeric': 10 }, // start with generating 10 characters from the predefined lowercase-alpha-numeric' combination
    '@gmail.com', //end with string '@gmail.com'
  ],
  'mobile': [
    '0',  //start with string '0'
    ['10','15','11'], //then take random from given array of strings ['10','15','11']
    {'numbers': 8 }, //end with 8 characters from the predefined 'numbers' combination
  ]
}

//
let juice = new Juice(sets, combos, models);

describe('Juice', function() {
  describe('#generate', function() {
    it('should return lowercase length 12', function(done) {
      let text = juice.generate('lowercase',12);
      debug(text);
      expect(text).to.match(/^[a-z]{12}$/);
      done();
    });
    it('should return uppercase length 12', function(done) {
      let text = juice.generate('uppercase',12);
      debug(text);
      expect(text).to.match(/^[A-Z]{12}$/);
      done();
    });
    it('should return alpha numeric length 5', function(done) {
      let text = juice.generate('alpha-numeric',5);
      debug(text);
      expect(text).to.match(/^[a-zA-Z0-9]{5}$/);
      done();
    });
  });
});
