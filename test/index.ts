'use strict'
import 'reflect-metadata';
import should = require('should');
import assert = require('assert');
import { TestClass } from './classes/TestClass';
import { Validator } from '../dist';


describe('validator', function() {
  describe('module', function() {

    it('should create validation errors - validating lengths', function() {
      let localTestClass = new TestClass('desoxyribonucleic acid');
      let testValidator = new Validator();
      let errors = testValidator.validate(localTestClass);
      should.exist(errors);
    });

    it('should be valid - validating lengths', function() {
      let localTestClass = new TestClass('deleic');
      let testValidator = new Validator();
      let errors = testValidator.validate(localTestClass);
      should.not.exist(errors);
    });

  });
})
