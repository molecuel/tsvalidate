"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const D = require('../../dist/decorators');
class InnermostTestClass {
    constructor(value = 0, decoratorName = D.DecoratorTypes.IS_TYPED, decoratorValue) {
        this._decoratorName = D.DecoratorTypes.IS_TYPED;
        this._decoratorValue = 0;
        this.testBool = false;
        this.testText = 'text';
        this.testNumber = value;
        this._decoratorName = decoratorName;
        this._decoratorValue = decoratorValue;
    }
}
exports.InnermostTestClass = InnermostTestClass;
class InnerContainerClass {
    constructor(name = 'newTestClass', _bool = true, _number = 0) {
        this.testBool = false;
        this.testText = 'text';
        this.testText = name;
        this.testBool = _bool;
        this.testNumber = _number;
        this.testInnermostContainer = new InnermostTestClass();
    }
}
exports.InnerContainerClass = InnerContainerClass;
class CustomTestClass {
    constructor(name = 'newTestClass', decoratorName = D.DecoratorTypes.IS_TYPED, decoratorValue, nestedValue, nestedDecoratorName, nestedDecoratorValue) {
        this._decoratorName = D.DecoratorTypes.IS_TYPED;
        this._decoratorValue = 0;
        this.testString = name;
        this._decoratorName = decoratorName;
        this._decoratorValue = decoratorValue;
        this.testContainer = new InnermostTestClass(nestedValue, nestedDecoratorName, nestedDecoratorValue);
    }
}
__decorate([
    D.ValidateNested(), 
    __metadata('design:type', InnermostTestClass)
], CustomTestClass.prototype, "testContainer", void 0);
exports.CustomTestClass = CustomTestClass;
class OuterContainerClass {
    constructor() {
        this.testInnerContainer = new InnerContainerClass();
    }
}
__decorate([
    D.ValidateNested(), 
    __metadata('design:type', InnerContainerClass)
], OuterContainerClass.prototype, "testInnerContainer", void 0);
exports.OuterContainerClass = OuterContainerClass;
