'use strict';
import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
import { IValidatorError } from './interfaces/IValidatorError';
import * as decorators from './decorators';
import validator = require('validator');

export class Validator {

  private errors: IValidatorError[] = [];
  private nestedMode: boolean = false;

  /**
   * Validate via decorator predefined metadata of properties of objects and nested objects. Returns error messages via array of the IValidatorError interface.
   * @param target Object
   * @param validatorOptions IValidatorOptions optional
   * @return IValidatorError[]
   */
  public validate(target: Object, validatorOptions?: IValidatorOptions): IValidatorError[] {

    for (let propertyName in target) {
      // Check object for property.
      if (!target.hasOwnProperty(propertyName)) {
        continue;
      }
      // Get system- and validator-predefined Metadata, then check for sufficient results.
      let types = Reflect.getMetadata('design:type', target, propertyName);
      let metadata = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
      if (types !== undefined) {
        switch (types.name) {

          case 'String':
            if (typeof target[propertyName] !== 'string') {

              this.errors.push({
                target: target.constructor.name,
                property: propertyName,
                type: decorators.DecoratorTypes.IS_TYPED,
                message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a string.'
              });
            }
            break;

          case 'Number':
            if (typeof target[propertyName] !== 'number') {

              this.errors.push({
                target: target.constructor.name,
                property: propertyName,
                type: decorators.DecoratorTypes.IS_TYPED,
                message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a number.'
              });
            }
            break;

          case 'Boolean':
            if (typeof target[propertyName] !== 'boolean') {

              this.errors.push({
                target: target.constructor.name,
                property: propertyName,
                type: decorators.DecoratorTypes.IS_TYPED,
                message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Boolean.'
              });
            }
            break;
        }
        if (metadata !== undefined) {
          // Loop over sets of Metadata, execute requested type dependant validation.
          for (let metadataEntry of metadata) {
            if (metadataEntry.type === decorators.DecoratorTypes.NESTED
              && typeof target[propertyName] === 'object') {
              this.nestedMode = true;
              this.validate(target[propertyName], validatorOptions);
            }
            else if (metadataEntry.type === decorators.DecoratorTypes.IS_TYPED
              && typeof target[propertyName] === 'object') {
                // chech object type via target.constructor.name
            }
            else {
              this.nestedMode = false;
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
                case decorators.DecoratorTypes.IS_INT:
                  if (!validator.isInt(target[propertyName].toString())) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IS_INT, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Integer.' });
                  }
                  break;
                case decorators.DecoratorTypes.IS_FLOAT:
                  if (!validator.isFloat(target[propertyName].toString())) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IS_FLOAT, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Float.' });
                  }
                  break;
                case decorators.DecoratorTypes.IS_DECIMAL:
                  if (!validator.isDecimal(target[propertyName].toString())) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IS_DECIMAL, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Decimal.' });
                  }
                  break;
                case decorators.DecoratorTypes.NOT_EMPTY:
                  if (target[propertyName] === ''
                    || target[propertyName] === null
                    || target[propertyName] === undefined) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.NOT_EMPTY, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is empty.' });
                  }
                  break;
                case decorators.DecoratorTypes.IS_EMPTY:
                  if (target[propertyName] !== ''
                    && target[propertyName] !== null
                    && target[propertyName] !== undefined) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IS_EMPTY, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not empty.' });
                  }
                  break;
                case decorators.DecoratorTypes.DEFINED:
                  if (target[propertyName] === null
                    || target[propertyName] === undefined) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.DEFINED, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not defined.' });
                  }
                  break;
                case decorators.DecoratorTypes.IN_ARRAY:
                  if (!validator.isIn(target[propertyName].toString(), metadataEntry.value)) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IN_ARRAY, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' not found in relevant array.', value: metadataEntry.value });
                  }
                  break;
                case decorators.DecoratorTypes.EQUALS:
                  if (!validator.isIn(target[propertyName].toString(), metadataEntry.value.toString())) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.EQUALS, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' not equal to \"' + metadataEntry.value.toString() + '\".', value: metadataEntry.value });
                  }
                  break;
              }
            }
          }
        }
      }
      else {
        continue;
      }
    }
    if (// this.errors.length > 0 &&
      !this.nestedMode) {
      return this.errors;
    } else {
      return [];
    }
  }

  /**
   * Validates metadata of properties of type string.
   * @param target Object
   * @param propertyName string
   * @param metadataEntry any
   */
  protected validateString(target: Object, propertyName: string, metadataEntry: any) {
    switch (metadataEntry.type) {
      case decorators.DecoratorTypes.MAX_LEN:
        if (!validator.isLength(target[propertyName], { max: metadataEntry.value })) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MAX_LEN, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' digit(s).', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.MIN_LEN:
        if (!validator.isLength(target[propertyName], { min: metadataEntry.value })) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MIN_LEN, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' digit(s).', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.MAX_BYTE_LEN:
        if (!validator.isByteLength(target[propertyName], { max: metadataEntry.value })) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MAX_BYTE_LEN, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' byte(s).', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.MIN_BYTE_LEN:
        if (!validator.isByteLength(target[propertyName], { min: metadataEntry.value })) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MIN_BYTE_LEN, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' byte(s).', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.CONTAINS:
        if (!validator.contains(target[propertyName], metadataEntry.value)) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.CONTAINS, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' does not contain \"' + metadataEntry.value + '\".', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.ALPHA:
        if (!validator.isAlpha(target[propertyName].toString().replace(' ', ''))) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.ALPHA, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not exclusively composed of letter characters.' });
        }
        break;
      case decorators.DecoratorTypes.ALPHA_NUM:
        if (!validator.isAlphanumeric(target[propertyName].toString().replace(' ', ''))) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.ALPHA_NUM, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not alphanumeric.' });
        }
        break;
      case decorators.DecoratorTypes.DATE:
        if (!validator.isDate(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.DATE, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a date.' });
        }
        break;
      case decorators.DecoratorTypes.DATE_ISO8601:
        if (!validator.isISO8601(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.DATE_ISO8601, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a ISO8601 conform date.' });
        }
        break;
      case decorators.DecoratorTypes.DATE_AFTER:
        if (!validator.isAfter(target[propertyName]), metadataEntry.value) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.DATE_AFTER, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a date after ' + validator.toDate(metadataEntry.value) + '.', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.DATE_BEFORE:
        if (!validator.isBefore(target[propertyName]), metadataEntry.value) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.DATE_BEFORE, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a date before ' + validator.toDate(metadataEntry.value) + '.', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.UPPERCASE:
        if (!validator.isUppercase(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.UPPERCASE, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not uppercase.' });
        }
        break;
      case decorators.DecoratorTypes.LOWERCASE:
        if (!validator.isLowercase(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.LOWERCASE, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not lowercase.' });
        }
        break;
      case decorators.DecoratorTypes.MOBILE_PHONE_NUMBER:
        if (!validator.isMobilePhone(target[propertyName], metadataEntry.value)) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MOBILE_PHONE_NUMBER, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no mobile phone number.', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.HEXADECIMAL:
        if (!validator.isHexadecimal(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.HEXADECIMAL, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no hexadecimal number.', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.EMAIL:
        if (!validator.isEmail(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.EMAIL, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no valid email address.' });
        }
        break;
      case decorators.DecoratorTypes.HEX_COLOR:
        if (!validator.isHexColor(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.HEX_COLOR, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no hexadecimal color.' });
        }
        break;
      case decorators.DecoratorTypes.MAC_ADDRESS:
        if (!validator.isMACAddress(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MAC_ADDRESS, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no MAC address.' });
        }
        break;
      case decorators.DecoratorTypes.MONGO_ID:
        if (!validator.isMongoId(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MONGO_ID, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no MongoDB ObjectID.' });
        }
        break;
      case decorators.DecoratorTypes.URL:
        if (!validator.isURL(target[propertyName])) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.URL, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no URL.' });
        }
        break;
      case decorators.DecoratorTypes.IP_ADDRESS:
        if (metadataEntry.value === null
          || metadataEntry.value === undefined) {
          if (!validator.isIP(target[propertyName], 4)
            && !validator.isIP(target[propertyName], 6)) {
            this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IP_ADDRESS, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no valid IP address.' });
          }
        }
        else if (metadataEntry.value !== 4
          || metadataEntry.value !== 6) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IP_ADDRESS, message: 'Could not validate property ' + propertyName + ' of ' + target.constructor.name + '. ' + metadataEntry.value + ' is no valid Internet Protocol version.', value: metadataEntry.value });
        }
        else {
          if (!validator.isIP(target[propertyName], metadataEntry.value)) {
            this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IP_ADDRESS, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no valid IP' + metadataEntry.value + ' address.', value: metadataEntry.value });
          }
        }
        break;
    }
  }

  /**
   * Validates metadata of properties of type numbers.
   * @param target Object
   * @param propertyName string
   * @param metadataEntry any
   */
  protected validateNumber(target: Object, propertyName: string, metadataEntry: any) {
    switch (metadataEntry.type) {
      case decorators.DecoratorTypes.MAX_LEN:
        if (!validator.isLength(target[propertyName].toString(), { max: metadataEntry.value })) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MAX_LEN, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' digit(s).', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.MIN_LEN:
        if (!validator.isLength(target[propertyName].toString(), { min: metadataEntry.value })) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MIN_LEN, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' digit(s).', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.MAX_VALUE:
        if (!validator.isFloat(target[propertyName].toString(), { max: metadataEntry.value })) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MAX_VALUE, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is bigger than ' + metadataEntry.value + '.', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.MIN_VALUE:
        if (!validator.isFloat(target[propertyName].toString(), { min: metadataEntry.value })) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MIN_VALUE, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is smaller than ' + metadataEntry.value + '.', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.CONTAINS:
        if (!validator.contains(target[propertyName].toString(), metadataEntry.value.toString())) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.CONTAINS, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' does not contain \"' + metadataEntry.value + '\".', value: metadataEntry.value });
        }
        break;
      case decorators.DecoratorTypes.MULTIPLE_OF:
        if (!validator.isDivisibleBy(target[propertyName].toString(), metadataEntry.value)) {
          this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.MULTIPLE_OF, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no multiple of ' + metadataEntry.value + '.', value: metadataEntry.value });
        }
        break;
    }
  }

}
