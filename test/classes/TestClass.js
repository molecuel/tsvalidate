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
const decorators_1 = require('../../dist/decorators');
class TestClass {
    constructor(name) {
        this.testString = name;
    }
}
__decorate([
    decorators_1.MinLen(2),
    decorators_1.MaxLen(10),
    decorators_1.AlphaNumeric(),
    decorators_1.IsBoolean(), 
    __metadata('design:type', String)
], TestClass.prototype, "testString", void 0);
exports.TestClass = TestClass;
class TestContainer {
}
