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
  'uppercase-alpha-numeric': ['uppercase', 'numbers'],
  'uppercase-lowsercase': ['uppercase', 'lowercase'],
  'uppercase-emoj': ['uppercase', 'emoj']
}

const models = {
  'email': [
    { 'lowercase-alpha-numeric': 10 }, // start with generating 10 characters from the predefined lowercase-alpha-numeric' combination
    '@gmail.com', //end with string '@gmail.com'
  ],
  'mobile': [
    '0',  //start with string '0'
    ['10','15','11','12'], //then take random from given array of strings ['10','15','11']
    {'numbers': 8 }, //end with 8 characters from the predefined 'numbers' combination
  ],
  'name': [
    { 'uppercase': 1 },
    { 'lowercase': 4 }, // start with generating 10 characters from the predefined lowercase-alpha-numeric' combination
    ' ', //end with string '@gmail.com'
    { 'lowercase': 5 }, // start with generating 10 characters from the predefined lowercase-alpha-numeric' combination
  ],
  'paragraph': [
    { 'uppercase': 1 },
    { 'lowercase': 50 },
    '.',
  ],
  'emoj': [
    ['happy :)', 'sad :('],
  ]
}

//
let juice = new Juice(sets, combos, models);

describe('Juice', function() {
  describe('#generate', function() {
    it('should return lowercase length 6', function(done) {
      let text = juice.generate('lowercase',6);
      debug(text);
      expect(text).to.match(/^[a-z]{6}$/);
      done();
    });
    it('should return uppercase length 6', function(done) {
      let text = juice.generate('uppercase',6);
      debug(text);
      expect(text).to.match(/^[A-Z]{6}$/);
      done();
    });
    it('should return alpha numeric length 3', function(done) {
      let text = juice.generate('alpha-numeric',3);
      debug(text);
      expect(text).to.match(/^(?=.*\d).{3}$/);
      done();
    });
    it('should return complex length 4', function(done) {
      let text = juice.generate('complex',4);
      debug(text);
      expect(text).to.match(/^(?=.*\d).{4}$/);
      done();
    });
    it('should return lowercase-alpha-numeric length 6', function(done) {
      let text = juice.generate('lowercase-alpha-numeric',6);
      debug(text);
      expect(text).to.match(/^[a-z0-9]{6}$/);
      done();
    });
    it('should return uppercase-alpha-numeric length 6', function(done) {
      let text = juice.generate('uppercase-alpha-numeric',6);
      debug(text);
      expect(text).to.match(/^[A-Z0-9]{6}$/);
      done();
    });
    it('should return uppercase-lowercase length 6', function(done) {
      let text = juice.generate('uppercase-lowsercase',6);
      debug(text);
      expect(text).to.match(/^[A-Za-z]{6}$/);
      done();
    });
    it('should return error', function(done) {
      let text = juice.generate('upper',6);
      debug(text);
      expect(text).to.match(/^[A-Za-z]{6}$/);
      done();
    });
  });
});


describe('Juice', function() {
  describe('#model', function() {
    it('should return "email of length 10@gmail"', function(done) {
      let text = juice.model('email');
      debug(text);
      expect(text).to.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      done();
    });
    it('should return mobile number of length 11 dig. starts with 01(0-2)', function(done) {
      let text = juice.model('mobile');
      debug(text);
      expect(text).to.match(/^01[0-5]{1}[0-9]{8}$/);
      done();
    });
    it('should return first name and last name', function(done) {
      let text = juice.model('name');
      debug(text);
      expect(text).to.match(/^[A-Z]{1}[a-z]{4}[ ]{1}[a-z]{5}$/);
      done();
    });
    it('should return paragraph', function(done) {
      let text = juice.model('paragraph');
      debug(text);
      expect(text).to.match(/^[A-Z]{1}[a-z]{50}[.]$/);
      done();
    });
    it('should return desc.+emoj', function(done) {
      let text = juice.model('emoj');
      debug(text);
      expect(text).to.match(/^[a-z:(:)]/);
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
