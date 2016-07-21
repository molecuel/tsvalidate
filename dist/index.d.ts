import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
export declare class Validator {
    private errors;
    validate(target: Object, validatorOptions?: IValidatorOptions): string[];
    private validateString(target, propertyName, metadataEntry);
    private validateNumber(target, propertyName, metadataEntry);
}
