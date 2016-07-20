'use strict';
import 'reflect-metadata';
import validatorjs = require('validator');

export class validatorTypes {
  static MAX_LEN = 'max_len';
  static MIN_LEN = 'min_len';
  static CONTAINS = 'contains';
  static IS_EMPTY = 'is_empty';
  static NOT_EMPTY = 'not_empty';
  static ALPHA_NUM = 'alpha_num';
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

  validate(target: Object, validatorOptions?: ValidatorOptions) {
    for (let propertyName in target) {
      if (!target.hasOwnProperty(propertyName)) {
        continue;
      }
      let keys = Reflect.getMetadataKeys(target, propertyName);
      let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
      let types = Reflect.getMetadata('design:type', target, propertyName);
      let errors: string[] = [];
      // console.log(validators + '\n' + types);

      for (let validator of validators) {
        switch (validator.type) {
          case validatorTypes.MAX_LEN:
            if (target[propertyName].length > validator.value) {
              errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' too long.');
            };
          case validatorTypes.MIN_LEN:
            if (target[propertyName].length < validator.value) {
              errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' too short.');
            };
          case validatorTypes.CONTAINS:
            if (!target[propertyName].toString.contains(validator.value)) {
              errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' too short.');
            };
          case validatorTypes.ALPHA_NUM:
            console.log(target[propertyName]);
            if (validatorjs.isAlpha(target[propertyName])) {
              errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is alphanumeric');
            };
        }
      }
    }
  }
}


export function MaxLen(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: 'max_len', value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function MinLen(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: 'min_len', value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function Contains(value: string, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: validatorTypes.CONTAINS, value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function IsEmpty(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: validatorTypes.IS_EMPTY, value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function IsNotEmpty(value, validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    validators.push({ type: validatorTypes.NOT_EMPTY, value: value, validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}

export function AlphaNum(validatorOptions?: ValidatorOptions) {
  return function(target: Object, propertyName: string) {
    let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
    if (!validators) {
      validators = [];
    }
    console.log(validatorTypes);
    validators.push({ type: 'alpha_num', validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
  };
}
