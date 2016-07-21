import { IValidator } from '../../interfaces/IValidator';
export declare class MaxLen implements IValidator {
    name: string;
    constructor();
    decorator(value: number, validatorOptions?: any): (target: Object, propertyName: string) => void;
    validate(value: any, target: any, propertyName: any, options: any): Error;
}
