'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require('reflect-metadata');
const decorators = require('./decorators');
__export(require('./decorators'));
const validator = require('validator');
class Validator {
    constructor() {
        this.errors = [];
        this.nestedMode = false;
    }
    validate(target, validatorOptions) {
        for (let propertyName in target) {
            if (!target.hasOwnProperty(propertyName)) {
                continue;
            }
            let types = Reflect.getMetadata('design:type', target, propertyName);
            let metadata = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
            if (types !== undefined
                && metadata !== undefined) {
                for (let metadataEntry of metadata) {
                    if (metadataEntry.type === decorators.DecoratorTypes.NESTED
                        && typeof target[propertyName] === 'object') {
                        this.nestedMode = true;
                        this.validate(target[propertyName], validatorOptions);
                    }
                    else {
                        this.nestedMode = false;
                        switch (typeof target[propertyName]) {
                            case 'string':
                                this.validateString(target, propertyName, metadataEntry);
                                break;
                            case 'number':
                                this.validateNumber(target, propertyName, metadataEntry);
                                break;
                            case 'boolean':
                                break;
                        }
                        switch (metadataEntry.type) {
                            case decorators.DecoratorTypes.IS_TYPED:
                                switch (types.name) {
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
        }
        else {
            return [];
        }
    }
    validateString(target, propertyName, metadataEntry) {
        switch (metadataEntry.type) {
            case decorators.DecoratorTypes.MAX_LEN:
                if (!validator.isLength(target[propertyName], { max: metadataEntry.value })) {
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
                if (!validator.isLength(target[propertyName], { min: metadataEntry.value })) {
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
            case decorators.DecoratorTypes.MAX_BYTE_LEN:
                if (!validator.isByteLength(target[propertyName], { max: metadataEntry.value })) {
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
                if (!validator.isByteLength(target[propertyName], { min: metadataEntry.value })) {
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
            case decorators.DecoratorTypes.CONTAINS:
                if (!validator.contains(target[propertyName], metadataEntry.value)) {
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
            case decorators.DecoratorTypes.ALPHA:
                if (!validator.isAlpha(target[propertyName].toString().replace(/\s/g, ''))) {
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
                if (!validator.isAlphanumeric(target[propertyName].toString().replace(/\s/g, ''))) {
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
                if (!validator.isDate(target[propertyName])) {
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
                if (!validator.isISO8601(target[propertyName])) {
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
                if (!validator.isAfter(target[propertyName], metadataEntry.value)) {
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
                if (!validator.isBefore(target[propertyName], metadataEntry.value)) {
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
                if (!validator.isUppercase(target[propertyName])) {
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
                if (!validator.isLowercase(target[propertyName])) {
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
                if (!validator.isHexadecimal(target[propertyName])) {
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
                if (!validator.isEmail(target[propertyName])) {
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
                if (!validator.isHexColor(target[propertyName])) {
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
                if (!validator.isMACAddress(target[propertyName])) {
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
                if (!validator.isMongoId(target[propertyName])) {
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
                break;
        }
    }
    validateNumber(target, propertyName, metadataEntry) {
        switch (metadataEntry.type) {
            case decorators.DecoratorTypes.MAX_LEN:
                if (!validator.isLength(target[propertyName].toString(), { max: metadataEntry.value })) {
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
                if (!validator.isLength(target[propertyName].toString(), { min: metadataEntry.value })) {
                    this.errors.push({
                        target: target.constructor.name,
                        property: propertyName,
                        type: decorators.DecoratorTypes.MIN_LEN,
                        message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' digit(s).',
                        value: metadataEntry.value
                    });
                }
                break;
            case decorators.DecoratorTypes.MAX_VALUE:
                if (!validator.isFloat(target[propertyName].toString(), { max: metadataEntry.value })) {
                    this.errors.push({
                        target: target.constructor.name,
                        property: propertyName,
                        type: decorators.DecoratorTypes.MAX_VALUE,
                        message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is bigger than ' + metadataEntry.value + '.',
                        value: target[propertyName],
                        comparison: metadataEntry.value
                    });
                }
                break;
            case decorators.DecoratorTypes.MIN_VALUE:
                if (!validator.isFloat(target[propertyName].toString(), { min: metadataEntry.value })) {
                    this.errors.push({
                        target: target.constructor.name,
                        property: propertyName,
                        type: decorators.DecoratorTypes.MIN_VALUE,
                        message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is smaller than ' + metadataEntry.value + '.',
                        value: target[propertyName],
                        comparison: metadataEntry.value
                    });
                }
                break;
            case decorators.DecoratorTypes.CONTAINS:
                if (!validator.contains(target[propertyName].toString(), metadataEntry.value.toString())) {
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
            case decorators.DecoratorTypes.MULTIPLE_OF:
                if (!validator.isDivisibleBy(target[propertyName].toString(), metadataEntry.value)) {
                    this.errors.push({
                        target: target.constructor.name,
                        property: propertyName,
                        type: decorators.DecoratorTypes.MULTIPLE_OF,
                        message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no multiple of ' + metadataEntry.value + '.',
                        value: target[propertyName],
                        comparison: metadataEntry.value
                    });
                }
                break;
        }
    }
}
exports.Validator = Validator;

//# sourceMappingURL=index.js.map
