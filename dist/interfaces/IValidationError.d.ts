export interface IValidationError {
    target: string;
    property: string;
    type: string;
    message: string;
    value: any;
}
