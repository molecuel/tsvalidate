'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('reflect-metadata');
const should = require('should');
const TestClass_1 = require('./classes/TestClass');
const dist_1 = require('../dist');
const D = require('../dist/decorators');
should();
describe('validator', function () {
    describe('module', function () {
        let testValidator;
        let validationResult;
        let localTestClass;
        it('Should validate types (Decimal)', function () {
            class OuterTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                }
            }
            __decorate([
                D.IsDecimal(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate types (Float)', function () {
            class OuterTestClass {
                constructor(_bool = true) {
                    this.testBool = _bool;
                }
            }
            __decorate([
                D.IsFloat(), 
                __metadata('design:type', Boolean)
            ], OuterTestClass.prototype, "testBool", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate types (Integer)', function () {
            class OuterTestClass {
                constructor(_number = 1.4) {
                    this.testNumber = _number;
                }
            }
            __decorate([
                D.IsInt(), 
                __metadata('design:type', Number)
            ], OuterTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate nested types', function () {
            testValidator = new dist_1.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.CustomTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(validationResult[i].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        console.log('\n');
        it('Should validate multi-nested types', function () {
            testValidator = new dist_1.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.OuterContainerClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(validationResult[i].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        console.log('\n');
        it('Should validate string length (maximum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.MaxLen(5), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string length (minimum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.MinLen(26), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string byte length (maximum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.MaxByteLen(7), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string byte length (minimum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.MinLen(26), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string date', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.IsDate(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string date (ISO8601)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.ISO8601Date(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string dates prior to xx-yy-zzzz', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.DateBefore('07.01.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string dates after xx-yy-zzzz', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.DateAfter('01.07.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate uppercase strings', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.Uppercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate lowercase strings', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.Lowercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "lowercaseTestString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "notEmptyTestString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message);
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "definedTestString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message);
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string content state (equal to xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.Equals('base'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string content state (contains xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.Contains('base'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string content state (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.InArray([]), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string metadata (alphanumeric)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.AlphaNumeric(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('This is a full sentence with PUNCTUATION.');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate string metadata (alpha)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(_string = 'new') {
                    this.testString = _string;
                    this.lowercaseTestString = 'LOWERCASE';
                    this.notEmptyTestString = '';
                    this.definedTestString = undefined;
                }
            }
            __decorate([
                D.Alpha(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('This is a full sentence with PUNCTUATION.');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        console.log('\n');
        it('Should validate number metadata (maximum length)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.MaxLen(1), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number metadata (minimum length)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.MinLen(3), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number metadata (maximum value)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.MaxValue(5), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number metadata (minimum value)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.MinValue(12), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number content state (contains xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.Contains(2), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number content state (equals xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.Equals(2), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "definedTestNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message);
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "definedTestNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message);
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number content state (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.InArray([]), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number metadata (multiple of xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.MultipleOf(3), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate number metadata (equals xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.Equals(2), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        console.log('\n');
        it('Should validate boolean metadata (equals xyz)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testBool = _bool;
                    this.definedTestBool = undefined;
                }
            }
            __decorate([
                D.Equals(2), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testBool", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate boolean metadata (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testBool = _bool;
                    this.definedTestBool = undefined;
                }
            }
            __decorate([
                D.InArray([]), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testBool", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate boolean content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testBool = _bool;
                    this.definedTestBool = undefined;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "definedTestBool", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message);
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate boolean content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testBool = _bool;
                    this.definedTestBool = undefined;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testBool", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message);
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate boolean content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testBool = _bool;
                    this.definedTestBool = null;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "definedTestBool", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message);
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('Should validate types (Boolean)', function () {
            class OuterTestClass {
                constructor(_number) {
                    this.testNumber = _number;
                }
            }
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
    });
});
