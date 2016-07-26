import 'reflect-metadata';
import { IValidatorOptions } from './interfaces/IValidatorOptions';
import { IValidatorError } from './interfaces/IValidatorError';
import { IMetadataInformation } from './interfaces/IMetadataInformation';
export declare class Validator {
    private errors;
    private nestedMode;
    validate(target: Object, validatorOptions?: IValidatorOptions): IValidatorError[];
    protected validateString(target: Object, propertyName: string, metadataEntry: any): void;
    protected validateNumber(target: Object, propertyName: string, metadataEntry: any): void;
    protected handleProperty(metadataInfo: IMetadataInformation, validatorOptions?: IValidatorOptions): Promise<void>;
    protected handleMetadataEntry(metadataInfo: IMetadataInformation, validatorOptions?: IValidatorOptions): Promise<void>;
}
