'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
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
                                    this.errors.push({
                                        target: target.constructor.name,
                                        property: propertyName,
                                        type: decorators.DecoratorTypes.IS_STRING,
                                        message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no string.'
                                    });
                                }
                                break;
                            case decorators.DecoratorTypes.IS_BOOL:
                                if (types.name !== 'Boolean') {
                                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IS_BOOL, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not of type Boolean.' });
                                }
                                break;
                            case decorators.DecoratorTypes.IS_NUMBER:
                                if (types.name !== 'Number') {
                                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.IS_NUMBER, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is no number.' });
                                }
                                break;
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
                if (!validator.isAlpha(target[propertyName])) {
                    this.errors.push({ target: target.constructor.name, property: propertyName, type: decorators.DecoratorTypes.ALPHA, message: 'Property ' + propertyName + ' of ' + target.constructor.name + ' is not exclusively composed of letter characters.' });
                }
                break;
            case decorators.DecoratorTypes.ALPHA_NUM:
                if (!validator.isAlphanumeric(target[propertyName])) {
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
    validateNumber(target, propertyName, metadataEntry) {
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
    handleProperty(metadataInfo, validatorOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!metadataInfo.target.hasOwnProperty(metadataInfo.property)) {
                return;
            }
            let metadata = Reflect.getMetadata('tsvalidate:validators', metadataInfo.target, metadataInfo.property);
            if (metadata !== undefined) {
                for (let metadataEntry of metadata) {
                    let newMetadataInfo = { target: metadataInfo, property: metadataInfo.property, entry: metadataEntry };
                    this.handleMetadataEntry(newMetadataInfo, validatorOptions);
                }
            }
            else {
                return;
            }
        });
    }
    handleMetadataEntry(metadataInfo, validatorOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (metadataInfo.entry.type === decorators.DecoratorTypes.NESTED
                && typeof metadataInfo.target[metadataInfo.property] === 'object') {
                this.nestedMode = true;
                this.validate(metadataInfo.target[metadataInfo.property], validatorOptions);
            }
            else {
                this.nestedMode = false;
                switch (typeof metadataInfo.target[metadataInfo.property]) {
                    case 'string':
                        this.validateString(metadataInfo.target, metadataInfo.property, metadataInfo.entry);
                        break;
                    case 'number':
                        this.validateNumber(metadataInfo.target, metadataInfo.property, metadataInfo.entry);
                        break;
                    case 'boolean':
                        break;
                }
                switch (metadataInfo.entry.type) {
                    case decorators.DecoratorTypes.IS_STRING:
                        if (typeof metadataInfo.target[metadataInfo.property] !== 'string') {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.IS_STRING, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is no string.' });
                        }
                        break;
                    case decorators.DecoratorTypes.IS_BOOL:
                        if (typeof metadataInfo.target[metadataInfo.property] !== 'boolean') {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.IS_BOOL, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is not of type Boolean.' });
                        }
                        break;
                    case decorators.DecoratorTypes.IS_NUMBER:
                        if (typeof metadataInfo.target[metadataInfo.property] !== 'number') {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.IS_NUMBER, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is no number.' });
                        }
                        break;
                    case decorators.DecoratorTypes.IS_INT:
                        if (!validator.isInt(metadataInfo.target[metadataInfo.property].toString())) {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.IS_INT, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is not of type Integer.' });
                        }
                        break;
                    case decorators.DecoratorTypes.IS_FLOAT:
                        if (!validator.isFloat(metadataInfo.target[metadataInfo.property].toString())) {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.IS_FLOAT, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is not of type Float.' });
                        }
                        break;
                    case decorators.DecoratorTypes.IS_DECIMAL:
                        if (!validator.isDecimal(metadataInfo.target[metadataInfo.property].toString())) {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.IS_DECIMAL, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is not of type Decimal.' });
                        }
                        break;
                    case decorators.DecoratorTypes.NOT_EMPTY:
                        if (metadataInfo.target[metadataInfo.property] === ''
                            || metadataInfo.target[metadataInfo.property] === null
                            || metadataInfo.target[metadataInfo.property] === undefined) {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.NOT_EMPTY, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is empty.' });
                        }
                        break;
                    case decorators.DecoratorTypes.IS_EMPTY:
                        if (metadataInfo.target[metadataInfo.property] !== ''
                            && metadataInfo.target[metadataInfo.property] !== null
                            && metadataInfo.target[metadataInfo.property] !== undefined) {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.IS_EMPTY, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is not empty.' });
                        }
                        break;
                    case decorators.DecoratorTypes.DEFINED:
                        if (metadataInfo.target[metadataInfo.property] === null
                            || metadataInfo.target[metadataInfo.property] === undefined) {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.DEFINED, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' is not defined.' });
                        }
                        break;
                    case decorators.DecoratorTypes.IN_ARRAY:
                        if (!validator.isIn(metadataInfo.target[metadataInfo.property].toString(), metadataInfo.entry.value)) {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.IN_ARRAY, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' not found in relevant array.', value: metadataInfo.entry.value });
                        }
                        break;
                    case decorators.DecoratorTypes.EQUALS:
                        if (!validator.isIn(metadataInfo.target[metadataInfo.property].toString(), metadataInfo.entry.value.toString())) {
                            this.errors.push({ target: metadataInfo.target.constructor.name, property: metadataInfo.property, type: decorators.DecoratorTypes.EQUALS, message: 'Property ' + metadataInfo.property + ' of ' + metadataInfo.target.constructor.name + ' not equal to \"' + metadataInfo.entry.value.toString() + '\".', value: metadataInfo.entry.value });
                        }
                        break;
                }
            }
        });
    }
}
exports.Validator = Validator;

//# sourceMappingURL=index.js.map
