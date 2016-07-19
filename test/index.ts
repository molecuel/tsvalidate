'use strict'
import 'reflect-metadata';
import should = require('should');
import assert = require('assert');
import { TestClass, Validator, MinLen, MaxLen } from '../dist';

describe('validator', function() {
  describe('module', function() {
    let testValidator: Validator;
    let localTestClass: TestClass;

    it('should validate lengths', function() {

      localTestClass = new TestClass('desoxyribonucleic acid');
      testValidator = new Validator();
      testValidator.validate(localTestClass);
    })
  });
})
