'use strict'
import 'reflect-metadata';
import should = require('should');
import assert = require('assert');
import { TestClass } from './classes/TestClass';
import { Validator } from '../dist';


describe('validator', function() {
  describe('module', function() {
    let testValidator: Validator;
    let localTestClass: TestClass;

    it('should validate stuff', function() {

      localTestClass = new TestClass('desoxyribonucleic acid');
      testValidator = new Validator();
      console.log(testValidator.validate(localTestClass));
    })
  });
})
