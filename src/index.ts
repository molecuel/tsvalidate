'use strict';
import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
import * as decorators from './decorators';
import validator = require('validator');

export class Validator {

  private errors: string[] = [];

  public validate(target: Object, validatorOptions?: IValidatorOptions) {

    for (let propertyName in target) {
      // Check object for property.
      if (!target.hasOwnProperty(propertyName)) {
        continue;
      }
      // Get system- and validator-predefined Metadata, then check for sufficient results.
      let types = Reflect.getMetadata('design:type', target, propertyName);
      let metadata = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
      if (metadata !== undefined
        && types !== undefined) {
        // Loop over sets of Metadata, execute requested type dependant validation.
        for (let metadataEntry of metadata) {
          switch (types.name) {
            case 'String':
              this.validateString(target, propertyName, metadataEntry);
              break;
            case 'Number':
              this.validateNumber(target, propertyName, metadataEntry);
              break;
            case 'Boolean':
              break;
          }
          // Execute requested type independant validation.
          switch (metadataEntry.type) {
            case decorators.DecoratorTypes.IS_STRING:
              if (types.name !== 'String') {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no string.');
              }
              break;
            case decorators.DecoratorTypes.IS_BOOL:
              if (types.name !== 'Boolean') {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not of type Boolean.');
              }
              break;
            case decorators.DecoratorTypes.IS_NUMBER:
              if (types.name !== 'Number') {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no number.');
              }
              break;
            case decorators.DecoratorTypes.IS_INT:
              if (!validator.isInt(target[propertyName].toString())) {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not of type Integer.');
              }
              break;
            case decorators.DecoratorTypes.IS_FLOAT:
              if (!validator.isFloat(target[propertyName].toString())) {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not of type Float.');
              }
              break;
            case decorators.DecoratorTypes.IS_DECIMAL:
              if (!validator.isDecimal(target[propertyName].toString())) {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not of type Decimal.');
              }
              break;
            case decorators.DecoratorTypes.NOT_EMPTY:
              if (target[propertyName] === ''
                || target[propertyName] === null
                || target[propertyName] === undefined) {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is empty.');
              }
              break;
            case decorators.DecoratorTypes.IS_EMPTY:
              if (target[propertyName] !== ''
                && target[propertyName] !== null
                && target[propertyName] !== undefined) {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not empty.');
              }
              break;
            case decorators.DecoratorTypes.DEFINED:
              if (target[propertyName] !== null
                && target[propertyName] !== undefined) {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not defined.');
              }
              break;
            case decorators.DecoratorTypes.IN_ARRAY:
              if (!validator.isIn(target[propertyName].toString(), metadataEntry.value)) {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' not found in relevant array.');
              }
              break;
            case decorators.DecoratorTypes.MATCHING:
              if (!validator.matches(target[propertyName].toString(), metadataEntry.value)) {
                this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' does not match' + metadataEntry.value + '.');
              }
              break;
          }
        }
      }
    }
    if (this.errors.length > 0) {
      return this.errors;
    } else {
      return;
    }
  }

  private validateString(target: Object, propertyName: string, metadataEntry: any) {
    switch (metadataEntry.type) {
      case decorators.DecoratorTypes.MAX_LEN:
        if (!validator.isLength(target[propertyName], { max: metadataEntry.value })) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is too long.');
        }
        break;
      case decorators.DecoratorTypes.MIN_LEN:
        if (!validator.isLength(target[propertyName], { min: metadataEntry.value })) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is too short.');
        }
        break;
      case decorators.DecoratorTypes.CONTAINS:
        if (!validator.contains(target[propertyName], metadataEntry.value)) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' does not contain ' + metadataEntry.value + '.');
        }
        break;
      case decorators.DecoratorTypes.ALPHA:
        if (!validator.isAlpha(target[propertyName])) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not exclusively composed of letter characters.');
        }
        break;
      case decorators.DecoratorTypes.ALPHA_NUM:
        if (!validator.isAlphanumeric(target[propertyName])) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not alphanumeric.');
        }
        break;
      case decorators.DecoratorTypes.DATE:
        if (!validator.isDate(target[propertyName])) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not a date.');
        }
        break;
      case decorators.DecoratorTypes.DATE_ISO8601:
        if (!validator.isISO8601(target[propertyName])) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not a ISO8601 conform date.');
        }
        break;
      case decorators.DecoratorTypes.DATE_AFTER:
        if (!validator.isAfter(target[propertyName]), metadataEntry.value) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not a date after ' + validator.toDate(metadataEntry.value) + '.');
        }
        break;
      case decorators.DecoratorTypes.DATE_BEFORE:
        if (!validator.isBefore(target[propertyName]), metadataEntry.value) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not a date before ' + validator.toDate(metadataEntry.value) + '.');
        }
        break;
      case decorators.DecoratorTypes.UPPERCASE:
        if (!validator.isUppercase(target[propertyName])) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not uppercase.');
        }
        break;
      case decorators.DecoratorTypes.LOWERCASE:
        if (!validator.isLowercase(target[propertyName])) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not lowercase.');
        }
        break;
      case decorators.DecoratorTypes.MOBILE_PHONE_NUMBER:
        if (!validator.isMobilePhone(target[propertyName], metadataEntry.value)) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no mobile phone number.');
        }
        break;
    }
  }

  private validateNumber(target: Object, propertyName: string, metadataEntry: any) {
    switch (metadataEntry.type) {
      case decorators.DecoratorTypes.MAX_LEN:
        if (!validator.isLength(target[propertyName].toString(), { max: metadataEntry.value })) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is too long.');
        }
        break;
      case decorators.DecoratorTypes.MIN_LEN:
        if (!validator.isLength(target[propertyName].toString(), { min: metadataEntry.value })) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is too short.');
        }
        break;
      case decorators.DecoratorTypes.CONTAINS:
        if (!validator.contains(target[propertyName].toString(), metadataEntry.value)) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' does not contain ' + metadataEntry.value + '.');
        }
        break;
      case decorators.DecoratorTypes.MOBILE_PHONE_NUMBER:
        if (!validator.isMobilePhone(target[propertyName].toString(), metadataEntry.value)) {
          this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no mobile phone number.');
        }
        break;
    }
  }
}
