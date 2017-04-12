"use strict";
import "reflect-metadata";

import * as _ from "lodash";
import * as validator from "validator";
import * as decorators from "./decorators";
export * from "./decorators";
import { IValidatorError } from "./interfaces/IValidatorError";
export * from "./interfaces/IValidatorError";
// import colors = require("colors");

export class Validator {

  private errors: IValidatorError[] = [];
  private nestedMode: boolean = false;

  /**
   * Validate via decorator predefined metadata of properties of objects and nested objects.
   * Returns error messages via array of the IValidatorError interface.
   *
   * @param target Object
   * @return IValidatorError[]
   */
  public validate(target: any): IValidatorError[] {
    const metadata = _.concat(
      Reflect.getMetadata(decorators.METADATAKEY, target.constructor.prototype),
      Reflect.getMetadata(decorators.METADATAKEY, target.constructor)).filter((defined) => defined);
    // Trim here
    this.resolveTrimRequests(target, metadata);
    // Loop over sets of Metadata, execute requested validation.
    for (const metadataEntry of metadata) {
      if (metadataEntry.type === decorators.DecoratorTypes.NESTED
        && typeof target[metadataEntry.property] === "object") {
        this.nestedMode = true;
        this.validate(target[metadataEntry.property]);
      } else {
        this.nestedMode = false;
        // Get system- and validator-predefined Metadata, then check for sufficient results.
        if (metadataEntry.type === decorators.DecoratorTypes.DEFINED
          && typeof target[metadataEntry.property] === "undefined") {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name + " is not defined.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.DEFINED,
            value: target[metadataEntry.property] });
        } else if (metadataEntry.type === decorators.DecoratorTypes.NOT_EMPTY
          && (target[metadataEntry.property] === ""
            || target[metadataEntry.property] === null
            || target[metadataEntry.property] === undefined)) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name + " is empty.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.NOT_EMPTY,
            value: target[metadataEntry.property] });
        } else if (typeof target[metadataEntry.property] !== "undefined"
          && target[metadataEntry.property] !== null) {

          const types = Reflect.getMetadata("design:type", target, metadataEntry.property);

          // Execute requested type dependant validation.
          this.validateString(target, metadataEntry);
          this.validateNumber(target, metadataEntry);
          // Execute requested type independant validation.
          switch (metadataEntry.type) {

            case decorators.DecoratorTypes.IS_TYPED:

              if (typeof types !== "undefined"
                || typeof metadataEntry.value !== "undefined") {
                // determine type specification per metadata
                let switchCondition: any;
                if (metadataEntry.value) {
                  switchCondition = metadataEntry.value.name || metadataEntry.value.constructor.name;
                } else {
                  switchCondition = types.name;
                }
                switch (switchCondition) {

                  // declared type: any
                  case "Object":
                    if (metadataEntry.value
                      && target[metadataEntry.property] !== null) {

                      if (!(target[metadataEntry.property] instanceof metadataEntry.value
                        || metadataEntry.value.name.toString().toLowerCase()
                        === typeof target[metadataEntry.property])) {

                        this.errors.push({
                          message: "Property " + metadataEntry.property + " of " + target.constructor.name
                            + " is not of type " + metadataEntry.value.name + ".",
                          property: metadataEntry.property,
                          target: target.constructor.name,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          value: target[metadataEntry.property] });
                      }
                    }
                    break;

                  // declared type: array
                  case "Array":
                    if (target[metadataEntry.property] !== null
                      && metadataEntry.value) {

                      const allowedTypes: any[] = [];
                      const getAllTypes = (typeRestrictions, depth) => {
                        for (const currType of typeRestrictions) {
                          if (_.isArray(currType)) {
                            getAllTypes(currType, depth + 1);
                          } else {
                            allowedTypes.push({type: currType, depth});
                          }
                        }
                      };
                      const compareTypes = (comparedArray, depth) => {
                        for (const currItem of comparedArray) {
                          if (_.isArray(currItem)) {
                            compareTypes(currItem, depth + 1);
                          } else {
                            const conflictingTypes: any = {
                              conflicts: [],
                              depth,
                              type: currItem.constructor,
                              value: currItem };
                            for (const currType of allowedTypes) {
                              if (currType.depth !== depth
                                || (!(currItem instanceof currType.type)
                                && !(currItem.constructor === currType.type))) {

                                conflictingTypes.conflicts.push(currType);
                              }
                            }
                            if (conflictingTypes.conflicts.length >= allowedTypes.length) {
                              this.errors.push({
                                comparison: currItem,
                                message: "Item of property " + metadataEntry.property + " of "
                                  + target.constructor.name + " is not of any valid type.",
                                property: metadataEntry.property,
                                target: target.constructor.name,
                                type: decorators.DecoratorTypes.IS_TYPED,
                                value: target[metadataEntry.property] });
                            }
                          }
                        }
                      };
                      getAllTypes(metadataEntry.value, 1);
                      compareTypes(target[metadataEntry.property], 1);
                    }
                    break;

                  // declared type: string
                  case "String":
                    if (target[metadataEntry.property] !== null) {
                      if ((metadataEntry.value
                        && !(target[metadataEntry.property] instanceof metadataEntry.value)
                        && (typeof target[metadataEntry.property] !== "string"))
                        || (!metadataEntry.value
                          && (typeof target[metadataEntry.property] !== "string"))) {

                        this.errors.push({
                          message: "Property " + metadataEntry.property + " of " + target.constructor.name
                            + " is not a string.",
                          property: metadataEntry.property,
                          target: target.constructor.name,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          value: target[metadataEntry.property] });
                      }
                    }
                    break;

                  // declared type: number
                  case "Number":
                    if (target[metadataEntry.property] !== null) {

                      if ((metadataEntry.value
                        && !(target[metadataEntry.property] instanceof metadataEntry.value)
                        && (typeof target[metadataEntry.property] !== "number"))
                        || (!metadataEntry.value
                          && (typeof target[metadataEntry.property] !== "number"))) {

                        this.errors.push({
                          message: "Property " + metadataEntry.property + " of " + target.constructor.name
                            + " is not a number.",
                          property: metadataEntry.property,
                          target: target.constructor.name,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          value: target[metadataEntry.property] });
                      }
                    }
                    break;

                  // declared type: boolean
                  case "Boolean":
                    if (target[metadataEntry.property] !== null) {

                      if ((metadataEntry.value
                        && !(target[metadataEntry.property] instanceof metadataEntry.value)
                        && (typeof target[metadataEntry.property] !== "boolean"))
                        || (!metadataEntry.value
                          && (typeof target[metadataEntry.property] !== "boolean"))) {

                        this.errors.push({
                          message: "Property " + metadataEntry.property + " of " + target.constructor.name
                            + " is not of type Boolean.",
                          property: metadataEntry.property,
                          target: target.constructor.name,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          value: target[metadataEntry.property] });
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
                          comparison: JSON.stringify(target),
                          message: "Property " + metadataEntry.property + " of " + target.constructor.name
                            + " is not of type " + types.name + ".",
                          property: metadataEntry.property,
                          target: target.constructor.name,
                          type: decorators.DecoratorTypes.IS_TYPED,
                          value: target[metadataEntry.property] });
                      }
                    }
                    break;
                }
              } else {

                this.errors.push({
                  message: "Can not get type information for property " + metadataEntry.property + " of "
                    + target.constructor.name + ".",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.IS_TYPED,
                  value: target[metadataEntry.property] });
              }
              break;

            case decorators.DecoratorTypes.IS_INT:
              if (!validator.isInt(target[metadataEntry.property].toString())
                || typeof target[metadataEntry.property] !== "number") {

                this.errors.push({
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " is not of type Integer.",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.IS_INT,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.IS_FLOAT:
              if (!validator.isFloat(target[metadataEntry.property].toString())
                || typeof target[metadataEntry.property] !== "number") {

                this.errors.push({
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " is not of type Float.",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.IS_FLOAT,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.IS_DECIMAL:
              if (!validator.isDecimal(target[metadataEntry.property].toString())
                || typeof target[metadataEntry.property] !== "number") {

                this.errors.push({
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " is not of type Decimal.",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.IS_DECIMAL,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.IS_EMPTY:
              if (target[metadataEntry.property] !== ""
                && target[metadataEntry.property] !== null
                && target[metadataEntry.property] !== undefined) {

                this.errors.push({
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " is not empty.",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.IS_EMPTY,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.IN_ARRAY:
              if (!validator.isIn(target[metadataEntry.property].toString(), metadataEntry.value)) {

                this.errors.push({
                  comparison: metadataEntry.value,
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " not found in relevant array.",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.IN_ARRAY,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.NOT_IN_ARRAY:
              if (validator.isIn(target[metadataEntry.property].toString(), metadataEntry.value)) {

                this.errors.push({
                  comparison: metadataEntry.value,
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " found in array of disallowed values.",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.NOT_IN_ARRAY,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.EQUALS:
              if (!validator.equals(target[metadataEntry.property].toString(), metadataEntry.value.toString())) {

                this.errors.push({
                  comparison: metadataEntry.value,
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " not equal to " + metadataEntry.value.toString() + ".",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.EQUALS,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.MAX_LEN:
              if (typeof target[metadataEntry.property] !== "string"
                && typeof target[metadataEntry.property] !== "number") {
                this.errors.push(
                  this.validationTypeConflict(
                    target,
                    metadataEntry.property,
                    metadataEntry.type,
                    "Number or String",
                    metadataEntry.value ));
              } else if (!validator.isLength(
                target[metadataEntry.property].toString(),
                { max: metadataEntry.value })) {

                this.errors.push({
                  comparison: metadataEntry.value,
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " is longer than " + metadataEntry.value + " digit(s).",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.MAX_LEN,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.MIN_LEN:
              if (typeof target[metadataEntry.property] !== "string"
                && typeof target[metadataEntry.property] !== "number") {
                this.errors.push(
                  this.validationTypeConflict(
                    target,
                    metadataEntry.property,
                    metadataEntry.type,
                    "Number or String",
                    metadataEntry.value ));
              } else if (!validator.isLength(
                target[metadataEntry.property].toString(),
                { min: metadataEntry.value })) {

                this.errors.push({
                  comparison: metadataEntry.value,
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " is shorter than " + metadataEntry.value + " digit(s).",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.MIN_LEN,
                  value: target[metadataEntry.property] });
              }
              break;
            case decorators.DecoratorTypes.CONTAINS:
              if (typeof target[metadataEntry.property] !== "string"
                && typeof target[metadataEntry.property] !== "number"
                && !_.isArray(target[metadataEntry.property])) {
                this.errors.push(
                  this.validationTypeConflict(
                    target,
                    metadataEntry.property,
                    metadataEntry.type,
                    "Array, Number or String",
                    metadataEntry.value ));
              } else if ((_.isArray(target[metadataEntry.property])
                && !_.includes(_.flattenDeep(target[metadataEntry.property]), metadataEntry.value))
                || !validator.contains(_.toString(target[metadataEntry.property]), metadataEntry.value)) {

                this.errors.push({
                  comparison: metadataEntry.value,
                  message: "Property " + metadataEntry.property + " of " + target.constructor.name
                    + " does not contain " + metadataEntry.value + ".",
                  property: metadataEntry.property,
                  target: target.constructor.name,
                  type: decorators.DecoratorTypes.CONTAINS,
                  value: target[metadataEntry.property] });
              }
              break;

            default:
              // to do: resolve custom decorator/validator
              // temporary: skip unknown entry
              break;
          }
        } else {
          continue;
        }
      }
    }
    if (!this.nestedMode) {
      return this.errors;
    } // else {
      // return [];
      // }
  } // method end (validate)

  /**
   * Validates metadata of properties of type string.
   * @param target Object
   * @param metadataEntry.property string
   * @param metadataEntry any
   */
  protected validateString(target: any, metadataEntry: any) {
    switch (metadataEntry.type) {

      case decorators.DecoratorTypes.MAX_BYTE_LEN:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isByteLength(target[metadataEntry.property], { max: metadataEntry.value })) {

          this.errors.push({
            comparison: metadataEntry.value,
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is longer than " + metadataEntry.value + " byte(s).",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.MAX_BYTE_LEN,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.MIN_BYTE_LEN:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isByteLength(target[metadataEntry.property], { min: metadataEntry.value })) {
          this.errors.push({
            comparison: metadataEntry.value,
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is shorter than " + metadataEntry.value + " byte(s).",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.MIN_BYTE_LEN,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.ALPHA:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isAlpha(target[metadataEntry.property].toString().replace(/\s/g, ""))) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is not exclusively composed of letter characters.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.ALPHA,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.ALPHA_NUM:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isAlphanumeric(target[metadataEntry.property].toString().replace(/\s/g, ""))) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is not alphanumeric.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.ALPHA_NUM,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.DATE:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isDate(target[metadataEntry.property])) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is not a date.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.DATE,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.DATE_ISO8601:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isISO8601(target[metadataEntry.property])) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is not a ISO8601 conform date.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.DATE_ISO8601,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.DATE_AFTER:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isAfter(target[metadataEntry.property], metadataEntry.value)) {

          this.errors.push({
            comparison: metadataEntry.value,
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is not a date after " + validator.toDate(metadataEntry.value) + ".",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.DATE_AFTER,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.DATE_BEFORE:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isBefore(target[metadataEntry.property], metadataEntry.value)) {

          this.errors.push({
            comparison: metadataEntry.value,
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is not a date before " + validator.toDate(metadataEntry.value) + ".",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.DATE_BEFORE,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.UPPERCASE:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isUppercase(target[metadataEntry.property])) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is not uppercase.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.UPPERCASE,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.LOWERCASE:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isLowercase(target[metadataEntry.property])) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is not lowercase.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.LOWERCASE,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.HEXADECIMAL:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isHexadecimal(target[metadataEntry.property])) {

          this.errors.push({
            comparison: metadataEntry.value,
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is no hexadecimal number.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.HEXADECIMAL,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.EMAIL:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isEmail(target[metadataEntry.property])) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is no valid email address.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.EMAIL,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.HEX_COLOR:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value));
        } else if (!validator.isHexColor(target[metadataEntry.property])) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is no hexadecimal color.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.HEX_COLOR,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.MAC_ADDRESS:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else if (!validator.isMACAddress(target[metadataEntry.property])) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is no MAC address.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.MAC_ADDRESS,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.MONGO_ID:
        if (typeof target[metadataEntry.property] !== "string"
          && typeof target[metadataEntry.property] !== "number") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String or Number",
              metadataEntry.value ));
        } else if (typeof target[metadataEntry.property] !== "number"
          && !validator.isMongoId(target[metadataEntry.property])) {

          this.errors.push({
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is no MongoDB ObjectID.",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: decorators.DecoratorTypes.MONGO_ID,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.IP_ADDRESS:
        if (typeof target[metadataEntry.property] !== "string") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "String",
              metadataEntry.value ));
        } else {
          if (metadataEntry.value === null
            || metadataEntry.value === undefined) {

            if (!validator.isIP(target[metadataEntry.property], 4)
              && !validator.isIP(target[metadataEntry.property], 6)) {

              this.errors.push({
                message: "Property " + metadataEntry.property + " of " + target.constructor.name
                  + " is no valid IP address.",
                property: metadataEntry.property,
                target: target.constructor.name,
                type: decorators.DecoratorTypes.IP_ADDRESS,
                value: target[metadataEntry.property] });
            }
          } else if (metadataEntry.value !== 4
            && metadataEntry.value !== 6) {

            this.errors.push({
              comparison: metadataEntry.value,
              message: "Could not validate property " + metadataEntry.property + " of " + target.constructor.name
                + ". " + metadataEntry.value + " is no valid Internet Protocol version.",
              property: metadataEntry.property,
              target: target.constructor.name,
              type: decorators.DecoratorTypes.IP_ADDRESS,
              value: target[metadataEntry.property] });
          } else {
            if (!validator.isIP(target[metadataEntry.property], metadataEntry.value)) {

              this.errors.push({
                comparison: metadataEntry.value,
                message: "Property " + metadataEntry.property + " of " + target.constructor.name
                  + " is no valid IP" + metadataEntry.value + " address.",
                property: metadataEntry.property,
                target: target.constructor.name,
                type: decorators.DecoratorTypes.IP_ADDRESS,
                value: target[metadataEntry.property] });
            }
          }
        }
        break;

        default:
          // to do: resolve variable validator
          // temporary: skip unknown entry
          break;
    }
  } // method end (validateString)

  /**
   * Validates metadata of properties of type number.
   * @param target Object
   * @param metadataEntry.property string
   * @param metadataEntry any
   */
  protected validateNumber(target: any, metadataEntry: any) {
    switch (metadataEntry.type) {

      case decorators.DecoratorTypes.MAX_VALUE:
        if (typeof target[metadataEntry.property] !== "number") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "Number",
              metadataEntry.value ));
        } else if (!validator.isFloat(target[metadataEntry.property].toString(), { max: metadataEntry.value })) {

          this.errors.push({
            comparison: metadataEntry.value,
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is bigger than " + metadataEntry.value + ".",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: metadataEntry.type,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.MIN_VALUE:
        if (typeof target[metadataEntry.property] !== "number") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "Number",
              metadataEntry.value ));
        } else if (!validator.isFloat(target[metadataEntry.property].toString(), { min: metadataEntry.value })) {

          this.errors.push({
            comparison: metadataEntry.value,
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is smaller than " + metadataEntry.value + ".",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: metadataEntry.type,
            value: target[metadataEntry.property] });
        }
        break;
      case decorators.DecoratorTypes.MULTIPLE_OF:
        if (typeof target[metadataEntry.property] !== "number") {
          this.errors.push(
            this.validationTypeConflict(
              target,
              metadataEntry.property,
              metadataEntry.type,
              "Number",
              metadataEntry.value ));
        } else if (!validator.isDivisibleBy(target[metadataEntry.property].toString(), metadataEntry.value)) {

          this.errors.push({
            comparison: metadataEntry.value,
            message: "Property " + metadataEntry.property + " of " + target.constructor.name
              + " is no multiple of " + metadataEntry.value + ".",
            property: metadataEntry.property,
            target: target.constructor.name,
            type: metadataEntry.type,
            value: target[metadataEntry.property] });
        }
        break;

        default:
          // to do: resolve costom decorator/validator
          // temporary: skip unknown entry
          break;
    }
  } // method end (validateNumber)

  protected resolveTrimRequests(target: any, meta: any[]) {
    const trimRequests = meta.filter((entry) => {
      return (entry.type && entry.type === decorators.DecoratorTypes.TRIM);
    });
    for (const trimRequest of trimRequests) {
      if (trimRequest.property && Reflect.has(target, trimRequest.property)) {
        target[trimRequest.property] = validator.trim(target[trimRequest.property]);
      } else {
        for (const prop in target) {
          if (Reflect.has(target, prop)) {
            if (typeof target[prop] === "string") {
              target[prop] = validator.trim(target[prop]);
            } else if (typeof target[prop] !== "function"
              && (typeof target[prop] === "object" || Array.isArray(target[prop]))) {

              this.resolveTrimRequests(target[prop], trimRequests);
            }
          }
        }
      }
    }
  }

  protected validationTypeConflict(
    target: any,
    property: string,
    type: string,
    conflict: string,
    comparison?: any): IValidatorError {

    return {
      comparison,
      message: "Property " + property + " of " + target.constructor.name + " is not of type " + conflict + ".",
      target: target.constructor.name,
      property,
      type,
      value: target[property] };
  } // method end (validationTypeConflict)

} // class end (Validator)
