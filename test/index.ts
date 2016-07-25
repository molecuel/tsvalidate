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

    after(function(done) {
      done();
    });

    it('Should validate types (Boolean)', function(done) {
      class OuterTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
        }
        @D.IsBoolean()
        private testNumber: number;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate types (Decimal)', function(done) {
      class OuterTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
        }
        @D.IsDecimal()
        testString: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate types (String)', function(done) {
      class OuterTestClass {
        constructor(_bool: boolean = true) {
          this.testBool = _bool;
        }
        @D.IsString()
        testBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate types (Float)', function(done) {
      class OuterTestClass {
        constructor(_bool: boolean = true) {
          this.testBool = _bool;
        }
        @D.IsFloat()
        testBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate types (Number)', function(done) {
      class OuterTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
        }
        @D.IsNumber()
        testString: string;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate types (Integer)', function(done) {
      class OuterTestClass {
        constructor(_number: number = 1.4) {
          this.testNumber = _number;
        }
        @D.IsInt()
        testNumber: number;
      }
      testValidator = new Validator();
      localTestClass = new OuterTestClass();
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate nested types', function(done) {
      testValidator = new Validator();
      let localTestClass: CustomTestClass;
      localTestClass = new CustomTestClass()
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(validationResult[i].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    console.log('\n');

    it('Should validate multi-nested types', function(done) {
      testValidator = new Validator();
      let localTestClass: OuterContainerClass;
      localTestClass = new OuterContainerClass()
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        for (let i in validationResult)
          console.log(validationResult[i].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    console.log('\n');

    it('Should validate string length (maximum)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.MaxLen(5)
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string length (minimum)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.MinLen(26)
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string byte length (maximum)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.MaxByteLen(7)
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string byte length (minimum)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.MinLen(26)
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string date', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.IsDate()
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string date (ISO8601)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.ISO8601Date()
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string dates prior to xx-yy-zzzz', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.DateBefore('07.01.2016')
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string dates after xx-yy-zzzz', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.DateAfter('01.07.2016')
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate uppercase strings', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.Uppercase()
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate lowercase strings', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        testString: string;
        @D.Lowercase()
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string content state (empty)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.IsEmpty()
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string content state (filled)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        testString: string;
        lowercaseTestString: string;
        @D.IsNotEmpty()
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string content state (defined)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        @D.IsDefined()
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string content state (equal to xyz)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.Equals('base')
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string content state (contains xyz)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.Contains('base')
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate string content state (in array xyz)', function(done) {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.InArray([])
        testString: string;
        lowercaseTestString: string;
        notEmptyTestString: string;
        definedTestString: string;
      }
      testValidator = new Validator();
      localTestClass = new stringTestClass('desoxyribonucleic acid');
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    console.log('\n');
    // number validation tests

    it('Should validate number metadata (maximum length)', function(done) {
      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MaxLen(1)
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number metadata (minimum length)', function(done) {
      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MinLen(3)
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number metadata (maximum value)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MaxValue(5)
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number metadata (minimum value)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MinValue(12)
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number content state (contains xyz)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.Contains(2)
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number content state (equals xyz)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.Equals(2)
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number content state (empty)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.IsEmpty()
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number content state (filled)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        testNumber: number;
        decimalTestNumber: number;
        @D.IsNotEmpty()
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number content state (defined)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        testNumber: number;
        decimalTestNumber: number;
        @D.IsDefined()
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number content state (in array xyz)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.InArray([])
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number metadata (multiple of xyz)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.MultipleOf(3)
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate number metadata (equals xyz)', function(done) {

      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;

        }
        @D.Equals(2)
        testNumber: number;
        decimalTestNumber: number;
        definedTestNumber: number;

      }
      testValidator = new Validator();
      localTestClass = new numberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    console.log('\n');
    // boolean validation tests

    it('Should validate boolean metadata (equals xyz)', function(done) {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testBool = _bool;
          this.definedTestBool = undefined;

        }
        @D.Equals(2)
        testBool: boolean;
        definedTestBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate boolean metadata (in array xyz)', function(done) {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testBool = _bool;
          this.definedTestBool = undefined;

        }
        @D.InArray([])
        testBool: boolean;
        definedTestBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate boolean content state (defined)', function(done) {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testBool = _bool;
          this.definedTestBool = undefined;

        }
        testBool: boolean;
        @D.IsDefined()
        definedTestBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate boolean content state (empty)', function(done) {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testBool = _bool;
          this.definedTestBool = undefined;
        }
        @D.IsEmpty()
        testBool: boolean;
        definedTestBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

    it('Should validate boolean content state (filled)', function(done) {

      testValidator = new Validator();
      class booleanTestClass {
        constructor(_bool: boolean = false) {
          this.testBool = _bool;
          this.definedTestBool = null;

        }
        testBool: boolean;
        @D.IsNotEmpty()
        definedTestBool: boolean;
      }
      testValidator = new Validator();
      localTestClass = new booleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      if (validationResult.length > 0) {
        console.log(validationResult[0].message);
      }
      (validationResult.length > 0).should.be.ok(); validationResult = [];
      done();
    })

  });
})
