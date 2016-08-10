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
const V = require('../dist');
should();
describe('validator', function () {
    let testValidator;
    let validationResult;
    let localTestClass;
    let indent = '       ';
    describe('for all types', function () {
        it('VALIDATION ERROR: Should validate string content state (equal to xyz)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Equals('base'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (equal to xyz)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Equals(new String()), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass(new String());
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate nested types', function () {
            testValidator = new V.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.NestedTestClass(true, false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(indent + validationResult[i].message);
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate nested types', function () {
            testValidator = new V.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.NestedTestClass('text', 0);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(indent + validationResult[i].message);
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate multi-nested types', function () {
            testValidator = new V.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.MultiNestedTestClass('false', 0, false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(indent + validationResult[i].message);
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate multi-nested types', function () {
            testValidator = new V.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.MultiNestedTestClass(true, 'text', 1);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                for (let i in validationResult)
                    console.log(indent + validationResult[i].message);
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (Number)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(), 
                __metadata('design:type', Number)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass('text');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (Number)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(), 
                __metadata('design:type', Number)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(123);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (String)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (String)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass('test');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (Boolean)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(), 
                __metadata('design:type', Boolean)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(123);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (Boolean)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(), 
                __metadata('design:type', Boolean)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (any(superimposed))', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(Number), 
                __metadata('design:type', Object)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass('text');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (any(superimposed))', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(Boolean), 
                __metadata('design:type', Object)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
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
                V.IsDecimal(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass('test');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Decimal)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDecimal(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(123.45);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate format (Float)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsFloat(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass('1234.5');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Float)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsFloat(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(123.45);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate format (Integer)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsInt(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(543.21);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Integer)', function () {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsInt(), 
                __metadata('design:type', String)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass(100);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string length (maximum)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxLen(5), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string length (maximum)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxLen(35), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string length (minimum)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(26), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string length (minimum)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(5), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string byte length (maximum)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxByteLen(7), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string byte length (maximum)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxByteLen(32), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string byte length (minimum)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(26), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string byte length (minimum)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(4), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string date mm-dd-yyyy', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDate(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string date mm-dd-(yy)yy or mm.dd.(yy)yy', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDate(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('07-27-16');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string date (ISO8601)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ISO8601Date(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('24-12-2015');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string date (ISO8601)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ISO8601Date(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('2015-12-24');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is an email address', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmail(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('blablub.wruff');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is a valid email address', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmail(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('info@inspirationlabs.com');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is an IP address', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsIP(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('256.256.256.1');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is an IP address', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsIP(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('127.0.0.1');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is a MAC address', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsMAC(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('0123.4567.89ab');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is a MAC address', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsMAC(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('01:23:45:67:89:AB');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is a hex color', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.HexColor(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('gh:ab:11');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is a hex color', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.HexColor(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('FCFCFC');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is hexadecimal', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Hexadecimal(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('ghab11');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is hexadecimal', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Hexadecimal(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('fcfcfc');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate whether string is a MongoDB ObjectID', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MongoID(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('nonononotanobjectidatall');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate whether string is a MongoDB ObjectID', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MongoID(), 
                __metadata('design:type', Object)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('507f191e810c19729de860ea');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.DateBefore('07.01.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('08.15.16');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.DateBefore('07.02.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('06-12-2016');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string dates after mm-dd-yyyy', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.DateAfter('01.07.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('01.07.2016');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string dates after mm-dd-yyyy', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.DateAfter('01.07.2016'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('01.08.2016');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate uppercase strings', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Uppercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate uppercase strings', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Uppercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('UPPERCASE');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate lowercase strings', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Lowercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('Totally NOT lowercase');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate lowercase strings', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Lowercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('just lowercase');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (empty)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (empty)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (filled)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (filled)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('aircraft carrier');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (defined)', function () {
            class stringTestClass1 {
            }
            __decorate([
                V.IsDefined(), 
                __metadata('design:type', String)
            ], stringTestClass1.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass1();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
            class stringTestClass2 {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(), 
                __metadata('design:type', String)
            ], stringTestClass2.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass2();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (defined)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass(null);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (contains xyz)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains('base'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (contains xyz)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains('base'), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('amino acid base pairs');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (in array xyz)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray(['one', 'two', 'three']), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (in array xyz)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray(['one', 'two', 'three']), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('two');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string content state (not in array xyz)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.NotInArray(['one', 'two', 'three']), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('three');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string content state (not in array xyz)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.NotInArray(['one', 'two', 'three']), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('amino acid base pairs');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string metadata (alphanumeric)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.AlphaNumeric(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('This is a full sentence with PUNCTUATION.');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string metadata (alphanumeric)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.AlphaNumeric(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('No punctuation here');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate string metadata (alpha)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Alpha(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('h3r3 b3 m0n573r5');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate string metadata (alpha)', function () {
            class stringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Alpha(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new stringTestClass('here be monsters');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
    });
    describe('for number type', function () {
        it('VALIDATION ERROR: Should validate number metadata (maximum length)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxLen(1), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (maximum length)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxLen(1), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(9);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (minimum length)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(3), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (minimum length)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(3), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(125);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (maximum value)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxValue(5), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (maximum value)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxValue(5), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(5);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (minimum value)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinValue(12), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (minimum value)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinValue(12), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (contains xyz)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains(2), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (contains xyz)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains(2), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (empty)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (empty)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (filled)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (filled)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (defined)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(undefined);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (defined)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(101);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (in array xyz)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([1, 2, 3, 4, 5]), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(9);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number content state (in array xyz)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([1, 2, 3, 4, 5]), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(3);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (multiple of xyz)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MultipleOf(4), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate number metadata (multiple of xyz)', function () {
            class numberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MultipleOf(4), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new numberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
    });
    describe('for string type', function () {
        it('VALIDATION ERROR: Should validate boolean metadata (in array xyz)', function () {
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([true]), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new booleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate boolean metadata (in array xyz)', function () {
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([true]), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean content state (defined)', function () {
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new booleanTestClass(undefined);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate boolean content state (defined)', function () {
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new booleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean content state (empty)', function () {
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate boolean content state (empty)', function () {
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new booleanTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean content state (filled)', function () {
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new booleanTestClass();
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate boolean content state (filled)', function () {
            class booleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new booleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            should.equal(validationResult, 0);
            validationResult = [];
        });
    });
});
