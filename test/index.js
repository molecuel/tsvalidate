"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const should = require("should");
const V = require("../dist");
const TestClass_1 = require("./classes/TestClass");
describe("validator", () => {
    let testValidator;
    let validationResult;
    let localTestClass;
    const indent = "       ";
    describe("for all types", () => {
        class TestClassNumberProp {
            constructor(value) {
                this.testProp = value;
            }
        }
        __decorate([
            V.ValidateType(),
            __metadata("design:type", Number)
        ], TestClassNumberProp.prototype, "testProp", void 0);
        class TestClass1 {
        }
        __decorate([
            V.IsDefined(),
            __metadata("design:type", Object)
        ], TestClass1.prototype, "testProp", void 0);
        class TestClass2 {
            constructor(value) {
                this.testProp = value;
            }
        }
        __decorate([
            V.IsDefined(),
            __metadata("design:type", Object)
        ], TestClass2.prototype, "testProp", void 0);
        class StringTestClass {
            constructor(value) {
                this.testProp = value;
            }
        }
        __decorate([
            V.IsDefined(),
            __metadata("design:type", Object)
        ], StringTestClass.prototype, "testProp", void 0);
        class TestClassStringProp {
            constructor(value) {
                this.testProp = value;
            }
        }
        __decorate([
            V.ValidateType(),
            __metadata("design:type", String)
        ], TestClassStringProp.prototype, "testProp", void 0);
        class TestClassBoolProp {
            constructor(value) {
                this.testProp = value;
            }
        }
        __decorate([
            V.ValidateType(),
            __metadata("design:type", Boolean)
        ], TestClassBoolProp.prototype, "testProp", void 0);
        it("should NOT validate content state (defined)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClass1();
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
            testValidator = new V.Validator();
            localTestClass = new TestClass2();
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate content state (defined)", () => {
            testValidator = new V.Validator();
            localTestClass = new StringTestClass(null);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate any content state (equal to xyz)", () => {
            class TemporaryTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Equals("base"),
                __metadata("design:type", Object)
            ], TemporaryTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            if (validationResult.length > 0) {
                console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
            }
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate content state (equal to xyz)", () => {
            testValidator = new V.Validator();
            localTestClass = new StringTestClass("");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate nested types", () => {
            testValidator = new V.Validator();
            let localNestedTestClass;
            localNestedTestClass = new TestClass_1.NestedTestClass(true, false);
            validationResult = testValidator.validate(localNestedTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate nested types", () => {
            testValidator = new V.Validator();
            let localNestedTestClass;
            localNestedTestClass = new TestClass_1.NestedTestClass("text", 0);
            validationResult = testValidator.validate(localNestedTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate multi-nested types", () => {
            testValidator = new V.Validator();
            let localNestedTestClass;
            localNestedTestClass = new TestClass_1.MultiNestedTestClass("false", 0, false);
            validationResult = testValidator.validate(localNestedTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate multi-nested types", () => {
            testValidator = new V.Validator();
            let localNestedTestClass;
            localNestedTestClass = new TestClass_1.MultiNestedTestClass(true, "text", 1);
            validationResult = testValidator.validate(localNestedTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate types (Number)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassNumberProp("text");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate types (Number)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassNumberProp(123);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate types (String)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassStringProp(true);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate types (String)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassStringProp("test");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate types (Boolean)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassBoolProp(123);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate types (Boolean)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassBoolProp(false);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate types (any(superimposed))", () => {
            class TestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(Number),
                __metadata("design:type", Object)
            ], TestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TestClass("text");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate types (any(superimposed))", () => {
            class TemporaryTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(Boolean),
                __metadata("design:type", Object)
            ], TemporaryTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT remove all earlier applied decorators)", () => {
            class TemporaryTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsInt(),
                V.ClearValidators(),
                V.ValidateType(Number),
                __metadata("design:type", Object)
            ], TemporaryTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryTestClass("text");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should remove all earlier applied decorators)", () => {
            class TemporaryTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsInt(),
                V.ValidateType(Boolean),
                __metadata("design:type", Object)
            ], TemporaryTestClass.prototype, "testProp", void 0);
            class InheritingClass extends TemporaryTestClass {
            }
            __decorate([
                V.ClearValidators(),
                __metadata("design:type", Object)
            ], InheritingClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new InheritingClass("true");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
    });
    describe("for string type", () => {
        class TestClassDecimalProp {
            constructor(value) {
                this.testProp = value;
            }
        }
        __decorate([
            V.IsDecimal(),
            __metadata("design:type", String)
        ], TestClassDecimalProp.prototype, "testProp", void 0);
        class TestClassFloatProp {
            constructor(value) {
                this.testProp = value;
            }
        }
        __decorate([
            V.IsFloat(),
            __metadata("design:type", String)
        ], TestClassFloatProp.prototype, "testProp", void 0);
        class TestClassIntProp {
            constructor(value) {
                this.testProp = value;
            }
        }
        __decorate([
            V.IsInt(),
            __metadata("design:type", String)
        ], TestClassIntProp.prototype, "testProp", void 0);
        it("should NOT validate format (Decimal)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassDecimalProp("test");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate format (Decimal)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassDecimalProp(123.45);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate format (Float)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassFloatProp("string 1234.5");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate format (Float)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassFloatProp(123.45);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate format (Integer)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassIntProp(543.21);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate format (Integer)", () => {
            testValidator = new V.Validator();
            localTestClass = new TestClassIntProp(100);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string length (maximum)", () => {
            class StringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxLen(5),
                __metadata("design:type", String)
            ], StringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new StringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string length (maximum)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxLen(35),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string length (minimum)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(26),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string length (minimum)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(5),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string byte length (maximum)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxByteLen(7),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string byte length (maximum)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxByteLen(32),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string byte length (minimum)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(26),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string byte length (minimum)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(4),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string date mm-dd-yyyy", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDate(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string date mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDate(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("07-27-16");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string date (ISO8601)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ISO8601Date(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("24-12-2015");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string date (ISO8601)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ISO8601Date(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("2015-12-24");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate whether string is an email address", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmail(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("blablub.wruff");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate whether string is a valid email address", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmail(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("info@inspirationlabs.com");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate whether string is an IP address", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsIP(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("256.256.256.1");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate whether string is an IP address", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsIP(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("127.0.0.1");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate whether string is a MAC address", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsMAC(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("0123.4567.89ab");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate whether string is a MAC address", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsMAC(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("01:23:45:67:89:AB");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate whether string is a hex color", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.HexColor(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("gh:ab:11");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate whether string is a hex color", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.HexColor(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("FCFCFC");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate whether string is hexadecimal", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Hexadecimal(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("ghab11");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate whether string is hexadecimal", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Hexadecimal(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("fcfcfc");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate whether string is a MongoDB ObjectID", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MongoID(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("nonononotanobjectidatall");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate whether string is a MongoDB ObjectID", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MongoID(),
                __metadata("design:type", Object)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("507f191e810c19729de860ea");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.DateBefore("07.01.2016"),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("08.15.16");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.DateBefore("07.02.2016"),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("06-12-2016");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string dates after mm-dd-yyyy", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.DateAfter("01.07.2016"),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("01.07.2016");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string dates after mm-dd-yyyy", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.DateAfter("01.07.2016"),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("01.08.2016");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate uppercase strings", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Uppercase(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate uppercase strings", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Uppercase(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("UPPERCASE");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate lowercase strings", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Lowercase(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("Totally NOT lowercase");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate lowercase strings", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Lowercase(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("just lowercase");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string content state (empty)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string content state (empty)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string content state (filled)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass();
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string content state (filled)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("aircraft carrier");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string content state (contains xyz)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains("base"),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string content state (contains xyz)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains("base"),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("amino acid base pairs");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string content state (in array xyz)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray(["one", "two", "three"]),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string content state (in array xyz)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray(["one", "two", "three"]),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("two");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string content state (not in array xyz)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.NotInArray(["one", "two", "three"]),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("three");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string content state (not in array xyz)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.NotInArray(["one", "two", "three"]),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("amino acid base pairs");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string metadata (alphanumeric)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.AlphaNumeric(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("This is a full sentence with PUNCTUATION.");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string metadata (alphanumeric)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.AlphaNumeric(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("No punctuation here");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate string metadata (alpha)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Alpha(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("h3r3 b3 m0n573r5");
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate string metadata (alpha)", () => {
            class TemporaryStringTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Alpha(),
                __metadata("design:type", String)
            ], TemporaryStringTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new TemporaryStringTestClass("here be monsters");
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
    });
    describe("for number type", () => {
        it("should NOT validate number metadata (maximum length)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxLen(1),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number metadata (maximum length)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxLen(1),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(9);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number metadata (minimum length)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(3),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number metadata (minimum length)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinLen(3),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(125);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number metadata (maximum value)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxValue(5),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number metadata (maximum value)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MaxValue(5),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(5);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number metadata (minimum value)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinValue(12),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number metadata (minimum value)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MinValue(12),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number content state (contains xyz)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains(2),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number content state (contains xyz)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains(2),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number content state (empty)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number content state (empty)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass();
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number content state (filled)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass();
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number content state (filled)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number content state (defined)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(undefined);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number content state (defined)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(101);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number content state (in array xyz)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([1, 2, 3, 4, 5]),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(9);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number content state (in array xyz)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([1, 2, 3, 4, 5]),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(3);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate number metadata (multiple of xyz)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MultipleOf(4),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(10);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate number metadata (multiple of xyz)", () => {
            class NumberTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.MultipleOf(4),
                __metadata("design:type", Number)
            ], NumberTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new NumberTestClass(12);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
    });
    describe("for boolean type", () => {
        it("should NOT validate boolean metadata (in array xyz)", () => {
            class BooleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([true]),
                __metadata("design:type", Boolean)
            ], BooleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new BooleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate boolean metadata (in array xyz)", () => {
            class BooleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([true]),
                __metadata("design:type", Boolean)
            ], BooleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new BooleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate boolean content state (defined)", () => {
            class BooleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(),
                __metadata("design:type", Boolean)
            ], BooleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new BooleanTestClass(undefined);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate boolean content state (defined)", () => {
            class BooleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsDefined(),
                __metadata("design:type", Boolean)
            ], BooleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new BooleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate boolean content state (empty)", () => {
            class BooleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(),
                __metadata("design:type", Boolean)
            ], BooleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new BooleanTestClass(true);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate boolean content state (empty)", () => {
            class BooleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsEmpty(),
                __metadata("design:type", Boolean)
            ], BooleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new BooleanTestClass();
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate boolean content state (filled)", () => {
            class BooleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(),
                __metadata("design:type", Boolean)
            ], BooleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new BooleanTestClass();
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate boolean content state (filled)", () => {
            class BooleanTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.IsNotEmpty(),
                __metadata("design:type", Boolean)
            ], BooleanTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new BooleanTestClass(false);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
    });
    describe("for array type", () => {
        it("should NOT validate array content state (contains xyz)", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains("base"),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass(["desoxyribonucleic", "acid"]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate array content state (contains xyz)", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.Contains("base"),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass(["amino", "acid", "base", "pairs"]);
            validationResult = testValidator.validate(localTestClass);
            should.equal(validationResult.length, 0);
            validationResult = [];
        });
        it("should NOT validate array items (in array xyz)", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([[true], ["boolean"]]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([false]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate array items (in array xyz)", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.InArray([[true], ["boolean"]]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([true]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.equal(0);
            validationResult = [];
        });
        it("should NOT validate array type (number[][])", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType([Number, [Number, String]]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([[false]]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate array type (number[][])", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType([Number, [Number, String]]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([["false"]]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.equal(0);
            validationResult = [];
        });
        it("should NOT validate array type (Array<Array<number>>)", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType([[Number]]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([[false]]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate array type (Array<Array<number>>)", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType([[Number]]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([[123, 456]]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.equal(0);
            validationResult = [];
        });
        it("should NOT validate array type (mixed)", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType([Boolean, Number, String]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([new TestClass_1.InnermostTestClass()]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate array type (mixed)", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType([Boolean, Number, String]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([false, true]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.equal(0);
            validationResult = [];
        });
        it("should NOT validate array type (class[])", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType([TestClass_1.InnermostTestClass]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([false]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate array type (class[])", () => {
            class ArrayTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType([TestClass_1.InnermostTestClass]),
                __metadata("design:type", Array)
            ], ArrayTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ArrayTestClass([new TestClass_1.InnermostTestClass()]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.equal(0);
            validationResult = [];
        });
    });
    describe("for class type", () => {
        it("should NOT validate type (class)", () => {
            class ClassesTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(),
                __metadata("design:type", TestClass_1.InnermostTestClass)
            ], ClassesTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ClassesTestClass([101]);
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.be.above(0);
            validationResult = [];
        });
        it("should validate type (class)", () => {
            class ClassesTestClass {
                constructor(value) {
                    this.testProp = value;
                }
            }
            __decorate([
                V.ValidateType(),
                __metadata("design:type", TestClass_1.InnermostTestClass)
            ], ClassesTestClass.prototype, "testProp", void 0);
            testValidator = new V.Validator();
            localTestClass = new ClassesTestClass(new TestClass_1.InnermostTestClass());
            validationResult = testValidator.validate(localTestClass);
            (validationResult.length).should.equal(0);
            validationResult = [];
        });
    });
});
