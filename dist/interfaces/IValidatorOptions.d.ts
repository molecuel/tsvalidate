export interface IValidatorOptions {
    each?: boolean;
    message?: string | ((value?: any, constraint1?: any, constraint2?: any) => string);
    groups?: string[];
    always?: boolean;
}
