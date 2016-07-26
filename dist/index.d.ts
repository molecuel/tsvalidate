import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
import { IValidatorError } from './interfaces/IValidatorError';
export declare class Validator {
    private errors;
    private nestedMode;
    validate(target: Object, validatorOptions?: IValidatorOptions): IValidatorError[];
    protected validateString(target: Object, propertyName: string, metadataEntry: any): void;
    protected validateNumber(target: Object, propertyName: string, metadataEntry: any): void;
}
