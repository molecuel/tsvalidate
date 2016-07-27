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
const dist_1 = require('../dist');
const D = require('../dist/decorators');
should();
describe('validator', function () {
    describe('module', function () {
        let testValidator;
        let validationResult;
        let localTestClass;
        it('VALIDATION ERROR: Should validate types (Number)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', Number)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass('text');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (Number)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', Number)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(123);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (String)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (String)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass('test');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (Boolean)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', Boolean)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(123);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (Boolean)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(), 
                __metadata('design:type', Boolean)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate types (any(superimposed))', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(Number), 
                __metadata('design:type', Object)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass('text');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate types (any(superimposed))', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.ValidateType(Boolean), 
                __metadata('design:type', Object)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate format (Decimal)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDecimal(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass('test');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Decimal)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsDecimal(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(123.45);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate format (Float)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsFloat(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass('1234.5');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Float)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsFloat(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(123.45);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length === 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate format (Integer)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsInt(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(543.21);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION OKAY: Should validate format (Integer)', function () {
            class OuterTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                D.IsInt(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new OuterTestClass(100);
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
            localTestClass = new stringTestClass('desoxyribonucleic acid');
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
            localTestClass = new stringTestClass('desoxyribonucleic acid');
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
            localTestClass = new stringTestClass('03.02.16');
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
            localTestClass = new stringTestClass('08-01-2016');
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
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
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
            (validationResult.length > 0).should.be.ok();
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
            localTestClass = new stringTestClass('desoxyribonucleic acid');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
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
            localTestClass = new stringTestClass('desoxyribonucleic acid');
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
            localTestClass = new stringTestClass('desoxyribonucleic acid');
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
            localTestClass = new stringTestClass('This is a full sentence with PUNCTUATION.');
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (maximum length)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
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
        it('VALIDATION ERROR: Should validate number metadata (minimum length)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
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
        it('VALIDATION ERROR: Should validate number metadata (maximum value)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
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
        it('VALIDATION ERROR: Should validate number metadata (minimum value)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
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
        it('VALIDATION ERROR: Should validate number content state (contains xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
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
        it('VALIDATION ERROR: Should validate number content state (equals xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.Equals(2), 
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
        it('VALIDATION ERROR: Should validate number content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
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
        it('VALIDATION ERROR: Should validate number content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
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
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
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
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number content state (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.InArray(['one', 'two', 'three']), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new numberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate number metadata (multiple of xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.MultipleOf(3), 
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
        it('VALIDATION ERROR: Should validate number metadata (equals xyz)', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testProp = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                }
            }
            __decorate([
                D.Equals(2), 
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
        it('VALIDATION ERROR: Should validate boolean metadata (equals xyz)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testProp = _bool;
                    this.definedTestBool = undefined;
                }
            }
            __decorate([
                D.Equals(2), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean metadata (in array xyz)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testProp = _bool;
                    this.definedTestBool = undefined;
                }
            }
            __decorate([
                D.InArray(['one', 'two', 'three']), 
                __metadata('design:type', Boolean)
            ], booleanTestClass.prototype, "testProp", void 0);
            testValidator = new dist_1.Validator();
            localTestClass = new booleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean content state (defined)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testProp = _bool;
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
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
        it('VALIDATION ERROR: Should validate boolean content state (empty)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testProp = _bool;
                    this.definedTestBool = undefined;
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
        it('VALIDATION ERROR: Should validate boolean content state (filled)', function () {
            testValidator = new dist_1.Validator();
            class booleanTestClass {
                constructor(_bool = false) {
                    this.testProp = _bool;
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
                console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
            }
            else if (validationResult.length > 0) {
                console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
            }
            (validationResult.length > 0).should.be.ok();
            validationResult = [];
        });
    });
});
