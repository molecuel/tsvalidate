'use strict';
require('reflect-metadata');
const should = require('should');
const TestClass_1 = require('./classes/TestClass');
const dist_1 = require('../dist');
describe('validator', function () {
    describe('module', function () {
        it('should create validation errors - validating lengths', function () {
            let localTestClass = new TestClass_1.TestClass('desoxyribonucleic acid');
            let testValidator = new dist_1.Validator();
            let errors = testValidator.validate(localTestClass);
            should.exist(errors);
        });
        it('should be valid - validating lengths', function () {
            let localTestClass = new TestClass_1.TestClass('deleic');
            let testValidator = new dist_1.Validator();
            let errors = testValidator.validate(localTestClass);
            should.not.exist(errors);
        });
    });
});
