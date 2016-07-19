'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
require('reflect-metadata');
let validatejs = require('validate.js');
class TestClass {
    constructor(name) {
        this.testString = name;
    }
}
__decorate([
    MinLen(2),
    MaxLen(10), 
    __metadata('design:type', String)
], TestClass.prototype, "testString", void 0);
exports.TestClass = TestClass;
class Validator {
    getCustMetadata(target, callback, validatorOptions) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    validate(target, validatorOptions) {
        for (let propertyName in target) {
            if (!target.hasOwnProperty(propertyName)) {
                continue;
            }
            let keys = Reflect.getMetadataKeys(target, propertyName);
            let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
            let types = Reflect.getMetadata('design:type', target, propertyName);
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
        validators.push({ type: 'MaxLen', value: value, validatorOptions: validatorOptions });
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
        validators.push({ type: 'MinLen', value: value, validatorOptions: validatorOptions });
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
        validators.push({ type: 'Contains', value: value, validatorOptions: validatorOptions });
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
        validators.push({ type: 'IsEmpty', value: value, validatorOptions: validatorOptions });
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
        validators.push({ type: 'IsNotEmpty', value: value, validatorOptions: validatorOptions });
        Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
    };
}
exports.IsNotEmpty = IsNotEmpty;

//# sourceMappingURL=index.js.map
