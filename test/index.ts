"use strict";
import "reflect-metadata";
import * as should  from "should";
import { MultiNestedTestClass, NestedTestClass, InnermostTestClass } from "./classes/TestClass";
import * as V from "../dist";

// tslint:disable:max-classes-per-file

describe("validator", () => {
  let testValidator: V.Validator;
  let validationResult: V.IValidatorError[];
  let localTestClass;
  let indent: string = "       ";

  describe("for all types", () => {

    it("should NOT validate content state (defined)", () => {
      class TestClass1 {
        @V.IsDefined()
        public testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass1();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];

      class TestClass2 {
        @V.IsDefined()
        public testProp: any;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass2();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate content state (defined)", () => {
      class StringTestClass {
        @V.IsDefined()
        public testProp: any;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass(null);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate any content state (equal to xyz)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Equals("base")
        public testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate content state (equal to xyz)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Equals(new String())
        public testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass(new String());
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate nested types", () => {
      testValidator = new V.Validator();
      let localTestClass: NestedTestClass;
      localTestClass = new NestedTestClass(true, false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult) {
          if (validationResult[i]) {
            console.log(indent + validationResult[i].message);
          }
        }
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate nested types", () => {
      testValidator = new V.Validator();
      let localTestClass: NestedTestClass;
      localTestClass = new NestedTestClass("text", 0);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult) {
          if (validationResult[i]) {
            console.log(indent + validationResult[i].message);
          }
        }
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate multi-nested types", () => {
      testValidator = new V.Validator();
      let localTestClass: MultiNestedTestClass;
      localTestClass = new MultiNestedTestClass("false", 0, false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult) {
          if (validationResult[i]) {
            console.log(indent + validationResult[i].message);
          }
        }
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate multi-nested types", () => {
      testValidator = new V.Validator();
      let localTestClass: MultiNestedTestClass;
      localTestClass = new MultiNestedTestClass(true, "text", 1);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult) {
          if (validationResult[i]) {
            console.log(indent + validationResult[i].message);
          }
        }
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate types (Number)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private public testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass("text");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate types (Number)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private public testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(123);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate types (String)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate types (String)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass("test");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate types (Boolean)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private public testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(123);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate types (Boolean)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private public testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate types (any(superimposed))", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType(Number)
        private public testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass("text");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate types (any(superimposed))", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType(Boolean)
        private public testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });


    it("should NOT remove all earlier applied decorators)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsInt()
        @V.ClearValidators()
        @V.ValidateType(Number)
        private public testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass("text");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should remove all earlier applied decorators)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsInt()
        @V.ValidateType(Boolean)
        protected public testProp: any;
      }
      class InheritingClass extends TestClass {

        @V.ClearValidators()
        protected public testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new InheritingClass("true");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });
  }); // category end

  describe("for string type", () => {
    // string validation tests
    it("should NOT validate format (Decimal)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDecimal()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass("test");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate format (Decimal)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDecimal()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(123.45);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      };
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate format (Float)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsFloat()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass("string 1234.5");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate format (Float)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsFloat()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(123.45);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate format (Integer)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsInt()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(543.21);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate format (Integer)", () => {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsInt()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(100);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string length (maximum)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxLen(5)
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string length (maximum)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxLen(35)
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string length (minimum)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(26)
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string length (minimum)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(5)
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string byte length (maximum)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxByteLen(7)
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string byte length (maximum)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxByteLen(32)
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string byte length (minimum)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(26)
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string byte length (minimum)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(4)
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string date mm-dd-yyyy", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDate()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string date mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDate()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("07-27-16");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string date (ISO8601)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ISO8601Date()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("24-12-2015");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string date (ISO8601)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ISO8601Date()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("2015-12-24");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is an email address", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmail()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("blablub.wruff");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is a valid email address", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmail()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("info@inspirationlabs.com");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is an IP address", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsIP()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("256.256.256.1");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is an IP address", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsIP()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("127.0.0.1");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is a MAC address", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsMAC()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("0123.4567.89ab");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is a MAC address", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsMAC()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("01:23:45:67:89:AB");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is a hex color", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.HexColor()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("gh:ab:11");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is a hex color", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.HexColor()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("FCFCFC");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is hexadecimal", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Hexadecimal()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("ghab11");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is hexadecimal", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Hexadecimal()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("fcfcfc");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is a MongoDB ObjectID", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MongoID()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("nonononotanobjectidatall");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is a MongoDB ObjectID", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MongoID()
        public testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("507f191e810c19729de860ea");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.DateBefore("07.01.2016")
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("08.15.16");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.DateBefore("07.02.2016")
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("06-12-2016");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string dates after mm-dd-yyyy", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.DateAfter("01.07.2016")
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("01.07.2016");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string dates after mm-dd-yyyy", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.DateAfter("01.07.2016")
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("01.08.2016");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate uppercase strings", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Uppercase()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate uppercase strings", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Uppercase()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("UPPERCASE");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate lowercase strings", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Lowercase()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("Totally NOT lowercase");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate lowercase strings", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Lowercase()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("just lowercase");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (empty)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmpty()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (empty)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmpty()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (filled)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsNotEmpty()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (filled)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsNotEmpty()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("aircraft carrier");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (contains xyz)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Contains("base")
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (contains xyz)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Contains("base")
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("amino acid base pairs");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (in array xyz)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray(["one", "two", "three"])
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (in array xyz)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray(["one", "two", "three"])
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("two");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (not in array xyz)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.NotInArray(["one", "two", "three"])
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("three");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (not in array xyz)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.NotInArray(["one", "two", "three"])
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("amino acid base pairs");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string metadata (alphanumeric)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.AlphaNumeric()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("This is a full sentence with PUNCTUATION.");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string metadata (alphanumeric)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.AlphaNumeric()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("No punctuation here");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string metadata (alpha)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Alpha()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("h3r3 b3 m0n573r5");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string metadata (alpha)", () => {
      class StringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Alpha()
        public testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("here be monsters");
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });
  }); // category end

  describe("for number type", () => {
    // number validation tests
    it("should NOT validate number metadata (maximum length)", () => {
      class NumberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxLen(1)
        public testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

      it("should validate number metadata (maximum length)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MaxLen(1)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(9);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number metadata (minimum length)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MinLen(3)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(10);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number metadata (minimum length)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MinLen(3)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(125);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number metadata (maximum value)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MaxValue(5)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(10);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number metadata (maximum value)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MaxValue(5)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(5);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number metadata (minimum value)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MinValue(12)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(10);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number metadata (minimum value)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MinValue(12)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(12);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number content state (contains xyz)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.Contains(2)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(10);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number content state (contains xyz)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.Contains(2)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(12);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number content state (empty)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsEmpty()
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(10);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number content state (empty)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsEmpty()
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass();
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number content state (filled)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsNotEmpty()
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass();
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number content state (filled)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsNotEmpty()
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(10);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number content state (defined)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsDefined()
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(undefined);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number content state (defined)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsDefined()
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(101);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number content state (in array xyz)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.InArray([1, 2, 3, 4, 5])
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(9);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number content state (in array xyz)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.InArray([1, 2, 3, 4, 5])
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(3);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate number metadata (multiple of xyz)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MultipleOf(4)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(10);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate number metadata (multiple of xyz)", () => {
        class NumberTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.MultipleOf(4)
          public testProp: number;
        }
        testValidator = new V.Validator();
        localTestClass = new NumberTestClass(12);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });
    }); // category end

    describe("for boolean type", () => {
      // boolean validation tests
      it("should NOT validate boolean metadata (in array xyz)", () => {
        class booleanTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.InArray([true])
          public testProp: boolean;
        }
        testValidator = new V.Validator();
        localTestClass = new booleanTestClass(false);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate boolean metadata (in array xyz)", () => {
        class booleanTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.InArray([true])
          public testProp: boolean;
        }
        testValidator = new V.Validator();
        localTestClass = new booleanTestClass(true);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate boolean content state (defined)", () => {
        class booleanTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsDefined()
          public testProp: boolean;
        }
        testValidator = new V.Validator();
        localTestClass = new booleanTestClass(undefined);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate boolean content state (defined)", () => {
        class booleanTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsDefined()
          public testProp: boolean;
        }
        testValidator = new V.Validator();
        localTestClass = new booleanTestClass(false);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate boolean content state (empty)", () => {
        class booleanTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsEmpty()
          public testProp: boolean;
        }
        testValidator = new V.Validator();
        localTestClass = new booleanTestClass(true);
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate boolean content state (empty)", () => {
        class booleanTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsEmpty()
          public testProp: boolean;
        }
        testValidator = new V.Validator();
        localTestClass = new booleanTestClass();
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });

      it("should NOT validate boolean content state (filled)", () => {
        class booleanTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsNotEmpty()
          public testProp: boolean;
        }
        testValidator = new V.Validator();
        localTestClass = new booleanTestClass();
        validationResult = testValidator.validate(localTestClass);
        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        (validationResult.length).should.be.above(0);
        validationResult = [];
      });

      it("should validate boolean content state (filled)", () => {
        class booleanTestClass {
          constructor(value?: any) {
            this.testProp = value;
          }
          @V.IsNotEmpty()
          public testProp: boolean;
        }
        testValidator = new V.Validator();
        localTestClass = new booleanTestClass(false);
        validationResult = testValidator.validate(localTestClass);

        if (validationResult.length > 0) {
          console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
        }
        should.equal(validationResult.length, 0);
        validationResult = [];
      });
    }); // category end

  describe("for array type", () => {
    // array validation tests
      it("should NOT validate array content state (contains xyz)", () => {
      class arrayTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Contains("base")
        public testProp: string[];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass(["desoxyribonucleic", "acid"]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array content state (contains xyz)", () => {
      class arrayTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Contains("base")
        public testProp: string[];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass(["amino", "acid", "base", "pairs"]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate array items (in array xyz)", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.InArray([[true], ["boolean"]])
        public testProp: boolean[];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array items (in array xyz)", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.InArray([[true], ["boolean"]])
        public testProp: boolean[];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([true]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    it("should NOT validate array type (number[][])", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType([Number, [Number, String]])
        public testProp: number[][];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([[false]]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array type (number[][])", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType([Number, [Number, String]])
        public testProp: number[][];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([["false"]]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    it("should NOT validate array type (Array<Array<number>>)", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType([[Number]])
        public testProp: Array<Array<number>>;
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([[false]]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array type (Array<Array<number>>)", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType([[Number]])
        public testProp: Array<Array<number>>;
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([[123, 456]]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    it("should NOT validate array type (mixed)", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType([Boolean, Number, String])
        public testProp: (boolean | number | string)[];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([new InnermostTestClass()]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array type (mixed)", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType([Boolean, Number, String])
        public testProp: (boolean | number | string)[];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([false, true]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    it("should NOT validate array type (class[])", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType([InnermostTestClass])
        public testProp: InnermostTestClass[];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array type (class[])", () => {
      class arrayTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType([InnermostTestClass])
        public testProp: InnermostTestClass[];
      }
      testValidator = new V.Validator();
      localTestClass = new arrayTestClass([new InnermostTestClass()]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });
  }); // category end

  describe("for class type", () => {
    // class validation tests

    it("should NOT validate type (class)", () => {
      class classesTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        public testProp: InnermostTestClass;
      }
      testValidator = new V.Validator();
      localTestClass = new classesTestClass([101]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate type (class)", () => {
      class classesTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        public testProp: InnermostTestClass;
      }
      testValidator = new V.Validator();
      localTestClass = new classesTestClass(new InnermostTestClass());
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    /* // WIP
    it("should validate type (union)", () => {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        public testProp: boolean | number | string;
      }
      // console.log("requested type instance: ");
      // let union = new (Boolean | Number | String)();
      // console.log(union);
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass([101]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })
    */
  }); // category end
}); // test end
