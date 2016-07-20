'use strict';
require('reflect-metadata');
const validatorjs = require('validator');
class validatorTypes {
}
validatorTypes.MAX_LEN = 'max_len';
validatorTypes.MIN_LEN = 'min_len';
validatorTypes.CONTAINS = 'contains';
validatorTypes.IS_EMPTY = 'is_empty';
validatorTypes.NOT_EMPTY = 'not_empty';
validatorTypes.ALPHA_NUM = 'alpha_num';
exports.validatorTypes = validatorTypes;
class Validator {
    validate(target, validatorOptions) {
        for (let propertyName in target) {
            if (!target.hasOwnProperty(propertyName)) {
                continue;
            }
            let keys = Reflect.getMetadataKeys(target, propertyName);
            let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
            let types = Reflect.getMetadata('design:type', target, propertyName);
            let errors = [];
            for (let validator of validators) {
                switch (validator.type) {
                    case validatorTypes.MAX_LEN:
                        if (target[propertyName].length > validator.value) {
                            errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' too long.');
                        }
                        ;
                    case validatorTypes.MIN_LEN:
                        if (target[propertyName].length < validator.value) {
                            errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' too short.');
                        }
                        ;
                    case validatorTypes.CONTAINS:
                        if (!target[propertyName].toString.contains(validator.value)) {
                            errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' too short.');
                        }
                        ;
                    case validatorTypes.ALPHA_NUM:
                        console.log(target[propertyName]);
                        if (validatorjs.isAlpha(target[propertyName])) {
                            errors.push('Parameter ' + propertyName + ' of ' + target.constructor.name + ' is alphanumeric');
                        }
                        ;
                }
            }
        }
    }
}
exports.Validator = Validator;
function MaxLen(value, validatorOptions) {
    return function (target, propertyName) {
        let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
        if (!validators) {
            validators = [];
        }
        validators.push({ type: 'max_len', value: value, validatorOptions: validatorOptions });
        Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
    };
}
exports.MaxLen = MaxLen;
function MinLen(value, validatorOptions) {
    return function (target, propertyName) {
        let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
        if (!validators) {
            validators = [];
        }
        validators.push({ type: 'min_len', value: value, validatorOptions: validatorOptions });
        Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
    };
}
exports.MinLen = MinLen;
function Contains(value, validatorOptions) {
    return function (target, propertyName) {
        let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
        if (!validators) {
            validators = [];
        }
        validators.push({ type: validatorTypes.CONTAINS, value: value, validatorOptions: validatorOptions });
        Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
    };
}
exports.Contains = Contains;
function IsEmpty(value, validatorOptions) {
    return function (target, propertyName) {
        let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
        if (!validators) {
            validators = [];
        }
        validators.push({ type: validatorTypes.IS_EMPTY, value: value, validatorOptions: validatorOptions });
        Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
    };
}
exports.IsEmpty = IsEmpty;
function IsNotEmpty(value, validatorOptions) {
    return function (target, propertyName) {
        let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
        if (!validators) {
            validators = [];
        }
        validators.push({ type: validatorTypes.NOT_EMPTY, value: value, validatorOptions: validatorOptions });
        Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
    };
}
exports.IsNotEmpty = IsNotEmpty;
function AlphaNum(validatorOptions) {
    return function (target, propertyName) {
        let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
        if (!validators) {
            validators = [];
        }
        console.log(validatorTypes);
        validators.push({ type: 'alpha_num', validatorOptions: validatorOptions });
        Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
    };
}
exports.AlphaNum = AlphaNum;

//# sourceMappingURL=index.js.map
