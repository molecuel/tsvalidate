import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
import { IValidatorError } from './interfaces/IValidatorError';
export declare class Validator {
    private errors;
    private nestedMode;
    validate(target: Object, validatorOptions?: IValidatorOptions): IValidatorError[];
    private validateString(target, propertyName, metadataEntry);
    private validateNumber(target, propertyName, metadataEntry);
}
