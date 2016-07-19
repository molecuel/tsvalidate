'use strict';
require('reflect-metadata');
const dist_1 = require('../dist');
describe('validator', function () {
    describe('module', function () {
        let testValidator;
        let localTestClass;
        it('should validate lengths', function () {
            localTestClass = new dist_1.TestClass('desoxyribonucleic acid');
            testValidator = new dist_1.Validator();
            testValidator.validate(localTestClass);
        });
    });
});
