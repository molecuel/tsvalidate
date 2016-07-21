import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
import { IValidator } from './interfaces/IValidator';
export { IValidator } from './interfaces/IValidator';
export declare class validatorTypes {
    static MAX_LEN: string;
    static MIN_LEN: string;
    static CONTAINS: string;
    static IS_EMPTY: string;
    static NOT_EMPTY: string;
    static ALPHA_NUM: string;
}
export declare class Validator {
    private validatorRegistry;
    d: any;
    constructor();
    registerValidator(validator: IValidator): void;
    validate(target: Object, validatorOptions?: IValidatorOptions): string[];
}
