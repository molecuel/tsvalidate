'use strict';
import 'reflect-metadata';
import each from 'async/each';
let validatejs = require('validate.js');


export class TestClass {

  constructor(name: string) {
    this.testString = name;
  }

  @MinLen(2)
  @MaxLen(10)
  testString: string;
}

export interface ValidatorError {
  /**
   * Name of the target class that was validated.
   */
  target: string;
  /**
   * Target's property on which validation is applied.
   */
  property: string;
  /**
   * Error's type.
   */
  type: string;
  /**
   * Error's message.
   */
  message: string;
  /**
   * Value of that target's property, that didn't pass a validation.
   */
  value: any;
}

/**
 * Options used to pass to validation decorators.
 */
export interface ValidatorOptions {
  /**
   * Specifies if validated value is an array and each of its item must be validated.
   */
  each?: boolean;
  /**
   * Error message used to be used on validation fail.
   * You can use '$value' to use value that was failed by validation.
   * You can use '$constraint1' and '$constraint2' keys in the message string,
   * and they will be replaced with constraint values if they exist.
   * Message can be either string, either a function that returns a string.
   * Second option allows to use values and custom messages depend of them.
   */
  message?: string | ((value?: any, constraint1?: any, constraint2?: any) => string);
  /**
   * Validation groups used for this validation.
   */
  groups?: string[];
  /**
   * Indicates if validation must be performed always, no matter of validation groups used.
   */
  always?: boolean;
}

export class Validator {

  async getCustMetadata(target: Object, callback, validatorOptions?: ValidatorOptions) {

  }

  validate(target: Object, validatorOptions?: ValidatorOptions) {
    for (let propertyName in target) {
      if (!target.hasOwnProperty(propertyName)) {
        continue;
      }
      let keys = Reflect.getMetadataKeys(target, propertyName);
      let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
      let types = Reflect.getMetadata('design:type', target, propertyName);
      // console.log(validators + '\n' + types);
      //

      // for (let validator in validators) {
      //   switch(validator.type) {
      //       case "MaxLen":
      //         if (target[propertyName] > )
    }
  }
}



export function MaxLen(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: 'MaxLen', value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function MinLen(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: 'MinLen', value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function Contains(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: 'Contains', value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function IsEmpty(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: 'IsEmpty', value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function IsNotEmpty(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: 'IsNotEmpty', value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}
