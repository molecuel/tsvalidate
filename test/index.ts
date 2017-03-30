"use strict";
import "reflect-metadata";
import * as should from "should";
import * as V from "../dist";
import { InnermostTestClass, MultiNestedTestClass, NestedTestClass } from "./classes/TestClass";

// tslint:disable:max-classes-per-file
// tslint:disable:array-type
// tslint:disable:max-line-length
// tslint:disable:no-console

describe("validator", () => {
  let testValidator: V.Validator;
  let validationResult: V.IValidatorError[];
  let localTestClass;
  const indent: string = "       ";

  describe("for all types", () => {
    class TestClassNumberProp {
      @V.ValidateType()
      private testProp: number;
      constructor(value?: any) {
        this.testProp = value;
      }
    }
    class TestClass1 {
      @V.IsDefined()
      private testProp: any;
    }
    class TestClass2 {
      @V.IsDefined()
      private testProp: any;
      constructor(value?: any) {
        this.testProp = value;
      }
    }
    class StringTestClass {
      @V.IsDefined()
      private testProp: any;
      constructor(value?: any) {
        this.testProp = value;
      }
    }
    class TestClassStringProp {
      @V.ValidateType()
      private testProp: string;
      constructor(value?: any) {
        this.testProp = value;
      }
    }
    class TestClassBoolProp {
      @V.ValidateType()
      private testProp: boolean;
      constructor(value?: any) {
        this.testProp = value;
      }
    }
    it("should NOT validate content state (defined)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClass1();
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];

      testValidator = new V.Validator();
      localTestClass = new TestClass2();
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate content state (defined)", () => {
      testValidator = new V.Validator();
      localTestClass = new StringTestClass(null);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate any content state (equal to xyz)", () => {
      class TemporaryTestClass {
        @V.Equals("base")
        private testProp: any;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
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
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate nested types", () => {
      testValidator = new V.Validator();
      let localNestedTestClass: NestedTestClass;
      localNestedTestClass = new NestedTestClass(true, false);
      validationResult = testValidator.validate(localNestedTestClass);
      // if (validationResult.length > 0) {
      //   for (let i in validationResult) {
      //     if (validationResult[i]) {
      //       console.log(indent + validationResult[i].message);
      //     }
      //   }
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate nested types", () => {
      testValidator = new V.Validator();
      let localNestedTestClass: NestedTestClass;
      localNestedTestClass = new NestedTestClass("text", 0);
      validationResult = testValidator.validate(localNestedTestClass);
      // if (validationResult.length > 0) {
      //   for (let i in validationResult) {
      //     if (validationResult[i]) {
      //       console.log(indent + validationResult[i].message);
      //     }
      //   }
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate multi-nested types", () => {
      testValidator = new V.Validator();
      let localNestedTestClass: MultiNestedTestClass;
      localNestedTestClass = new MultiNestedTestClass("false", 0, false);
      validationResult = testValidator.validate(localNestedTestClass);
      // if (validationResult.length > 0) {
      //   for (let i in validationResult) {
      //     if (validationResult[i]) {
      //       console.log(indent + validationResult[i].message);
      //     }
      //   }
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate multi-nested types", () => {
      testValidator = new V.Validator();
      let localNestedTestClass: MultiNestedTestClass;
      localNestedTestClass = new MultiNestedTestClass(true, "text", 1);
      validationResult = testValidator.validate(localNestedTestClass);
      // if (validationResult.length > 0) {
      //   for (let i in validationResult) {
      //     if (validationResult[i]) {
      //       console.log(indent + validationResult[i].message);
      //     }
      //   }
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate types (Number)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassNumberProp("text");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate types (Number)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassNumberProp(123);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate types (String)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassStringProp(true);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate types (String)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassStringProp("test");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate types (Boolean)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassBoolProp(123);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate types (Boolean)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassBoolProp(false);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate types (any(superimposed))", () => {
      class TestClass {
        @V.ValidateType(Number)
        private testProp: any;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TestClass("text");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate types (any(superimposed))", () => {
      class TemporaryTestClass {
        @V.ValidateType(Boolean)
        private testProp: any;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT remove all earlier applied decorators)", () => {
      class TemporaryTestClass {
        @V.IsInt()
        @V.ClearValidators()
        @V.ValidateType(Number)
        private testProp: any;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryTestClass("text");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should remove all earlier applied decorators)", () => {
      class TemporaryTestClass {
        @V.IsInt()
        @V.ValidateType(Boolean)
        protected testProp: any;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      class InheritingClass extends TemporaryTestClass {
        @V.ClearValidators()
        protected testProp: any;
      }
      testValidator = new V.Validator();
      localTestClass = new InheritingClass("true");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });
  }); // category end

  describe("for string type", () => {
    // string validation tests
    class TestClassDecimalProp {
      @V.IsDecimal()
      private testProp: string;
      constructor(value?: any) {
        this.testProp = value;
      }
    }
    class TestClassFloatProp {
      @V.IsFloat()
      private testProp: string;
      constructor(value?: any) {
        this.testProp = value;
      }
    }
    class TestClassIntProp {
      @V.IsInt()
      private testProp: string;
      constructor(value?: any) {
        this.testProp = value;
      }
    }

    it("should NOT validate format (Decimal)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassDecimalProp("test");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate format (Decimal)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassDecimalProp(123.45);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate format (Float)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassFloatProp("string 1234.5");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate format (Float)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassFloatProp(123.45);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate format (Integer)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassIntProp(543.21);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate format (Integer)", () => {
      testValidator = new V.Validator();
      localTestClass = new TestClassIntProp(100);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string length (maximum)", () => {
      class StringTestClass {
        @V.MaxLen(5)
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new StringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string length (maximum)", () => {
      class TemporaryStringTestClass {
        @V.MaxLen(35)
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string length (minimum)", () => {
      class TemporaryStringTestClass {
        @V.MinLen(26)
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string length (minimum)", () => {
      class TemporaryStringTestClass {
        @V.MinLen(5)
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string byte length (maximum)", () => {
      class TemporaryStringTestClass {
        @V.MaxByteLen(7)
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string byte length (maximum)", () => {
      class TemporaryStringTestClass {
        @V.MaxByteLen(32)
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string byte length (minimum)", () => {
      class TemporaryStringTestClass {
        @V.MinLen(26)
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string byte length (minimum)", () => {
      class TemporaryStringTestClass {
        @V.MinLen(4)
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string date mm-dd-yyyy", () => {
      class TemporaryStringTestClass {
        @V.IsDate()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string date mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
      class TemporaryStringTestClass {
        @V.IsDate()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("07-27-16");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string date (ISO8601)", () => {
      class TemporaryStringTestClass {
        @V.ISO8601Date()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("24-12-2015");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string date (ISO8601)", () => {
      class TemporaryStringTestClass {
        @V.ISO8601Date()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("2015-12-24");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is an email address", () => {
      class TemporaryStringTestClass {
        @V.IsEmail()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("blablub.wruff");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is a valid email address", () => {
      class TemporaryStringTestClass {
        @V.IsEmail()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("info@inspirationlabs.com");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is an IP address", () => {
      class TemporaryStringTestClass {
        @V.IsIP()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("256.256.256.1");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is an IP address", () => {
      class TemporaryStringTestClass {
        @V.IsIP()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("127.0.0.1");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is a MAC address", () => {
      class TemporaryStringTestClass {
        @V.IsMAC()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("0123.4567.89ab");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is a MAC address", () => {
      class TemporaryStringTestClass {
        @V.IsMAC()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("01:23:45:67:89:AB");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is a hex color", () => {
      class TemporaryStringTestClass {
        @V.HexColor()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("gh:ab:11");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is a hex color", () => {
      class TemporaryStringTestClass {
        @V.HexColor()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("FCFCFC");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is hexadecimal", () => {
      class TemporaryStringTestClass {
        @V.Hexadecimal()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("ghab11");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is hexadecimal", () => {
      class TemporaryStringTestClass {
        @V.Hexadecimal()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("fcfcfc");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate whether string is a MongoDB ObjectID", () => {
      class TemporaryStringTestClass {
        @V.MongoID()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("nonononotanobjectidatall");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate whether string is a MongoDB ObjectID", () => {
      class TemporaryStringTestClass {
        @V.MongoID()
        private testProp: any;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("507f191e810c19729de860ea");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
      class TemporaryStringTestClass {
        @V.DateBefore("07.01.2016")
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("08.15.16");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string dates prior to mm-dd-(yy)yy or mm.dd.(yy)yy", () => {
      class TemporaryStringTestClass {
        @V.DateBefore("07.02.2016")
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("06-12-2016");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string dates after mm-dd-yyyy", () => {
      class TemporaryStringTestClass {
        @V.DateAfter("01.07.2016")
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("01.07.2016");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string dates after mm-dd-yyyy", () => {
      class TemporaryStringTestClass {
        @V.DateAfter("01.07.2016")
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("01.08.2016");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate uppercase strings", () => {
      class TemporaryStringTestClass {
        @V.Uppercase()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate uppercase strings", () => {
      class TemporaryStringTestClass {
        @V.Uppercase()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("UPPERCASE");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate lowercase strings", () => {
      class TemporaryStringTestClass {
        @V.Lowercase()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("Totally NOT lowercase");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate lowercase strings", () => {
      class TemporaryStringTestClass {
        @V.Lowercase()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("just lowercase");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (empty)", () => {
      class TemporaryStringTestClass {
        @V.IsEmpty()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (empty)", () => {
      class TemporaryStringTestClass {
        @V.IsEmpty()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (filled)", () => {
      class TemporaryStringTestClass {
        @V.IsNotEmpty()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass();
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (filled)", () => {
      class TemporaryStringTestClass {
        @V.IsNotEmpty()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("aircraft carrier");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (contains xyz)", () => {
      class TemporaryStringTestClass {
        @V.Contains("base")
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (contains xyz)", () => {
      class TemporaryStringTestClass {
        @V.Contains("base")
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("amino acid base pairs");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (in array xyz)", () => {
      class TemporaryStringTestClass {
        @V.InArray(["one", "two", "three"])
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("desoxyribonucleic acid");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (in array xyz)", () => {
      class TemporaryStringTestClass {
        @V.InArray(["one", "two", "three"])
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("two");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string content state (not in array xyz)", () => {
      class TemporaryStringTestClass {
        @V.NotInArray(["one", "two", "three"])
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("three");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string content state (not in array xyz)", () => {
      class TemporaryStringTestClass {
        @V.NotInArray(["one", "two", "three"])
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("amino acid base pairs");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string metadata (alphanumeric)", () => {
      class TemporaryStringTestClass {
        @V.AlphaNumeric()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("This is a full sentence with PUNCTUATION.");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string metadata (alphanumeric)", () => {
      class TemporaryStringTestClass {
        @V.AlphaNumeric()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("No punctuation here");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate string metadata (alpha)", () => {
      class TemporaryStringTestClass {
        @V.Alpha()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("h3r3 b3 m0n573r5");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate string metadata (alpha)", () => {
      class TemporaryStringTestClass {
        @V.Alpha()
        private testProp: string;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new TemporaryStringTestClass("here be monsters");
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });
  }); // category end

  describe("for number type", () => {
    // number validation tests
    it("should NOT validate number metadata (maximum length)", () => {
      class NumberTestClass {
        @V.MaxLen(1)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number metadata (maximum length)", () => {
      class NumberTestClass {
        @V.MaxLen(1)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(9);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number metadata (minimum length)", () => {
      class NumberTestClass {
        @V.MinLen(3)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number metadata (minimum length)", () => {
      class NumberTestClass {
        @V.MinLen(3)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(125);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number metadata (maximum value)", () => {
      class NumberTestClass {
        @V.MaxValue(5)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number metadata (maximum value)", () => {
      class NumberTestClass {
        @V.MaxValue(5)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(5);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number metadata (minimum value)", () => {
      class NumberTestClass {
        @V.MinValue(12)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number metadata (minimum value)", () => {
      class NumberTestClass {
        @V.MinValue(12)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number content state (contains xyz)", () => {
      class NumberTestClass {
        @V.Contains(2)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number content state (contains xyz)", () => {
      class NumberTestClass {
        @V.Contains(2)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number content state (empty)", () => {
      class NumberTestClass {
        @V.IsEmpty()
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number content state (empty)", () => {
      class NumberTestClass {
        @V.IsEmpty()
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass();
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number content state (filled)", () => {
      class NumberTestClass {
        @V.IsNotEmpty()
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass();
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number content state (filled)", () => {
      class NumberTestClass {
        @V.IsNotEmpty()
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number content state (defined)", () => {
      class NumberTestClass {
        @V.IsDefined()
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(undefined);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number content state (defined)", () => {
      class NumberTestClass {
        @V.IsDefined()
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(101);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number content state (in array xyz)", () => {
      class NumberTestClass {
        @V.InArray([1, 2, 3, 4, 5])
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(9);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number content state (in array xyz)", () => {
      class NumberTestClass {
        @V.InArray([1, 2, 3, 4, 5])
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(3);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate number metadata (multiple of xyz)", () => {
      class NumberTestClass {
        @V.MultipleOf(4)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(10);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate number metadata (multiple of xyz)", () => {
      class NumberTestClass {
        @V.MultipleOf(4)
        private testProp: number;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new NumberTestClass(12);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });
  }); // category end

  describe("for boolean type", () => {
    // boolean validation tests
    it("should NOT validate boolean metadata (in array xyz)", () => {
      class BooleanTestClass {
        @V.InArray([true])
        private testProp: boolean;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass(false);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate boolean metadata (in array xyz)", () => {
      class BooleanTestClass {
        @V.InArray([true])
        private testProp: boolean;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate boolean content state (defined)", () => {
      class BooleanTestClass {
        @V.IsDefined()
        private testProp: boolean;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass(undefined);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate boolean content state (defined)", () => {
      class BooleanTestClass {
        @V.IsDefined()
        private testProp: boolean;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass(false);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate boolean content state (empty)", () => {
      class BooleanTestClass {
        @V.IsEmpty()
        private testProp: boolean;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass(true);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate boolean content state (empty)", () => {
      class BooleanTestClass {
        @V.IsEmpty()
        private testProp: boolean;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass();
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate boolean content state (filled)", () => {
      class BooleanTestClass {
        @V.IsNotEmpty()
        private testProp: boolean;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass();
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate boolean content state (filled)", () => {
      class BooleanTestClass {
        @V.IsNotEmpty()
        private testProp: boolean;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass(false);
      validationResult = testValidator.validate(localTestClass);

      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });
  }); // category end

  describe("for array type", () => {
    // array validation tests
    it("should NOT validate array content state (contains xyz)", () => {
      class ArrayTestClass {
        @V.Contains("base")
        private testProp: string[];
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass(["desoxyribonucleic", "acid"]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array content state (contains xyz)", () => {
      class ArrayTestClass {
        @V.Contains("base")
        private testProp: string[];
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass(["amino", "acid", "base", "pairs"]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //  console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "]");
      // }
      should.equal(validationResult.length, 0);
      validationResult = [];
    });

    it("should NOT validate array items (in array xyz)", () => {
      class ArrayTestClass {
        @V.InArray([[true], ["boolean"]])
        private testProp: boolean[];
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array items (in array xyz)", () => {
      class ArrayTestClass {
        @V.InArray([[true], ["boolean"]])
        private testProp: boolean[];
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([true]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    it("should NOT validate array type (number[][])", () => {
      class ArrayTestClass {
        @V.ValidateType([Number, [Number, String]])
        private testProp: number[][];
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([[false]]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array type (number[][])", () => {
      class ArrayTestClass {
        @V.ValidateType([Number, [Number, String]])
        private testProp: number[][];
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([["false"]]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    it("should NOT validate array type (Array<Array<number>>)", () => {
      class ArrayTestClass {
        @V.ValidateType([[Number]])
        private testProp: Array<Array<number>>;
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([[false]]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array type (Array<Array<number>>)", () => {
      class ArrayTestClass {
        @V.ValidateType([[Number]])
        private testProp: Array<Array<number>>;
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([[123, 456]]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    it("should NOT validate array type (mixed)", () => {
      class ArrayTestClass {
        @V.ValidateType([Boolean, Number, String])
        private testProp: (boolean | number | string)[];
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([new InnermostTestClass()]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array type (mixed)", () => {
      class ArrayTestClass {
        @V.ValidateType([Boolean, Number, String])
        private testProp: (boolean | number | string)[];
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([false, true]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    it("should NOT validate array type (class[])", () => {
      class ArrayTestClass {
        @V.ValidateType([InnermostTestClass])
        private testProp: InnermostTestClass[];
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([false]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate array type (class[])", () => {
      class ArrayTestClass {
        @V.ValidateType([InnermostTestClass])
        private testProp: InnermostTestClass[];
        constructor(value?: any[]) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ArrayTestClass([new InnermostTestClass()]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });
  }); // category end

  describe("for class type", () => {
    // class validation tests

    it("should NOT validate type (class)", () => {
      class ClassesTestClass {
        @V.ValidateType()
        private testProp: InnermostTestClass;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ClassesTestClass([101]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.be.above(0);
      validationResult = [];
    });

    it("should validate type (class)", () => {
      class ClassesTestClass {
        @V.ValidateType()
        private testProp: InnermostTestClass;
        constructor(value?: any) {
          this.testProp = value;
        }
      }
      testValidator = new V.Validator();
      localTestClass = new ClassesTestClass(new InnermostTestClass());
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
      //   console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      // }
      (validationResult.length).should.equal(0);
      validationResult = [];
    });

    /* // WIP
    it("should validate type (union)", () => {
      class BooleanTestClass {
        constructor(value?: any) {
          this.testProp = value;
        }
        @V.ValidateType()
        private testProp: boolean | number | string;
      }
      // console.log("requested type instance: ");
      // let union = new (Boolean | Number | String)();
      // console.log(union);
      testValidator = new V.Validator();
      localTestClass = new BooleanTestClass([101]);
      validationResult = testValidator.validate(localTestClass);
      // if (validationResult.length > 0) {
        console.log(indent + validationResult[0].message + " [" + validationResult[0].value + "] in [" + validationResult[0].comparison + "]");
      }
      should.equal(validationResult.length, 0);
      validationResult = [];
    })
    */
  }); // category end
}); // test end
