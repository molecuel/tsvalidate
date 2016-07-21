export interface IValidator {
    name: string;
    decorator(...args: any[]): any;
    validate(...args: any[]): any;
}
