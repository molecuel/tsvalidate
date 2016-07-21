'use strict';
require('reflect-metadata');
const MaxLen_1 = require('./classes/validators/MaxLen');
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
    constructor() {
        this.validatorRegistry = new Map;
        this.d = {};
        let maxlen = new MaxLen_1.MaxLen();
        this.registerValidator(maxlen);
    }
    registerValidator(validator) {
        this.validatorRegistry.set(validator.name, validator);
        this.d[validator.name] = validator.decorator;
    }
    validate(target, validatorOptions) {
        for (let propertyName in target) {
            if (!target.hasOwnProperty(propertyName)) {
                continue;
            }
            let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
            let errors = [];
            for (let validator of validators) {
                let currentvalidator = this.validatorRegistry.get(validator.type);
                if (currentvalidator) {
                    let validreturn = currentvalidator.validate(target[propertyName], target, propertyName, validator.value);
                    if (validreturn) {
                        errors.push(validreturn);
                    }
                }
            }
            if (errors.length > 0) {
                return errors;
            }
            else {
                return;
            }
        }
    }
}
exports.Validator = Validator;

//# sourceMappingURL=index.js.map
