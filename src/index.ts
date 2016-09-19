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

    let metadata = Reflect.getMetadata(decorators.METADATAKEY, target);
    // Loop over sets of Metadata, execute requested validation.
    for (let metadataEntry of metadata) {
      if (metadataEntry.type === decorators.DecoratorTypes.NESTED
        && typeof target[metadataEntry.property] === 'object') {
        this.nestedMode = true;
        this.validate(target[metadataEntry.property], validatorOptions);
      }
      else {

        this.nestedMode = false;
        // Get system- and validator-predefined Metadata, then check for sufficient results.
        if (metadataEntry.type === decorators.DecoratorTypes.DEFINED
          && typeof target[metadataEntry.property] === 'undefined') {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.DEFINED,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not defined.',
            value: target[metadataEntry.property]
          });
        }
        else if (metadataEntry.type === decorators.DecoratorTypes.NOT_EMPTY
          && (target[metadataEntry.property] === ''
            || target[metadataEntry.property] === null
            || target[metadataEntry.property] === undefined)) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.NOT_EMPTY,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is empty.',
            value: target[metadataEntry.property]
          });
        }
        else if (typeof target[metadataEntry.property] !== 'undefined'
          && target[metadataEntry.property] !== null) {

          let types = Reflect.getMetadata('design:type', target, metadataEntry.property);
          // Execute requested type dependant validation.
          this.validateString(target, metadataEntry);
          this.validateNumber(target, metadataEntry);

          // Execute requested type independant validation.
          switch (metadataEntry.type) {

            case decorators.DecoratorTypes.IS_TYPED:

              if (typeof types !== 'undefined') {
                switch (types.name.split('<')[0]) {

                  // declared type: any
                  case 'Object':
                    if (metadataEntry.value
                      && target[metadataEntry.property] !== null) {

                      if (!(target[metadataEntry.property] instanceof metadataEntry.value
                        || metadataEntry.value.name.toString().toLowerCase() === typeof target[metadataEntry.property])) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: metadataEntry.property,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not of type ' + metadataEntry.value.name + '.',
                          value: target[metadataEntry.property]
                        });
                      }
                    }
                    break;

                  // decared type: array
                  case 'Array':
                    if (target[metadataEntry.property] !== null) {
                      // console.log(typeof target[metadataEntry.property]);
                      // console.log(metadataEntry.property + ': ' + target[metadataEntry.property]);
                      // console.log(target[metadataEntry.property] instanceof Array<number>().constructor);
                      console.log('array design: ');
                      console.log(Reflect.getMetadata('design:type', target, metadataEntry.property));
                      console.log('array design name: ');
                      console.log(Reflect.getMetadata('design:type', target, metadataEntry.property).name);
                      console.log('new instance: ');
                      let arrayDesign = Reflect.getMetadata('design:type', target, metadataEntry.property);
                      console.log(new arrayDesign);
                      // if (arrayDesign.elemType){
                      //   let arrayElemType = arrayDesign.elemType;
                      //   console.log()
                      //   while (typeof arrayElemType !== 'function'){
                      //
                      //   }
                      // }
                      for (let item in target[metadataEntry.property]) {
                        // console.log('typeof item: ' + typeof target[metadataEntry.property][item]);
                        // console.log('design: ' + Reflect.getMetadata('design:type', target[metadataEntry.property], item));
                      }
                    }
                    break;

                  // declared type: string
                  case 'String':
                    if (target[metadataEntry.property] !== null) {
                      if ((metadataEntry.value
                        && !(target[metadataEntry.property] instanceof metadataEntry.value))
                        || (!metadataEntry.value
                          && (typeof target[metadataEntry.property] !== 'string'))) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: metadataEntry.property,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not a string.',
                          value: target[metadataEntry.property]
                        });
                      }
                    }
                    break;

                  // declared type: number
                  case 'Number':
                    if (target[metadataEntry.property] !== null) {

                      if ((metadataEntry.value
                        && !(target[metadataEntry.property] instanceof metadataEntry.value))
                        || (!metadataEntry.value
                          && (typeof target[metadataEntry.property] !== 'number'))) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: metadataEntry.property,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not a number.',
                          value: target[metadataEntry.property]
                        });
                      }
                    }
                    break;

                  // declared type: boolean
                  case 'Boolean':
                    if (target[metadataEntry.property] !== null) {

                      if ((metadataEntry.value
                        && !(target[metadataEntry.property] instanceof metadataEntry.value))
                        || (!metadataEntry.value
                          && (typeof target[metadataEntry.property] !== 'boolean'))) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: metadataEntry.property,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not of type Boolean.',
                          value: target[metadataEntry.property]
                        });
                      }
                    }
                    break;

                  // declared type: object
                  default:
                    if (target[metadataEntry.property]) {

                      if ((metadataEntry.value
                        && !(target[metadataEntry.property] instanceof metadataEntry.value))
                        || (!metadataEntry.value
                          && !(target[metadataEntry.property] instanceof types))) {

                        this.errors.push({
                          target: target.constructor.name,
                          property: metadataEntry.property,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not of type ' + types.name + '.',
                          value: target[metadataEntry.property]
                        });
                      }
                    }
                    break;
                }
              }
              else {

                // limit to once per property(!?)
                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.IS_TYPED,
                  message: 'Can not get type information for property ' + metadataEntry.property + ' of ' + target.constructor.name + '.',
                  value: target[metadataEntry.property]
                });
              }
              break;

            case decorators.DecoratorTypes.IS_INT:
              if (!validator.isInt(target[metadataEntry.property].toString())
                || typeof target[metadataEntry.property] !== 'number') {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.IS_INT,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not of type Integer.',
                  value: target[metadataEntry.property]
                });
              }
              break;
            case decorators.DecoratorTypes.IS_FLOAT:
              if (!validator.isFloat(target[metadataEntry.property].toString())
                || typeof target[metadataEntry.property] !== 'number') {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.IS_FLOAT,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not of type Float.',
                  value: target[metadataEntry.property]
                });
              }
              break;
            case decorators.DecoratorTypes.IS_DECIMAL:
              if (!validator.isDecimal(target[metadataEntry.property].toString())
                || typeof target[metadataEntry.property] !== 'number') {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.IS_DECIMAL,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not of type Decimal.',
                  value: target[metadataEntry.property]
                });
              }
              break;
            case decorators.DecoratorTypes.IS_EMPTY:
              if (target[metadataEntry.property] !== ''
                && target[metadataEntry.property] !== null
                && target[metadataEntry.property] !== undefined) {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.IS_EMPTY,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not empty.',
                  value: target[metadataEntry.property]
                });
              }
              break;
            case decorators.DecoratorTypes.IN_ARRAY:
              if (!validator.isIn(target[metadataEntry.property].toString(), metadataEntry.value)) {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.IN_ARRAY,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' not found in relevant array.',
                  value: target[metadataEntry.property],
                  comparison: metadataEntry.value
                });
              }
              break;
            case decorators.DecoratorTypes.NOT_IN_ARRAY:
              if (validator.isIn(target[metadataEntry.property].toString(), metadataEntry.value)) {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.NOT_IN_ARRAY,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' found in array of disallowed values.',
                  value: target[metadataEntry.property],
                  comparison: metadataEntry.value
                });
              }
              break;
            case decorators.DecoratorTypes.EQUALS:
              if (!validator.equals(target[metadataEntry.property].toString(), metadataEntry.value.toString())) {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property, type: decorators.DecoratorTypes.EQUALS,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' not equal to ' + metadataEntry.value.toString() + '.',
                  value: target[metadataEntry.property],
                  comparison: metadataEntry.value
                });
              }
              break;
            case decorators.DecoratorTypes.MAX_LEN:
              if (typeof target[metadataEntry.property] !== 'string'
                && typeof target[metadataEntry.property] !== 'number') {
                this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'Number or String', metadataEntry.value));
              }
              else if (!validator.isLength(target[metadataEntry.property].toString(), { max: metadataEntry.value })) {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.MAX_LEN,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' digit(s).',
                  value: target[metadataEntry.property],
                  comparison: metadataEntry.value
                });
              }
              break;
            case decorators.DecoratorTypes.MIN_LEN:
              if (typeof target[metadataEntry.property] !== 'string'
                && typeof target[metadataEntry.property] !== 'number') {
                this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'Number or String', metadataEntry.value));
              }
              else if (!validator.isLength(target[metadataEntry.property].toString(), { min: metadataEntry.value })) {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.MIN_LEN,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' digit(s).',
                  value: target[metadataEntry.property],
                  comparison: metadataEntry.value
                });
              }
              break;
            case decorators.DecoratorTypes.CONTAINS:
              if (typeof target[metadataEntry.property] !== 'string'
                && typeof target[metadataEntry.property] !== 'number') {
                this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'Number or String', metadataEntry.value));
              }
              else if (!validator.contains(target[metadataEntry.property].toString(), metadataEntry.value)) {

                this.errors.push({
                  target: target.constructor.name,
                  property: metadataEntry.property,
                  type: decorators.DecoratorTypes.CONTAINS,
                  message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' does not contain ' + metadataEntry.value + '.',
                  value: target[metadataEntry.property],
                  comparison: metadataEntry.value
                });
              }
              break;
          }
        }
        else {
          continue;
        }
      }
    }
    if (!this.nestedMode) {
      return this.errors;
    }
    else {
      return [];
    }
  } // method end (validate)

  /**
   * Validates metadata of properties of type string.
   * @param target Object
   * @param metadataEntry.property string
   * @param metadataEntry any
   */
  protected validateString(target: Object, metadataEntry: any) {
    switch (metadataEntry.type) {

      case decorators.DecoratorTypes.MAX_BYTE_LEN:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isByteLength(target[metadataEntry.property], { max: metadataEntry.value })) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.MAX_BYTE_LEN,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' byte(s).',
            value: target[metadataEntry.property],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.MIN_BYTE_LEN:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isByteLength(target[metadataEntry.property], { min: metadataEntry.value })) {
          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.MIN_BYTE_LEN,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' byte(s).',
            value: target[metadataEntry.property],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.ALPHA:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isAlpha(target[metadataEntry.property].toString().replace(/\s/g, ''))) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.ALPHA,
            message: 'Property ' +
            metadataEntry.property + ' of ' +
            target.constructor.name + ' is not exclusively composed of letter characters.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.ALPHA_NUM:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isAlphanumeric(target[metadataEntry.property].toString().replace(/\s/g, ''))) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.ALPHA_NUM,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not alphanumeric.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.DATE:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isDate(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.DATE,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not a date.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.DATE_ISO8601:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isISO8601(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.DATE_ISO8601,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not a ISO8601 conform date.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.DATE_AFTER:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isAfter(target[metadataEntry.property], metadataEntry.value)) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.DATE_AFTER,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not a date after ' + validator.toDate(metadataEntry.value) + '.',
            value: target[metadataEntry.property],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.DATE_BEFORE:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isBefore(target[metadataEntry.property], metadataEntry.value)) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.DATE_BEFORE, message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not a date before ' + validator.toDate(metadataEntry.value) + '.',
            value: target[metadataEntry.property],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.UPPERCASE:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isUppercase(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.UPPERCASE,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not uppercase.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.LOWERCASE:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isLowercase(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.LOWERCASE,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is not lowercase.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.HEXADECIMAL:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isHexadecimal(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.HEXADECIMAL,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is no hexadecimal number.',
            value: target[metadataEntry.property],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.EMAIL:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isEmail(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.EMAIL,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is no valid email address.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.HEX_COLOR:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isHexColor(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.HEX_COLOR,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is no hexadecimal color.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.MAC_ADDRESS:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else if (!validator.isMACAddress(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.MAC_ADDRESS,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is no MAC address.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.MONGO_ID:
        if (typeof target[metadataEntry.property] !== 'string'
          && typeof target[metadataEntry.property] !== 'number') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String or Number', metadataEntry.value));
        }
        else if (typeof target[metadataEntry.property] !== 'number'
          && !validator.isMongoId(target[metadataEntry.property])) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: decorators.DecoratorTypes.MONGO_ID,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is no MongoDB ObjectID.',
            value: target[metadataEntry.property]
          });
        }
        break;
      case decorators.DecoratorTypes.IP_ADDRESS:
        if (typeof target[metadataEntry.property] !== 'string') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'String', metadataEntry.value));
        }
        else {
          if (metadataEntry.value === null
            || metadataEntry.value === undefined) {

            if (!validator.isIP(target[metadataEntry.property], 4)
              && !validator.isIP(target[metadataEntry.property], 6)) {

              this.errors.push({
                target: target.constructor.name,
                property: metadataEntry.property,
                type: decorators.DecoratorTypes.IP_ADDRESS,
                message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is no valid IP address.',
                value: target[metadataEntry.property]
              });
            }
          }
          else if (metadataEntry.value !== 4
            || metadataEntry.value !== 6) {

            this.errors.push({
              target: target.constructor.name,
              property: metadataEntry.property,
              type: decorators.DecoratorTypes.IP_ADDRESS,
              message: 'Could not validate property ' + metadataEntry.property + ' of ' + target.constructor.name + '. ' + metadataEntry.value + ' is no valid Internet Protocol version.',
              value: target[metadataEntry.property],
              comparison: metadataEntry.value
            });
          }
          else {
            if (!validator.isIP(target[metadataEntry.property], metadataEntry.value)) {

              this.errors.push({
                target: target.constructor.name,
                property: metadataEntry.property,
                type: decorators.DecoratorTypes.IP_ADDRESS,
                message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is no valid IP' + metadataEntry.value + ' address.',
                value: target[metadataEntry.property],
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
   * @param metadataEntry.property string
   * @param metadataEntry any
   */
  protected validateNumber(target: Object, metadataEntry: any) {
    switch (metadataEntry.type) {

      case decorators.DecoratorTypes.MAX_VALUE:
        if (typeof target[metadataEntry.property] !== 'number') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'Number', metadataEntry.value));
        }
        else if (!validator.isFloat(target[metadataEntry.property].toString(), { max: metadataEntry.value })) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: metadataEntry.type,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is bigger than ' + metadataEntry.value + '.',
            value: target[metadataEntry.property],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.MIN_VALUE:
        if (typeof target[metadataEntry.property] !== 'number') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'Number', metadataEntry.value));
        }
        else if (!validator.isFloat(target[metadataEntry.property].toString(), { min: metadataEntry.value })) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: metadataEntry.type,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is smaller than ' + metadataEntry.value + '.',
            value: target[metadataEntry.property],
            comparison: metadataEntry.value
          });
        }
        break;
      case decorators.DecoratorTypes.MULTIPLE_OF:
        if (typeof target[metadataEntry.property] !== 'number') {
          this.errors.push(this.validationTypeConflict(target, metadataEntry.property, metadataEntry.type, 'Number', metadataEntry.value));
        }
        else if (!validator.isDivisibleBy(target[metadataEntry.property].toString(), metadataEntry.value)) {

          this.errors.push({
            target: target.constructor.name,
            property: metadataEntry.property,
            type: metadataEntry.type,
            message: 'Property ' + metadataEntry.property + ' of ' + target.constructor.name + ' is no multiple of ' + metadataEntry.value + '.',
            value: target[metadataEntry.property],
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
