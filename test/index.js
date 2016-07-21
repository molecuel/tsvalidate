'use strict';
require('reflect-metadata');
const TestClass_1 = require('./classes/TestClass');
const dist_1 = require('../dist');
describe('validator', function () {
    describe('module', function () {
        let testValidator;
        let localTestClass;
        it('should validate stuff', function () {
            localTestClass = new TestClass_1.TestClass('desoxyribonucleic acid');
            testValidator = new dist_1.Validator();
            console.log(testValidator.validate(localTestClass));
        });
    });
});
