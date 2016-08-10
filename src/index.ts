'use strict';
import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
import { IValidatorError } from './interfaces/IValidatorError';
export * from './interfaces/IValidatorError';
import * as decorators from './decorators';
export * from './decorators';
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
      if (!({}).hasOwnProperty.call(target, propertyName)) {
        continue;
      }
      // Get system- and validator-predefined Metadata, then check for sufficient results.
      let types = Reflect.getMetadata('design:type', target, propertyName);
      let metadata = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
      if (types !== undefined
        && metadata !== undefined) {
        // Loop over sets of Metadata, execute requested validation.
        for (let metadataEntry of metadata) {
          if (metadataEntry.type === decorators.DecoratorTypes.NESTED
            && typeof target[propertyName] === 'object') {
            this.nestedMode = true;
            this.validate(target[propertyName], validatorOptions);
          }
          else {
            this.nestedMode = false;

            // Execute requested type dependant validation.
            this.validateString(target, propertyName, metadataEntry);
            this.validateNumber(target, propertyName, metadataEntry);

            // Execute requested type independant validation.
            switch (metadataEntry.type) {

              case decorators.DecoratorTypes.IS_TYPED:
                switch (types.name) {

                  // declared type: any
                  case 'Object':
                    if (metadataEntry.value
                      && target[propertyName] !== null) {

                      if (!(target[propertyName] instanceof metadataEntry.value
                        || metadataEntry.value.name.toString().toLowerCase() === typeof target[propertyName])) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: propertyName,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type ' + metadataEntry.value.name + '.',
                          value: target[propertyName]
                        });
                      }
                    }
                    break;

                  // declared type: string
                  case 'String':
                    if (target[propertyName] !== null) {

                      if ((metadataEntry.value
                        && !(target[propertyName] instanceof metadataEntry.value))
                        || (!metadataEntry.value
                          && (typeof target[propertyName] !== 'string'))) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: propertyName,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a string.',
                          value: target[propertyName]
                        });
                      }
                    }
                    break;

                  // declared type: number
                  case 'Number':
                    if (target[propertyName] !== null) {

                      if ((metadataEntry.value
                        && !(target[propertyName] instanceof metadataEntry.value))
                        || (!metadataEntry.value
                          && (typeof target[propertyName] !== 'number'))) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: propertyName,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a number.',
                          value: target[propertyName]
                        });
                      }
                    }
                    break;

                  // declared type: boolean
                  case 'Boolean':
                    if (target[propertyName] !== null) {

                      if ((metadataEntry.value
                        && !(target[propertyName] instanceof metadataEntry.value))
                        || (!metadataEntry.value
                          && (typeof target[propertyName] !== 'boolean'))) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: propertyName,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Boolean.',
                          value: target[propertyName]
                        });
                      }
                    }
                    break;

                  // declared type: object
                  default:
                    if (target[propertyName]) {

                      if ((metadataEntry.value
                        && !(target[propertyName] instanceof metadataEntry.value))
                        || (!metadataEntry.value
                          && !(target[propertyName] instanceof types))) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: propertyName,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type ' + types.name + '.',
                          value: target[propertyName]
                        });
                      }
                    }
                    break;
                }
                break;

              case decorators.DecoratorTypes.IS_INT:
                if (!validator.isInt(target[propertyName].toString())
                  || typeof target[propertyName] !== 'number') {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.IS_INT,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Integer.',
                    value: target[propertyName]
                  });
                }
                break;
              case decorators.DecoratorTypes.IS_FLOAT:
                if (!validator.isFloat(target[propertyName].toString())
                  || typeof target[propertyName] !== 'number') {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.IS_FLOAT,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Float.',
                    value: target[propertyName]
                  });
                }
                break;
              case decorators.DecoratorTypes.IS_DECIMAL:
                if (!validator.isDecimal(target[propertyName].toString())
                  || typeof target[propertyName] !== 'number') {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.IS_DECIMAL,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Decimal.',
                    value: target[propertyName]
                  });
                }
                break;
              case decorators.DecoratorTypes.NOT_EMPTY:
                if (target[propertyName] === ''
                  || target[propertyName] === null
                  || target[propertyName] === undefined) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.NOT_EMPTY,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is empty.',
                    value: target[propertyName]
                  });
                }
                break;
              case decorators.DecoratorTypes.IS_EMPTY:
                if (target[propertyName] !== ''
                  && target[propertyName] !== null
                  && target[propertyName] !== undefined) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.IS_EMPTY,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not empty.',
                    value: target[propertyName]
                  });
                }
                break;
              case decorators.DecoratorTypes.DEFINED:
                if (target[propertyName] === undefined) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.DEFINED,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not defined.',
                    value: target[propertyName]
                  });
                }
                break;
              case decorators.DecoratorTypes.IN_ARRAY:
                if (!validator.isIn(target[propertyName].toString(), metadataEntry.value)) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.IN_ARRAY,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' not found in relevant array.',
                    value: target[propertyName],
                    comparison: metadataEntry.value
                  });
                }
                break;
              case decorators.DecoratorTypes.NOT_IN_ARRAY:
                if (validator.isIn(target[propertyName].toString(), metadataEntry.value)) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.NOT_IN_ARRAY,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' found in array of disallowed values.',
                    value: target[propertyName],
                    comparison: metadataEntry.value
                  });
                }
                break;
              case decorators.DecoratorTypes.EQUALS:
                if (!validator.equals(target[propertyName].toString(), metadataEntry.value.toString())) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName, type: decorators.DecoratorTypes.EQUALS,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' not equal to ' + metadataEntry.value.toString() + '.',
                    value: target[propertyName],
                    comparison: metadataEntry.value
                  });
                }
                break;
              case decorators.DecoratorTypes.MAX_LEN:
                if (typeof target[propertyName] !== 'string'
                  && typeof target[propertyName] !== 'number') {
                  this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'Number or String', metadataEntry.value));
                }
                else if (!validator.isLength(target[propertyName].toString(), { max: metadataEntry.value })) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.MAX_LEN,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' digit(s).',
                    value: target[propertyName],
                    comparison: metadataEntry.value
                  });
                }
                break;
              case decorators.DecoratorTypes.MIN_LEN:
                if (typeof target[propertyName] !== 'string'
                  && typeof target[propertyName] !== 'number') {
                  this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'Number or String', metadataEntry.value));
                }
                else if (!validator.isLength(target[propertyName].toString(), { min: metadataEntry.value })) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.MIN_LEN,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' digit(s).',
                    value: target[propertyName],
                    comparison: metadataEntry.value
                  });
                }
                break;
              case decorators.DecoratorTypes.CONTAINS:
                if (typeof target[propertyName] !== 'string'
                  && typeof target[propertyName] !== 'number') {
                  this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'Number or String', metadataEntry.value));
                }
                else if (!validator.contains(target[propertyName].toString(), metadataEntry.value)) {

                  this.errors.push({
                    target: target.constructor.name,
                    property: propertyName,
                    type: decorators.DecoratorTypes.CONTAINS,
                    message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' does not contain ' + metadataEntry.value + '.',
                    value: target[propertyName],
                    comparison: metadataEntry.value
                  });
                }
                break;
            }
          }
        }
      }
      else {
        continue;
      }
    }
    if (!this.nestedMode) {
      return this.errors;
    } else {
      return [];
    }
  } // method end (validate)

  /**
   * Validates metadata of properties of type string.
   * @param target Object
   * @param propertyName string
   * @param metadataEntry any
   */
  protected validateString(target: Object, propertyName: string, metadataEntry: any) {
    switch (metadataEntry.type) {

      case decorators.DecoratorTypes.MAX_BYTE_LEN:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isByteLength(target[propertyName], { max: metadataEntry.value })) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.MAX_BYTE_LEN,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' byte(s).',
            value: target[propertyName],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.MIN_BYTE_LEN:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isByteLength(target[propertyName], { min: metadataEntry.value })) {
          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.MIN_BYTE_LEN,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' byte(s).',
            value: target[propertyName],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.ALPHA:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isAlpha(target[propertyName].toString().replace(/\s/g, ''))) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.ALPHA,
            message: 'Property ' +
            propertyName + ' of ' +
            target.constructor.name + ' is not exclusively composed of letter characters.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.ALPHA_NUM:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isAlphanumeric(target[propertyName].toString().replace(/\s/g, ''))) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.ALPHA_NUM,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not alphanumeric.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.DATE:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isDate(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.DATE,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a date.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.DATE_ISO8601:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isISO8601(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.DATE_ISO8601,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a ISO8601 conform date.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.DATE_AFTER:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isAfter(target[propertyName], metadataEntry.value)) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.DATE_AFTER,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a date after ' + validator.toDate(metadataEntry.value) + '.',
            value: target[propertyName],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.DATE_BEFORE:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isBefore(target[propertyName], metadataEntry.value)) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.DATE_BEFORE, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not a date before ' + validator.toDate(metadataEntry.value) + '.',
            value: target[propertyName],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.UPPERCASE:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isUppercase(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.UPPERCASE,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not uppercase.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.LOWERCASE:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isLowercase(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.LOWERCASE,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not lowercase.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.HEXADECIMAL:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isHexadecimal(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.HEXADECIMAL,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no hexadecimal number.',
            value: target[propertyName],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.EMAIL:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isEmail(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.EMAIL,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no valid email address.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.HEX_COLOR:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isHexColor(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.HEX_COLOR,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no hexadecimal color.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.MAC_ADDRESS:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isMACAddress(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.MAC_ADDRESS,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no MAC address.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.MONGO_ID:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isMongoId(target[propertyName])) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: decorators.DecoratorTypes.MONGO_ID,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no MongoDB ObjectID.',
            value: target[propertyName]
          });
        }
        break;
      case decorators.DecoratorTypes.IP_ADDRESS:
        if (typeof target[propertyName] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'String', metadataEntry.value));
        }
        else {
          if (metadataEntry.value === null
            || metadataEntry.value === undefined) {

            if (!validator.isIP(target[propertyName], 4)
              && !validator.isIP(target[propertyName], 6)) {

              this.errors.push({
                target: target.constructor.name,
                property: propertyName,
                type: decorators.DecoratorTypes.IP_ADDRESS,
                message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no valid IP address.',
                value: target[propertyName]
              });
            }
          }
          else if (metadataEntry.value !== 4
            || metadataEntry.value !== 6) {

            this.errors.push({
              target: target.constructor.name,
              property: propertyName,
              type: decorators.DecoratorTypes.IP_ADDRESS,
              message: 'Could not validate property ' + propertyName + ' of ' + target.constructor.name + '. ' + metadataEntry.value + ' is no valid Internet Protocol version.',
              value: target[propertyName],
              comparison: metadataEntry.value
            });
          }
          else {
            if (!validator.isIP(target[propertyName], metadataEntry.value)) {

              this.errors.push({
                target: target.constructor.name,
                property: propertyName,
                type: decorators.DecoratorTypes.IP_ADDRESS,
                message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no valid IP' + metadataEntry.value + ' address.',
                value: target[propertyName],
                comparison: metadataEntry.value
              });
            }
          }
        }
        break;
    }
  } // method end (validateString)

  /**
   * Validates metadata of properties of type number.
   * @param target Object
   * @param propertyName string
   * @param metadataEntry any
   */
  protected validateNumber(target: Object, propertyName: string, metadataEntry: any) {
    switch (metadataEntry.type) {

      case decorators.DecoratorTypes.MAX_VALUE:
        if (typeof target[propertyName] !== 'number') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'Number', metadataEntry.value));
        }
        else if (!validator.isFloat(target[propertyName].toString(), { max: metadataEntry.value })) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: metadataEntry.type,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is bigger than ' + metadataEntry.value + '.',
            value: target[propertyName],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.MIN_VALUE:
        if (typeof target[propertyName] !== 'number') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'Number', metadataEntry.value));
        }
        else if (!validator.isFloat(target[propertyName].toString(), { min: metadataEntry.value })) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: metadataEntry.type,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is smaller than ' + metadataEntry.value + '.',
            value: target[propertyName],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.MULTIPLE_OF:
        if (typeof target[propertyName] !== 'number') {
          this.errors.push(this.validationTypeConflict(target, propertyName, metadataEntry.type, 'Number', metadataEntry.value));
        }
        else if (!validator.isDivisibleBy(target[propertyName].toString(), metadataEntry.value)) {

          this.errors.push({
            target: target.constructor.name,
            property: propertyName,
            type: metadataEntry.type,
            message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no multiple of ' + metadataEntry.value + '.',
            value: target[propertyName],
            comparison: metadataEntry.value
          });
        }
        break;
    }
  } // method end (validateNumber)

  protected validationTypeConflict(target: any, property: string, type: string, conflict: string, comparison?: any): IValidatorError {
    return {
      target: target.constructor.name,
      property: property,
      type: type,
      message: 'Property ' + property + ' of ' + target.constructor.name + ' is not of type ' + conflict + '.',
      value: target[property],
      comparison: comparison
    };
  } // method end (validationTypeConflict)

} // class end (Validator)
