'use strict'
import 'reflect-metadata';
import should = require('should');
import assert = require('assert');
import { IValidatorError } from '../dist/interfaces/IValidatorError';
import { MultiNestedTestClass, NestedTestClass } from './classes/TestClass';
import { Validator } from '../dist';
import * as D from '../dist/decorators';

should();

describe('validator', function() {
  let testValidator: Validator;
  let validationResult: IValidatorError[];
  let localTestClass;
  describe('for all types', function() {

    it('VALIDATION ERROR: Should validate string content state (equal to xyz)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Equals('base')
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string content state (equal to xyz)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Equals(new String())
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass(new String());
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate nested types', function() {
      testValidator = new Validator();
      let localTestClass: NestedTestClass;
      localTestClass = new NestedTestClass(true, false)
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(validationResult[i].message);
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate nested types', function() {
      testValidator = new Validator();
      let localTestClass: NestedTestClass;
      localTestClass = new NestedTestClass('text', 0)
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(validationResult[i].message);
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate multi-nested types', function() {
      testValidator = new Validator();
      let localTestClass: MultiNestedTestClass;
      localTestClass = new MultiNestedTestClass('false', 0, false)
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(validationResult[i].message);
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate multi-nested types', function() {
      testValidator = new Validator();
      let localTestClass: MultiNestedTestClass;
      localTestClass = new MultiNestedTestClass(true, 'text', 1)
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(validationResult[i].message);
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate types (Number)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new TestClass('text');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate types (Number)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(123);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate types (String)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate types (String)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new TestClass('test');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate types (Boolean)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: boolean;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(123);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate types (Boolean)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: boolean;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate types (any(superimposed))', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType(Number)
        private testProp: any;
      }
      testValidator = new Validator();
      localTestClass = new TestClass('text');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate types (any(superimposed))', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType(Boolean)
        private testProp: any;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })
    // category end
  });

  describe('for string type', function() {
    // string validation tests
    it('VALIDATION ERROR: Should validate format (Decimal)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDecimal()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new TestClass('test');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate format (Decimal)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDecimal()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(123.45);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate format (Float)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsFloat()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new TestClass('1234.5');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate format (Float)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsFloat()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(123.45);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate format (Integer)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsInt()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(543.21);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate format (Integer)', function() {
      class TestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsInt()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new TestClass(100);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string length (maximum)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MaxLen(5)
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string length (maximum)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MaxLen(35)
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string length (minimum)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MinLen(26)
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string length (minimum)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MinLen(5)
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string byte length (maximum)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MaxByteLen(7)
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string byte length (maximum)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MaxByteLen(32)
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string byte length (minimum)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MinLen(26)
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string byte length (minimum)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MinLen(4)
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string date mm-dd-yyyy', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDate()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string date mm-dd-(yy)yy or mm.dd.(yy)yy', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDate()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('07-27-16');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string date (ISO8601)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ISO8601Date()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('24-12-2015');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string date (ISO8601)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ISO8601Date()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('2015-12-24');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate whether string is an email address', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsEmail()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('blablub.wruff');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate whether string is a valid email address', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsEmail()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('info@inspirationlabs.com');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate whether string is an IP address', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsIP()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('256.256.256.1');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate whether string is an IP address', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsIP()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('127.0.0.1');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate whether string is a MAC address', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsMAC()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('0123.4567.89ab');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate whether string is a MAC address', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsMAC()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('01:23:45:67:89:AB');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate whether string is a hex color', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.HexColor()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('gh:ab:11');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate whether string is a hex color', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.HexColor()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('FCFCFC');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate whether string is hexadecimal', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Hexadecimal()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('ghab11');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate whether string is hexadecimal', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Hexadecimal()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('fcfcfc');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    // it('VALIDATION ERROR: Should validate whether string is a URL', function() {
    //   testValidator = new Validator();
    //   class stringTestClass {
    //     constructor(value?: any) {
    //       this.testProp = value;
    //     }
    //     @D.IsURL()
    //     testProp: string;
    //   }
    //   testValidator = new Validator();
    //   localTestClass = new stringTestClass('gnarf.exe');
    //   validationResult = testValidator.validate(localTestClass);
    //   if (validationResult.length > 0) {
    //     console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
    //   }
    //   (validationResult.length > 0).should.be.ok();
    //   validationResult = [];
    // })
    //
    // it('VALIDATION OKAY: Should validate whether string is a URL', function() {
    //   testValidator = new Validator();
    //   class stringTestClass {
    //     constructor(value?: any) {
    //       this.testProp = value;
    //     }
    //     @D.IsURL()
    //     testProp: string;
    //   }
    //   testValidator = new Validator();
    //   localTestClass = new stringTestClass('www.wruff.meow');
    //   validationResult = testValidator.validate(localTestClass);
    //   if (validationResult.length > 0) {
    //     console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
    //   }
    //   (validationResult.length === 0).should.be.ok();
    //   validationResult = [];
    // })

    it('VALIDATION ERROR: Should validate whether string is a MongoDB ObjectID', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Hexadecimal()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('nonononotanobjectidatall');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate whether string is a MongoDB ObjectID', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Hexadecimal()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('507f191e810c19729de860ea');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.DateBefore('07.01.2016')
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('08.15.16');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.DateBefore('07.02.2016')
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('06-12-2016');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string dates after mm-dd-yyyy', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.DateAfter('01.07.2016')
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('01.07.2016');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string dates after mm-dd-yyyy', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.DateAfter('01.07.2016')
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('01.08.2016');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate uppercase strings', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Uppercase()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate uppercase strings', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Uppercase()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('UPPERCASE');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate lowercase strings', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Lowercase()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('Totally NOT lowercase');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate lowercase strings', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Lowercase()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('just lowercase');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string content state (empty)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsEmpty()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string content state (empty)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsEmpty()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string content state (filled)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsNotEmpty()
        testProp: string;
      }
      testValidator = new Validator();
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
    })

    it('VALIDATION OKAY: Should validate string content state (filled)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsNotEmpty()
        testProp: string;
      }
      testValidator = new Validator();
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
    })

    it('VALIDATION ERROR: Should validate string content state (defined)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDefined()
        testProp: string;
      }
      testValidator = new Validator();
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
    })

    it('VALIDATION OKAY: Should validate string content state (defined)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDefined()
        testProp: string;
      }
      testValidator = new Validator();
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
    })

    it('VALIDATION ERROR: Should validate string content state (contains xyz)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Contains('base')
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string content state (contains xyz)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Contains('base')
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('amino acid base pairs');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string content state (in array xyz)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.InArray(['one', 'two', 'three'])
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string content state (in array xyz)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.InArray(['one', 'two', 'three'])
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('two');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string content state (not in array xyz)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.NotInArray(['one', 'two', 'three'])
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('three');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string content state (not in array xyz)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.NotInArray(['one', 'two', 'three'])
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('amino acid base pairs');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string metadata (alphanumeric)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.AlphaNumeric()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('This is a full sentence with PUNCTUATION.');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string metadata (alphanumeric)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.AlphaNumeric()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('No punctuation here');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate string metadata (alpha)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Alpha()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('h3r3 b3 m0n573r5');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate string metadata (alpha)', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Alpha()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('here be monsters');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })
    // category end
  });

  describe('for number type', function() {
    // number validation tests
    it('VALIDATION ERROR: Should validate number metadata (maximum length)', function() {
      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MaxLen(1)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number metadata (maximum length)', function() {
      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MaxLen(1)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(9);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number metadata (minimum length)', function() {
      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MinLen(3)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number metadata (minimum length)', function() {
      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MinLen(3)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(125);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number metadata (maximum value)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MaxValue(5)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number metadata (maximum value)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MaxValue(5)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(5);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number metadata (minimum value)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MinValue(12)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number metadata (minimum value)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MinValue(12)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number content state (contains xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Contains(2)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number content state (contains xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.Contains(2)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number content state (empty)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsEmpty()
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number content state (empty)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsEmpty()
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number content state (filled)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsNotEmpty()
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number content state (filled)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsNotEmpty()
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number content state (defined)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDefined()
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(undefined);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number content state (defined)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDefined()
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(101);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number content state (in array xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.InArray([1, 2, 3, 4, 5])
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(9);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number content state (in array xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.InArray([1, 2, 3, 4, 5])
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(3);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate number metadata (multiple of xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MultipleOf(4)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate number metadata (multiple of xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.MultipleOf(4)
        testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })
    // category end
  });

  describe('for string type', function() {
    // boolean validation tests
    it('VALIDATION ERROR: Should validate boolean metadata (in array xyz)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.InArray([true])
        testProp: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate boolean metadata (in array xyz)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.InArray([true])
        testProp: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate boolean content state (defined)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDefined()
        testProp: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(undefined);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate boolean content state (defined)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDefined()
        testProp: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate boolean content state (empty)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsEmpty()
        testProp: boolean;
      }
      testValidator = new Validator();
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
    })

    it('VALIDATION OKAY: Should validate boolean content state (empty)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsEmpty()
        testProp: boolean;
      }
      testValidator = new Validator();
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
    })

    it('VALIDATION ERROR: Should validate boolean content state (filled)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsNotEmpty()
        testProp: boolean;
      }
      testValidator = new Validator();
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
    })

    it('VALIDATION OKAY: Should validate boolean content state (filled)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsNotEmpty()
        testProp: boolean;
      }
      testValidator = new Validator();
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
    })
    // category end
  });
  // test end
})
