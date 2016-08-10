import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
import { IValidatorError } from './interfaces/IValidatorError';
export * from './interfaces/IValidatorError';
export * from './decorators';
export declare class Validator {
    private errors;
    private nestedMode;
    validate(target: Object, validatorOptions?: IValidatorOptions): IValidatorError[];
    protected validateString(target: Object, metadataEntry: any): void;
    protected validateNumber(target: Object, metadataEntry: any): void;
    protected validationTypeConflict(target: any, property: string, type: string, conflict: string, comparison?: any): IValidatorError;
}
