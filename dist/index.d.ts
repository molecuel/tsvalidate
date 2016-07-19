import 'reflect-metadata';
export declare class TestClass {
    constructor(name: string);
    testString: string;
}
export interface ValidatorError {
    target: string;
    property: string;
    type: string;
    message: string;
    value: any;
}
export interface ValidatorOptions {
    each?: boolean;
    message?: string | ((value?: any, constraint1?: any, constraint2?: any) => string);
    groups?: string[];
    always?: boolean;
}
export declare class Validator {
    getCustMetadata(target: Object, callback: any, validatorOptions?: ValidatorOptions): Promise<void>;
    validate(target: Object, validatorOptions?: ValidatorOptions): void;
}
export declare function MaxLen(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MinLen(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Contains(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsEmpty(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsNotEmpty(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
