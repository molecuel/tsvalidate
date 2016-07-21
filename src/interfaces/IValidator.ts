export interface IValidator {
  name: string;
  decorator(...args: any[]);
  validate(...args: any[]);
}
