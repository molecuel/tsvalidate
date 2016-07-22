'use strict'
import 'reflect-metadata';
import should = require('should');
import assert = require('assert');
import { CustomTestClass } from './classes/TestClass';
import { Validator } from '../dist';
import * as D from '../dist/decorators';


describe('validator', function() {
  describe('module', function() {
    let testValidator: Validator;

    it('Should validate nested types', function() {
      testValidator = new Validator();
      let localTestClass: CustomTestClass;
      localTestClass = new CustomTestClass()
      console.log(testValidator.validate(localTestClass));
    })

    it('Should validate types', function() {
      class OuterTestClass {
        constructor(_number: number = 0, _bool: boolean = true, _string: string = 'new') {
          this.testNumber = _number;
          this.testBool = _bool;
          this.testString = _string;
        }
        @D.IsBoolean()
        private testNumber: number;
        @D.IsString()
        testBool: boolean;
        @D.IsNumber()
        testString: string;
      }
      testValidator = new Validator();
      let localTestClass = new OuterTestClass();
      console.log(testValidator.validate(localTestClass));

      // localTestClass = new TestClass('newTest', 'IsBoolean');
      // console.log(testValidator.validate(localTestClass));
      //
      // localTestClass = new TestClass('newTest', 'IsNumber');
      // console.log(testValidator.validate(localTestClass));
      //
      // localTestClass = new TestClass('newTest', null, null, 1, 'IsString');
      // console.log(testValidator.validate(localTestClass));
    })

    it('Should validate string metadata', function() {
      testValidator = new Validator();
      class stringTestClass {
        constructor(_string: string = 'new') {
          this.testString = _string;
          this.lowercaseTestString = 'LOWERCASE';
          this.notEmptyTestString = '';
          this.definedTestString = undefined;
        }
        @D.MaxLen(5)
        @D.MinLen(26)
        @D.MaxByteLen(7)
        @D.MinByteLen(28)
        @D.DateAfter('01.07.2016')
        @D.DateBefore('07.01.2016')
        @D.IsDate()
        @D.ISO8601Date()
        @D.Uppercase()
        @D.IsEmpty()
        @D.Equals('base')
        @D.Contains('base')
        @D.Matching('base')
        @D.InArray([])
        testString: string;
        @D.Lowercase()
        lowercaseTestString: string;
        @D.IsNotEmpty()
        @D.IsDefined()
        notEmptyTestString: string;
        @D.IsDefined()
        definedTestString: string;
      }
      testValidator = new Validator();
      let localTestClass = new stringTestClass('desoxyribonucleic acid');
      console.log(testValidator.validate(localTestClass));
    })
    it('Should validate number metadata', function() {
      testValidator = new Validator();
      class numberTestClass {
        constructor(_number: number = 0) {
          this.testNumber = _number;
          this.decimalTestNumber = 1.2;
          this.definedTestNumber = undefined;
          this.phoneNumber = 4963271536;
        }
        // @D.MaxLen(1)
        // @D.MinLen(3)
        @D.MaxValue(5)
        // @D.MinValue(12)
        // @D.Contains(2)
        // @D.Equals(2)
        // @D.IsEmpty()
        // @D.IsFloat()
        // @D.IsDecimal()
        // @D.MultipleOf(3)
        // @D.InArray([])
        testNumber: number;
        // @D.IsFloat()
        // @D.IsDecimal()
        // @D.IsInt()
        decimalTestNumber: number;
        // @D.IsDefined()
        // @D.IsNotEmpty()
        definedTestNumber: number;
        // @D.MobilePhoneNumber('de-DE')
        phoneNumber: number;
      }
      testValidator = new Validator();
      let localTestClass = new numberTestClass(10);
      console.log(testValidator.validate(localTestClass));
    })
  });
})
