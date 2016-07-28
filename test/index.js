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
    let testValidator;
    let validationResult;
    let localTestClass;
    describe('for all types', function () {
        it('VALIDATION ERROR: Should validate string content state (equal to xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Equals('base'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (equal to xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Equals(new String()), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass(new String());
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate nested types', function () {
            testValidator = new dist_1.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.NestedTestClass(true, false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(validationResult[i].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate nested types', function () {
            testValidator = new dist_1.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.NestedTestClass('text', 0);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(validationResult[i].message);
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate multi-nested types', function () {
            testValidator = new dist_1.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.MultiNestedTestClass('false', 0, false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(validationResult[i].message);
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate multi-nested types', function () {
            testValidator = new dist_1.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.MultiNestedTestClass(true, 'text', 1);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(validationResult[i].message);
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (Number)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', Number)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass('text');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (Number)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', Number)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(123);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (String)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (String)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass('test');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (Boolean)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', Boolean)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(123);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (Boolean)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', Boolean)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (any(superimposed))', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(Number), 
                __metadata('design:type', Object)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass('text');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (any(superimposed))', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(Boolean), 
                __metadata('design:type', Object)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
    });
    describe('for string type', function () {
        it('VALIDATION ERROR: Should validate format (Decimal)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDecimal(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass('test');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Decimal)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDecimal(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(123.45);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate format (Float)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsFloat(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass('1234.5');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Float)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsFloat(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(123.45);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate format (Integer)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsInt(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(543.21);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Integer)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsInt(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new TestClass(100);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string length (maximum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MaxLen(5), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string length (maximum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MaxLen(35), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string length (minimum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MinLen(26), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string length (minimum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MinLen(5), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string byte length (maximum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MaxByteLen(7), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string byte length (maximum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MaxByteLen(32), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string byte length (minimum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MinLen(26), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string byte length (minimum)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MinLen(4), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string date mm-dd-yyyy', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDate(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string date mm-dd-(yy)yy or mm.dd.(yy)yy', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDate(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('07-27-16');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string date (ISO8601)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ISO8601Date(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('24-12-2015');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string date (ISO8601)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ISO8601Date(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('2015-12-24');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is an email address', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsEmail(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('blablub.wruff');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is a valid email address', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsEmail(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('info@inspirationlabs.com');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is an IP address', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsIP(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('256.256.256.1');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is an IP address', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsIP(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('127.0.0.1');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is a MAC address', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsMAC(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('0123.4567.89ab');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is a MAC address', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsMAC(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('01:23:45:67:89:AB');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is a hex color', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.HexColor(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('gh:ab:11');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is a hex color', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.HexColor(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('FCFCFC');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is hexadecimal', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Hexadecimal(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('ghab11');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is hexadecimal', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Hexadecimal(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('fcfcfc');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is a MongoDB ObjectID', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Hexadecimal(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('nonononotanobjectidatall');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is a MongoDB ObjectID', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Hexadecimal(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('507f191e810c19729de860ea');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.DateBefore('07.01.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('08.15.16');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.DateBefore('07.02.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('06-12-2016');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string dates after mm-dd-yyyy', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.DateAfter('01.07.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('01.07.2016');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string dates after mm-dd-yyyy', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.DateAfter('01.07.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('01.08.2016');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate uppercase strings', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Uppercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate uppercase strings', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Uppercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('UPPERCASE');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate lowercase strings', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Lowercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('Totally NOT lowercase');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate lowercase strings', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Lowercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('just lowercase');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('aircraft carrier');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass(null);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (contains xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Contains('base'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (contains xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Contains('base'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('amino acid base pairs');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.InArray(['one', 'two', 'three']), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.InArray(['one', 'two', 'three']), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('two');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (not in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.NotInArray(['one', 'two', 'three']), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('three');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (not in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.NotInArray(['one', 'two', 'three']), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('amino acid base pairs');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string metadata (alphanumeric)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.AlphaNumeric(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('This is a full sentence with PUNCTUATION.');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string metadata (alphanumeric)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.AlphaNumeric(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('No punctuation here');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string metadata (alpha)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Alpha(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('h3r3 b3 m0n573r5');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string metadata (alpha)', function () {
            testValidator = new dist_1.Validator();
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Alpha(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new stringTestClass('here be monsters');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
    });
    describe('for number type', function () {
        it('VALIDATION ERROR: Should validate number metadata (maximum length)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MaxLen(1), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (maximum length)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MaxLen(1), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(9);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (minimum length)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MinLen(3), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (minimum length)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MinLen(3), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(125);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (maximum value)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MaxValue(5), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (maximum value)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MaxValue(5), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(5);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (minimum value)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MinValue(12), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (minimum value)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MinValue(12), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (contains xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Contains(2), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (contains xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.Contains(2), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(undefined);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(101);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.InArray([1, 2, 3, 4, 5]), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(9);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.InArray([1, 2, 3, 4, 5]), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(3);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (multiple of xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MultipleOf(4), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (multiple of xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.MultipleOf(4), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
    });
    describe('for string type', function () {
        it('VALIDATION ERROR: Should validate boolean metadata (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.InArray([true]), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate boolean metadata (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.InArray([true]), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(undefined);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate boolean content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate boolean content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate boolean content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsNotEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 1) {
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
    });
});
