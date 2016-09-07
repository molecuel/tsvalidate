'use strict'
import 'reflect-metadata';
import should = require('should');
import assert = require('assert');
import { MultiNestedTestClass, NestedTestClass } from './classes/TestClass';
import * as V from '../dist';
should();

describe('validator', function() {
  let testValidator: V.Validator;
  let validationResult: V.IValidatorError[];
  let localTestClass;
  let indent: string = '       ';
  describe('for all types', function() {

    it('should NOT validate content state (defined)', function() {
      class TestClass1 {
        @V.IsDefined()
        testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass1();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];

      class TestClass2 {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDefined()
        testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass2();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate content state (defined)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDefined()
        testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass(null);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate any content state (equal to xyz)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Equals('base')
        testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate content state (equal to xyz)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Equals(new String())
        testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass(new String());
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate nested types', function() {
      testValidator = new V.Validator();
      let localTestClass: NestedTestClass;
      localTestClass = new NestedTestClass(true, false)
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(indent + validationResult[i].message);
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate nested types', function() {
      testValidator = new V.Validator();
      let localTestClass: NestedTestClass;
      localTestClass = new NestedTestClass('text', 0)
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(indent + validationResult[i].message);
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate multi-nested types', function() {
      testValidator = new V.Validator();
      let localTestClass: MultiNestedTestClass;
      localTestClass = new MultiNestedTestClass('false', 0, false)
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(indent + validationResult[i].message);
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate multi-nested types', function() {
      testValidator = new V.Validator();
      let localTestClass: MultiNestedTestClass;
      localTestClass = new MultiNestedTestClass(true, 'text', 1)
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(indent + validationResult[i].message);
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate types (Number)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass('text');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate types (Number)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(123);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate types (String)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate types (String)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass('test');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate types (Boolean)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(123);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate types (Boolean)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate types (any(superimposed))', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType(Number)
        private testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass('text');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate types (any(superimposed))', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType(Boolean)
        private testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })


    it('should NOT remove all earlier applied decorators)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsInt()
        @V.ClearValidators()
        @V.ValidateType(Number)
        private testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass('text');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should remove all earlier applied decorators)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsInt()
        @V.ValidateType(Boolean)
        protected testProp: any;
      }
      class InheritingClass extends TestClass {

        @V.ClearValidators()
        protected testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new InheritingClass('true');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })
  }); // category end

  describe('for string type', function() {
    // string validation tests
    it('should NOT validate format (Decimal)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDecimal()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass('test');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate format (Decimal)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDecimal()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(123.45);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate format (Float)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsFloat()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass('1234.5');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate format (Float)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsFloat()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(123.45);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate format (Integer)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsInt()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(543.21);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate format (Integer)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsInt()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass(100);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string length (maximum)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxLen(5)
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string length (maximum)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxLen(35)
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string length (minimum)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(26)
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string length (minimum)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(5)
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string byte length (maximum)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxByteLen(7)
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string byte length (maximum)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxByteLen(32)
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string byte length (minimum)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(26)
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string byte length (minimum)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(4)
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string date mm-dd-yyyy', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDate()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string date mm-dd-(yy)yy or mm.dd.(yy)yy', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDate()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('07-27-16');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string date (ISO8601)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ISO8601Date()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('24-12-2015');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string date (ISO8601)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ISO8601Date()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('2015-12-24');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate whether string is an email address', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmail()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('blablub.wruff');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate whether string is a valid email address', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmail()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('info@inspirationlabs.com');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate whether string is an IP address', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsIP()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('256.256.256.1');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate whether string is an IP address', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsIP()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('127.0.0.1');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate whether string is a MAC address', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsMAC()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('0123.4567.89ab');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate whether string is a MAC address', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsMAC()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('01:23:45:67:89:AB');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate whether string is a hex color', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.HexColor()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('gh:ab:11');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate whether string is a hex color', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.HexColor()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('FCFCFC');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate whether string is hexadecimal', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Hexadecimal()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('ghab11');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate whether string is hexadecimal', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Hexadecimal()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('fcfcfc');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate whether string is a MongoDB ObjectID', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MongoID()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('nonononotanobjectidatall');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate whether string is a MongoDB ObjectID', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MongoID()
        testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('507f191e810c19729de860ea');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.DateBefore('07.01.2016')
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('08.15.16');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.DateBefore('07.02.2016')
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('06-12-2016');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string dates after mm-dd-yyyy', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.DateAfter('01.07.2016')
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('01.07.2016');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string dates after mm-dd-yyyy', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.DateAfter('01.07.2016')
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('01.08.2016');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate uppercase strings', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Uppercase()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate uppercase strings', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Uppercase()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('UPPERCASE');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate lowercase strings', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Lowercase()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('Totally NOT lowercase');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate lowercase strings', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Lowercase()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('just lowercase');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string content state (empty)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmpty()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string content state (empty)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmpty()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string content state (filled)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsNotEmpty()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string content state (filled)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsNotEmpty()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('aircraft carrier');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string content state (contains xyz)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Contains('base')
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string content state (contains xyz)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Contains('base')
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('amino acid base pairs');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string content state (in array xyz)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray(['one', 'two', 'three'])
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string content state (in array xyz)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray(['one', 'two', 'three'])
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('two');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string content state (not in array xyz)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.NotInArray(['one', 'two', 'three'])
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('three');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string content state (not in array xyz)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.NotInArray(['one', 'two', 'three'])
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('amino acid base pairs');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string metadata (alphanumeric)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.AlphaNumeric()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('This is a full sentence with PUNCTUATION.');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string metadata (alphanumeric)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.AlphaNumeric()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('No punctuation here');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate string metadata (alpha)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Alpha()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('h3r3 b3 m0n573r5');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate string metadata (alpha)', function() {
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Alpha()
        testProp: string;
      }
      testValidator = new V.Validator();
      localTestClass = new stringTestClass('here be monsters');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })
  }); // category end

  describe('for number type', function() {
    // number validation tests
    it('should NOT validate number metadata (maximum length)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxLen(1)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number metadata (maximum length)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxLen(1)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(9);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number metadata (minimum length)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(3)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number metadata (minimum length)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinLen(3)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(125);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number metadata (maximum value)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxValue(5)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number metadata (maximum value)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MaxValue(5)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(5);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number metadata (minimum value)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinValue(12)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number metadata (minimum value)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MinValue(12)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number content state (contains xyz)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Contains(2)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number content state (contains xyz)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.Contains(2)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number content state (empty)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmpty()
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number content state (empty)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmpty()
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number content state (filled)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsNotEmpty()
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number content state (filled)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsNotEmpty()
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number content state (defined)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDefined()
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(undefined);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number content state (defined)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDefined()
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(101);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number content state (in array xyz)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray([1, 2, 3, 4, 5])
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(9);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number content state (in array xyz)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray([1, 2, 3, 4, 5])
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(3);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate number metadata (multiple of xyz)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MultipleOf(4)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate number metadata (multiple of xyz)', function() {
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.MultipleOf(4)
        testProp: number;
      }
      testValidator = new V.Validator();
      localTestClass = new numberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })
  }); // category end

  describe('for boolean type', function() {
    // boolean validation tests
    it('should NOT validate boolean metadata (in array xyz)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray([true])
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass(false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate boolean metadata (in array xyz)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray([true])
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate boolean content state (defined)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDefined()
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass(undefined);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate boolean content state (defined)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsDefined()
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass(false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate boolean content state (empty)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmpty()
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate boolean content state (empty)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsEmpty()
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })

    it('should NOT validate boolean content state (filled)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsNotEmpty()
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate boolean content state (filled)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.IsNotEmpty()
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass(false);
      validationResult = testValidator.validate(localTestClass);

      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })
  }); // category end

  describe('for array type', function() {
    // array validation tests
    /*
    it('should NOT validate array metadata (in array xyz)', function() {
      class booleanTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.InArray([[true], ['boolean']])
        testProp: boolean[];
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should validate boolean metadata (in array xyz)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.InArray([[true], [false]])
        testProp: boolean;
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass([true]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })
    */
    it('should NOT validate array type (number[][])', function() {
      class booleanTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType()
        testProp: number[][];
      }
      console.log('requested type instance: ');
      console.log(new Array<Array<number>>());
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should NOT validate array type (Array<Array<number>>)', function() {
      class booleanTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType()
        testProp: Array<Array<number>>;
      }
      console.log('requested type instance: ');
      console.log(new Array<Array<number>>());
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should NOT validate array type (mixed)', function() {
      class booleanTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType()
        testProp: (boolean | number | string)[];
      }
      let union = new Array<Boolean | Number | String>();
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    it('should NOT validate array type (class)', function() {
      class booleanTestClass {
        constructor(value?: any[]) {
          this.testProp = value;
        }
        @V.ValidateType()
        testProp: Element[];
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    })

    /*
    it('should validate array type (class)', function() {
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        testProp: Element[];
      }
      testValidator = new V.Validator();
      localTestClass = new booleanTestClass([101]);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })
    */
  }); // category end
}) // test end
