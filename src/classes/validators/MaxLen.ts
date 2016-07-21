import {IValidator} from '../../interfaces/IValidator';
import validator = require('validator');

export class MaxLen implements IValidator {
  public name: string;
  constructor() {
    this.name = 'MaxLen';
  }
  public decorator(value: number, validatorOptions?: any) {
    return function(target: Object, propertyName: string) {
      let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
      if (!validators) {
        validators = [];
      }
      console.log(value);
      validators.push({ type: 'MaxLen', value: value, validatorOptions });
      Reflect.defineMetadata('tsvalidate:validators', validators, target, propertyName);
    };
  }
  public validate(value, target, propertyName, options) {
    if (!validator.isLength(value, { min: 0, max: options })) {
      return new Error('Not valid for ' + propertyName);
    } else {
      return;
    }
  }
}
