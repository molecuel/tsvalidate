'use strict'
import 'reflect-metadata';
import should = require('should');
import assert = require('assert');
import { IValidatorError } from '../dist/interfaces/IValidatorError';
import { OuterContainerClass, CustomTestClass } from './classes/TestClass';
import { Validator } from '../dist';
import * as D from '../dist/decorators';

should();

describe('validator', function() {
  describe('module', function() {
    let testValidator: Validator;
    let validationResult: IValidatorError[];
    let localTestClass;


    // it('VALIDATION ERROR: Should validate nested types', function() {
    //   testValidator = new Validator();
    //   let localTestClass: CustomTestClass;
    //   localTestClass = new CustomTestClass()
    //   validationResult = testValidator.validate(localTestClass);
    //   if (validationResult.length > 0) {
    //     for (let i in validationResult)
    //       console.log(validationResult[i].message);
    //   }
    //   (validationResult.length > 0).should.be.ok();
    //   validationResult = [];
    // })
    //
    // it('VALIDATION OKAY: Should validate nested types', function() {
    //   testValidator = new Validator();
    //   let localTestClass: CustomTestClass;
    //   localTestClass = new CustomTestClass()
    //   validationResult = testValidator.validate(localTestClass);
    //   if (validationResult.length > 0) {
    //     for (let i in validationResult)
    //       console.log(validationResult[i].message);
    //   }
    //   (validationResult.length === 0).should.be.ok();
    //   validationResult = [];
    // })
    //
    // it('VALIDATION ERROR: Should validate multi-nested types', function() {
    //   testValidator = new Validator();
    //   let localTestClass: OuterContainerClass;
    //   localTestClass = new OuterContainerClass()
    //   validationResult = testValidator.validate(localTestClass);
    //   if (validationResult.length > 0) {
    //     for (let i in validationResult)
    //       console.log(validationResult[i].message);
    //   }
    //   (validationResult.length > 0).should.be.ok();
    //   validationResult = [];
    // })
    //
    // it('VALIDATION OKAY: Should validate multi-nested types', function() {
    //   testValidator = new Validator();
    //   let localTestClass: OuterContainerClass;
    //   localTestClass = new OuterContainerClass()
    //   validationResult = testValidator.validate(localTestClass);
    //   if (validationResult.length > 0) {
    //     for (let i in validationResult)
    //       console.log(validationResult[i].message);
    //   }
    //   (validationResult.length === 0).should.be.ok();
    //   validationResult = [];
    // })

    it('VALIDATION ERROR: Should validate types (Number)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass('text');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate types (Number)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: number;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(123);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate types (String)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate types (String)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass('test');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate types (Boolean)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: boolean;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(123);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate types (Boolean)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType()
        private testProp: boolean;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(false);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate types (any(superimposed))', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType(Number)
        private testProp: any;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass('text');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate types (any(superimposed))', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.ValidateType(Boolean)
        private testProp: any;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate format (Decimal)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDecimal()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass('test');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate format (Decimal)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsDecimal()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(123.45);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate format (Float)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsFloat()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass('1234.5');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate format (Float)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsFloat()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(123.45);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length === 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION ERROR: Should validate format (Integer)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsInt()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(543.21);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok();
      validationResult = [];
    })

    it('VALIDATION OKAY: Should validate format (Integer)', function() {
      class OuterTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @D.IsInt()
        testProp: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass(100);
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
      localTestClass = new stringTestClass('desoxyribonucleic acid');
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
      localTestClass = new stringTestClass('desoxyribonucleic acid');
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
      localTestClass = new stringTestClass('03.02.16');
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
      localTestClass = new stringTestClass('08-01-2016');
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
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

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
      (validationResult.length > 0).should.be.ok();
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
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

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
      (validationResult.length > 0).should.be.ok(); validationResult = [];

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
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 1) {
        console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
      }
      else if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

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
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 1) {
        console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
      }
      else if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

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
      (validationResult.length > 0).should.be.ok(); validationResult = [];

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
      (validationResult.length > 0).should.be.ok(); validationResult = [];

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
      (validationResult.length > 0).should.be.ok(); validationResult = [];

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
      (validationResult.length > 0).should.be.ok(); validationResult = [];

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
      localTestClass = new stringTestClass('This is a full sentence with PUNCTUATION.');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })


    // number validation tests

    it('VALIDATION ERROR: Should validate number metadata (maximum length)', function() {
      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
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
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number metadata (minimum length)', function() {
      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MinLen(3)
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number metadata (maximum value)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MaxValue(5)
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number metadata (minimum value)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MinValue(12)
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number content state (contains xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.Contains(2)
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number content state (equals xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.Equals(2)
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number content state (empty)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.IsEmpty()
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number content state (filled)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.IsNotEmpty()
        definedTestNumber: number;
        testProp: number;
        decimalTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 1) {
        console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
      }
      else if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number content state (defined)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.IsDefined()
        definedTestNumber: number;
        testProp: number;
        decimalTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 1) {
        console.log(validationResult[1].message + ' [' + validationResult[1].value + ']');
      }
      else if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number content state (in array xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.InArray(['one', 'two', 'three'])
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number metadata (multiple of xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MultipleOf(3)
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate number metadata (equals xyz)', function() {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testProp = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.Equals(2)
        testProp: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })


    // boolean validation tests

    it('VALIDATION ERROR: Should validate boolean metadata (equals xyz)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testProp = _bool;
          this.definedTestBool = undefined;

        }
        @D.Equals(2)
        testProp: boolean;
        definedTestBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate boolean metadata (in array xyz)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testProp = _bool;
          this.definedTestBool = undefined;

        }
        @D.InArray(['one', 'two', 'three'])
        testProp: boolean;
        definedTestBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message + ' [' + validationResult[0].value + '] in [' + validationResult[0].comparison + ']');
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];

    })

    it('VALIDATION ERROR: Should validate boolean content state (defined)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testProp = _bool;
          this.definedTestBool = undefined;

        }
        @D.IsDefined()
        definedTestBool: boolean;
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

    it('VALIDATION ERROR: Should validate boolean content state (empty)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testProp = _bool;
          this.definedTestBool = undefined;
        }
        @D.IsEmpty()
        testProp: boolean;
        definedTestBool: boolean;
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

    it('VALIDATION ERROR: Should validate boolean content state (filled)', function() {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testProp = _bool;
          this.definedTestBool = null;

        }
        @D.IsNotEmpty()
        definedTestBool: boolean;
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

  });
})
