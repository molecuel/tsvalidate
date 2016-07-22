'use strict';
require('reflect-metadata');
const decorators = require('./decorators');
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
            if (metadata !== undefined
                && types !== undefined) {
                for (let metadataEntry of metadata) {
                    if (metadataEntry.type === decorators.DecoratorTypes.NESTED
                        && typeof target[propertyName] === 'object') {
                        this.nestedMode = true;
                        this.validate(target[propertyName], validatorOptions);
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
                                if (target[propertyName] === null
                                    || target[propertyName] === undefined) {
                                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is not defined.');
                                }
                                break;
                            case decorators.DecoratorTypes.IN_ARRAY:
                                if (!validator.isIn(target[propertyName].toString(), metadataEntry.value)) {
                                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' not found in relevant array.');
                                }
                                break;
                            case decorators.DecoratorTypes.EQUALS:
                                if (!validator.isIn(target[propertyName].toString(), metadataEntry.value.toString())) {
                                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' not equal to \"' + metadataEntry.value.toString() + '\".');
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
        if (this.errors.length > 0
            && !this.nestedMode) {
            return this.errors;
        }
        else {
            return;
        }
    }
    validateString(target, propertyName, metadataEntry) {
        switch (metadataEntry.type) {
            case decorators.DecoratorTypes.MAX_LEN:
                if (!validator.isLength(target[propertyName], { max: metadataEntry.value })) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' digit(s).');
                }
                break;
            case decorators.DecoratorTypes.MIN_LEN:
                if (!validator.isLength(target[propertyName], { min: metadataEntry.value })) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' digit(s).');
                }
                break;
            case decorators.DecoratorTypes.MAX_BYTE_LEN:
                if (!validator.isByteLength(target[propertyName], { max: metadataEntry.value })) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' byte(s).');
                }
                break;
            case decorators.DecoratorTypes.MIN_BYTE_LEN:
                if (!validator.isByteLength(target[propertyName], { min: metadataEntry.value })) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' byte(s).');
                }
                break;
            case decorators.DecoratorTypes.CONTAINS:
                if (!validator.contains(target[propertyName], metadataEntry.value)) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' does not contain \"' + metadataEntry.value + '\".');
                }
                break;
            case decorators.DecoratorTypes.MATCHING:
                if (!validator.matches(target[propertyName], metadataEntry.value)) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' does not match \"' + metadataEntry.value + '\".');
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
            case decorators.DecoratorTypes.HEXADECIMAL:
                if (!validator.isHexadecimal(target[propertyName])) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no hexadecimal number.');
                }
                break;
            case decorators.DecoratorTypes.EMAIL:
                if (!validator.isEmail(target[propertyName])) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no valid email address.');
                }
                break;
            case decorators.DecoratorTypes.HEX_COLOR:
                if (!validator.isHexColor(target[propertyName])) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no hexadecimal color.');
                }
                break;
            case decorators.DecoratorTypes.MAC_ADDRESS:
                if (!validator.isMACAddress(target[propertyName])) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no MAC address.');
                }
                break;
            case decorators.DecoratorTypes.MONGO_ID:
                if (!validator.isMongoId(target[propertyName])) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no MongoDB ObjectID.');
                }
                break;
            case decorators.DecoratorTypes.URL:
                if (!validator.isURL(target[propertyName])) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no URL.');
                }
                break;
            case decorators.DecoratorTypes.IP_ADDRESS:
                if (metadataEntry.value === null
                    || metadataEntry.value === undefined) {
                    if (!validator.isIP(target[propertyName], 4)
                        && !validator.isIP(target[propertyName], 6)) {
                        this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no valid IP address.');
                    }
                }
                else if (metadataEntry.value !== 4
                    || metadataEntry.value !== 6) {
                    this.errors.push('Could not validate parameter ' + propertyName + ' of ' + target.constructor.name + '. ' + metadataEntry.value + ' is no valid Internet Protocol version.');
                }
                else {
                    if (!validator.isIP(target[propertyName], metadataEntry.value)) {
                        this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no valid IP' + metadataEntry.value + ' address.');
                    }
                }
                break;
        }
    }
    validateNumber(target, propertyName, metadataEntry) {
        switch (metadataEntry.type) {
            case decorators.DecoratorTypes.MAX_LEN:
                if (!validator.isLength(target[propertyName].toString(), { max: metadataEntry.value })) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is longer than ' + metadataEntry.value + ' digit(s).');
                }
                break;
            case decorators.DecoratorTypes.MIN_LEN:
                if (!validator.isLength(target[propertyName].toString(), { min: metadataEntry.value })) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is shorter than ' + metadataEntry.value + ' digit(s).');
                }
                break;
            case decorators.DecoratorTypes.MAX_VALUE:
                if (!validator.isLength(target[propertyName].toString(), { max: metadataEntry.value })) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is bigger than ' + metadataEntry.value + '.');
                }
                break;
            case decorators.DecoratorTypes.MIN_VALUE:
                if (!validator.isLength(target[propertyName].toString(), { min: metadataEntry.value })) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is smaller than ' + metadataEntry.value + '.');
                }
                break;
            case decorators.DecoratorTypes.CONTAINS:
                if (!validator.contains(target[propertyName].toString(), metadataEntry.value.toString())) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' does not contain \"' + metadataEntry.value + '\".');
                }
                break;
            case decorators.DecoratorTypes.MOBILE_PHONE_NUMBER:
                if (!validator.isMobilePhone(target[propertyName].toString(), metadataEntry.value)) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no mobile phone number.');
                }
                break;
            case decorators.DecoratorTypes.MULTIPLE_OF:
                if (!validator.isDivisibleBy(target[propertyName].toString(), metadataEntry.value)) {
                    this.errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is no multiple of ' + metadataEntry.value + '.');
                }
                break;
        }
    }
}
exports.Validator = Validator;

//# sourceMappingURL=index.js.map
