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
    constructor(propertyValue = 0) {
        this.testProperty = propertyValue;
    }
}
__decorate([
    D.ValidateType(), 
    __metadata('design:type', Number)
], InnermostTestClass.prototype, "testProperty", void 0);
exports.InnermostTestClass = InnermostTestClass;
class NestedTestClass {
    constructor(propertyValue = 'property', nestedPropertyValue) {
        this.testProperty = propertyValue;
        this.testInnermostContainer = new InnermostTestClass(nestedPropertyValue);
    }
}
__decorate([
    D.ValidateType(), 
    __metadata('design:type', String)
], NestedTestClass.prototype, "testProperty", void 0);
__decorate([
    D.ValidateNested(), 
    __metadata('design:type', InnermostTestClass)
], NestedTestClass.prototype, "testInnermostContainer", void 0);
exports.NestedTestClass = NestedTestClass;
class MultiNestedTestClass {
    constructor(propertyValue = false, nestedpropertyValue, multiNestedPropertyValue) {
        this.testProperty = propertyValue;
        this.testInnerContainer = new NestedTestClass(nestedpropertyValue, multiNestedPropertyValue);
    }
}
__decorate([
    D.ValidateType(), 
    __metadata('design:type', Boolean)
], MultiNestedTestClass.prototype, "testProperty", void 0);
__decorate([
    D.ValidateNested(), 
    __metadata('design:type', NestedTestClass)
], MultiNestedTestClass.prototype, "testInnerContainer", void 0);
exports.MultiNestedTestClass = MultiNestedTestClass;
