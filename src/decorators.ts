import { IValidatorOptions } from './interfaces/IValidatorOptions';
import validator = require('validator');

export class DecoratorTypes {

  // all types
  static IS_TYPED = 'ValidateType';
  static IS_ARRAY = 'ValidateArray';
  static IS_INT = 'IsInt';
  static IS_FLOAT = 'IsFloat';
  static IS_DECIMAL = 'IsDecimal';
  static IS_EMPTY = 'IsEmpty';
  static NOT_EMPTY = 'IsNotEmpty';
  static DEFINED = 'IsDefined';
  static EQUALS = 'Equals';
  static IN_ARRAY = 'InArray';
  static NOT_IN_ARRAY = 'NotInArray';
  // static IS_NUMBER = 'IsNumber'; // disabled
  // static IS_STRING = 'IsString'; // disabled
  // static IS_BOOL = 'IsBoolean'; // disabled

  // string and number types
  static MAX_LEN = 'MaxLen';
  static MIN_LEN = 'MinLen';
  static CONTAINS = 'Contains';

  // string types
  static MAX_BYTE_LEN = 'MaxByteLen';
  static MIN_BYTE_LEN = 'MinByteLen';
  static DATE_AFTER = 'DateAfter';
  static DATE_BEFORE = 'DateBefore';
  static UPPERCASE = 'Uppercase';
  static LOWERCASE = 'Lowercase';
  static DATE = 'IsDate';
  static EMAIL = 'IsEmail';
  static ALPHA = 'Alpha';
  static ALPHA_NUM = 'AlphaNumeric';
  static HEX_COLOR = 'HexColor';
  static HEXADECIMAL = 'Hexadecimal';
  static IP_ADDRESS = 'IsIP';
  static DATE_ISO8601 = 'ISO8601Date';
  static MAC_ADDRESS = 'IsMAC';
  static MONGO_ID = 'MongoID';
  // static URL = 'IsURL'; // disabled
  // static MOBILE_PHONE_NUMBER = 'MobilePhoneNumber'; // disabled

  // number types
  static MAX_VALUE = 'MaxValue';
  static MIN_VALUE = 'MinValue';
  static MULTIPLE_OF = 'MultipleOf';

  // object types
  static NESTED = 'ValidateNested';
}

export function UseMongoCollection(collection: string) {
  return function(target: Object) {
    let input: any = target;
    let className: string;
    if ('prototype' in input) {
      className = input.prototype.constructor.name;
    }
    else {
      className = input.constructor.name;
    }
    let metadata = Reflect.getMetadata(METADATAKEY, target);
    if (!metadata) {
      metadata = [];
    }
    metadata.push({
      type: 'UseMongoCollection',
      property: className,
      value: collection
    });
    Reflect.defineMetadata(METADATAKEY, metadata, target);
  };
}

export const METADATAKEY = 'tsvalidate:validators';

export function ValidateType(objectType?: Object|any[], validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_TYPED, objectType, validatorOptions);
  };
}

export function IsInt(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_INT, validatorOptions);
  };
}

export function IsFloat(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_FLOAT, validatorOptions);
  };
}

export function IsDecimal(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_DECIMAL, validatorOptions);
  };
}

export function MaxLen(value: number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MAX_LEN, value, validatorOptions);
  };
}

export function MinLen(value: number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MIN_LEN, value, validatorOptions);
  };
}

export function MaxByteLen(value: number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MAX_BYTE_LEN, value, validatorOptions);
  };
}

export function MinByteLen(value: number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MIN_BYTE_LEN, value, validatorOptions);
  };
}

export function MaxValue(value: number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MAX_VALUE, value, validatorOptions);
  };
}

export function MinValue(value: number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MIN_VALUE, value, validatorOptions);
  };
}

export function DateBefore(value, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.DATE_BEFORE, value, validatorOptions);
  };
}

export function DateAfter(value, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.DATE_AFTER, value, validatorOptions);
  };
}

export function Equals(value, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.EQUALS, value, validatorOptions);
  };
}

export function Uppercase(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.UPPERCASE, validatorOptions);
  };
}

export function Lowercase(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.LOWERCASE, validatorOptions);
  };
}

export function MultipleOf(value: number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MULTIPLE_OF, value, validatorOptions);
  };
}

export function InArray(array: any[], validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IN_ARRAY, array, validatorOptions);
  };
}

export function NotInArray(array: any[], validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.NOT_IN_ARRAY, array, validatorOptions);
  };
}

export function Contains(value: string | number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.CONTAINS, value, validatorOptions);
  };
}

export function IsEmpty(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_EMPTY, validatorOptions);
  };
}

export function IsNotEmpty(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.NOT_EMPTY, validatorOptions);
  };
}

export function Alpha(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.ALPHA, validatorOptions);
  };
}

export function AlphaNumeric(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.ALPHA_NUM, validatorOptions);
  };
}

export function IsDate(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.DATE, validatorOptions);
  };
}

export function IsEmail(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.EMAIL, validatorOptions);
  };
}

export function HexColor(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.HEX_COLOR, validatorOptions);
  };
}

export function IsIP(version?: number, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IP_ADDRESS, version, validatorOptions);
  };
}

export function Hexadecimal(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.HEXADECIMAL, validatorOptions);
  };
}

export function ISO8601Date(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.DATE_ISO8601, validatorOptions);
  };
}

export function IsMAC(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MAC_ADDRESS, validatorOptions);
  };
}

export function MongoID(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MONGO_ID, validatorOptions);
  };
}

export function ValidateNested(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.NESTED, validatorOptions);
  };
}

export function IsDefined(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.DEFINED, validatorOptions);
  };
}

export function Trim() {
  return function(target: Object, propertyName: string) {
    for (let propertyName in target) {
      // Check object for property.
      if (!target.hasOwnProperty(propertyName)) {
        continue;
      }
      validator.trim(target[propertyName]);
    }
  };
}

export function ClearValidators() {
  return function(target: Object, propertyName: string) {
    let metadata = Reflect.getMetadata(METADATAKEY, target);
    if (typeof metadata !== 'undefined') {
      metadata = metadata.filter(function(entry) {
        return entry.property !== propertyName;
      });
      Reflect.defineMetadata(METADATAKEY, metadata, target);
    }
  };
}

function BasicDecorator(target: Object, propertyName: string, type: string, value?: any, validatorOptions?: IValidatorOptions) {
  let metadata = Reflect.getMetadata(METADATAKEY, target);
  if (!metadata) {
    metadata = [];
  }
  metadata.push({
    type: type,
    property: propertyName,
    value: value,
    options: validatorOptions
  });
  Reflect.defineMetadata(METADATAKEY, metadata, target);
};
