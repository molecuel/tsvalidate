import 'reflect-metadata';
export declare class validatorTypes {
    static MAX_LEN: string;
    static MIN_LEN: string;
    static CONTAINS: string;
    static IS_EMPTY: string;
    static NOT_EMPTY: string;
    static ALPHA_NUM: string;
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
    validate(target: Object, validatorOptions?: ValidatorOptions): void;
}
export declare function MaxLen(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MinLen(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Contains(value: string, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsEmpty(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsNotEmpty(value: any, validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
export declare function AlphaNum(validatorOptions?: ValidatorOptions): (target: Object, propertyName: string) => void;
