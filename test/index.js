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
const TestClass_1 = require('./classes/TestClass');
const dist_1 = require('../dist');
const D = require('../dist/decorators');
describe('validator', function () {
    describe('module', function () {
        let testValidator;
        it('Should validate nested types', function () {
            testValidator = new dist_1.Validator();
            let localTestClass;
            localTestClass = new TestClass_1.CustomTestClass();
            console.log(testValidator.validate(localTestClass));
        });
        it('Should validate types', function () {
            class OuterTestClass {
                constructor(_number = 0, _bool = true, _string = 'new') {
                    this.testNumber = _number;
                    this.testBool = _bool;
                    this.testString = _string;
                }
            }
            __decorate([
                D.IsBoolean(), 
                __metadata('design:type', Number)
            ], OuterTestClass.prototype, "testNumber", void 0);
            __decorate([
                D.IsString(), 
                __metadata('design:type', Boolean)
            ], OuterTestClass.prototype, "testBool", void 0);
            __decorate([
                D.IsNumber(), 
                __metadata('design:type', String)
            ], OuterTestClass.prototype, "testString", void 0);
            testValidator = new dist_1.Validator();
            let localTestClass = new OuterTestClass();
            console.log(testValidator.validate(localTestClass));
        });
        it('Should validate string metadata', function () {
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
                D.MinLen(26),
                D.MaxByteLen(7),
                D.MinByteLen(28),
                D.DateAfter('01.07.2016'),
                D.DateBefore('07.01.2016'),
                D.IsDate(),
                D.ISO8601Date(),
                D.Uppercase(),
                D.IsEmpty(),
                D.Equals('base'),
                D.Contains('base'),
                D.Matching('base'),
                D.InArray([]), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "testString", void 0);
            __decorate([
                D.Lowercase(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "lowercaseTestString", void 0);
            __decorate([
                D.IsNotEmpty(),
                D.IsDefined(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "notEmptyTestString", void 0);
            __decorate([
                D.IsDefined(), 
                __metadata('design:type', String)
            ], stringTestClass.prototype, "definedTestString", void 0);
            testValidator = new dist_1.Validator();
            let localTestClass = new stringTestClass('desoxyribonucleic acid');
            console.log(testValidator.validate(localTestClass));
        });
        it('Should validate number metadata', function () {
            testValidator = new dist_1.Validator();
            class numberTestClass {
                constructor(_number = 0) {
                    this.testNumber = _number;
                    this.decimalTestNumber = 1.2;
                    this.definedTestNumber = undefined;
                    this.phoneNumber = 4963271536;
                }
            }
            __decorate([
                D.MaxValue(5), 
                __metadata('design:type', Number)
            ], numberTestClass.prototype, "testNumber", void 0);
            testValidator = new dist_1.Validator();
            let localTestClass = new numberTestClass(10);
            console.log(testValidator.validate(localTestClass));
        });
    });
});
