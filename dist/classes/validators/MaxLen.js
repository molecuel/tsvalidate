"use strict";
const validator = require('validator');
class MaxLen {
    constructor() {
        this.name = 'MaxLen';
    }
    decorator(value, validatorOptions) {
        return function (target, propertyName) {
            let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
            if (!validators) {
                validators = [];
            }
            console.log(value);
            validators.push({ type: 'MaxLen', value: value, validatorOptions: validatorOptions });
            Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
        };
    }
    validate(value, target, propertyName, options) {
        if (!validator.isLength(value, { min: 0, max: options })) {
            return new Error('Not valid for ' + propertyName);
        }
        else {
            return;
        }
    }
}
exports.MaxLen = MaxLen;

//# sourceMappingURL=MaxLen.js.map
