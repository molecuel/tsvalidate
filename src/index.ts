'use strict';
import 'reflect-metadata';
import {IValidatorOptions} from './interfaces/IValidatorOptions';
import {IValidator} from './interfaces/IValidator';
export {IValidator} from './interfaces/IValidator';

import {MaxLen} from './classes/validators/MaxLen';


export class validatorTypes {
  static MAX_LEN = 'max_len';
  static MIN_LEN = 'min_len';
  static CONTAINS = 'contains';
  static IS_EMPTY = 'is_empty';
  static NOT_EMPTY = 'not_empty';
  static ALPHA_NUM = 'alpha_num';
}

export class Validator {
  private validatorRegistry: Map<string, IValidator>;
  public d: any;

  constructor() {
    this.validatorRegistry = new Map;
    this.d = {};

    let maxlen: MaxLen = new MaxLen();
    this.registerValidator(maxlen);

  }
  public registerValidator(validator: IValidator) {
    this.validatorRegistry.set(validator.name, validator);
    this.d[validator.name] = validator.decorator;
  }
  public validate(target: Object, validatorOptions?: IValidatorOptions) {
    for (let propertyName in target) {
      if (!target.hasOwnProperty(propertyName)) {
        continue;
      }
      // let keys = Reflect.getMetadataKeys(target, propertyName);
      let validators = Reflect.getMetadata('tsvalidate:validators', target, propertyName);
      // let types = Reflect.getMetadata('design:type', target, propertyName);
      let errors: string[] = [];
      // console.log(validators + '\n' + types);

      for (let validator of validators) {
        let currentvalidator = this.validatorRegistry.get(validator.type);
        if (currentvalidator) {
          let validreturn = currentvalidator.validate(target[propertyName], target, propertyName, validator.value);
          if (validreturn) {
            errors.push(validreturn);
          }
        }
      }
      if (errors.length > 0) {
        return errors;
      } else {
        return;
      }
    }
  }
}
