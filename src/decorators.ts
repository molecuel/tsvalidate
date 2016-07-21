import { IValidatorOptions } from './interfaces/IValidatorOptions';

export class DecoratorTypes {

  static IS_BOOL = 'is_bool';
  static IS_INT = 'is_int';
  static IS_NUMBER = 'is_number';
  static IS_STRING = 'is_string';
  static IS_FLOAT = 'is_float';
  static IS_DECIMAL = 'is_decimal';

  static MAX_LEN = 'max_len';
  static MIN_LEN = 'min_len';
  static MAX_BYTE_LEN = 'max_byte_len';
  static MIN_BYTE_LEN = 'mix_byte_len';
  static DATE_AFTER = 'date_after';
  static DATE_BEFORE = 'date_before';
  static CONTAINS = 'contains';
  static IS_EMPTY = 'is_empty';
  static NOT_EMPTY = 'not_empty';
  static DEFINED = 'defined';
  static EQUALS = 'equals';
  static UPPERCASE = 'uppercase';
  static LOWERCASE = 'lowercase';
  static MULTIPLE_OF = 'multiple_of';
  static IN_ARRAY = 'in_array';
  static MATCHING = 'matching';

  static CREDITCARD = 'creditcard';
  static CURRENCY = 'currency';
  static DATE = 'is_date';
  static EMAIL = 'is_email';
  static ALPHA = 'is_alpha';
  static ALPHA_NUM = 'is_alpha_num';
  static FULLY_QUALIFIED_DOMAIN_NAME = 'is_fqdn';
  static HEX_COLOR = 'is_hexcolor';
  static HEXADECIMAL = 'is_hexadecimal';
  static IP_ADDRESS = 'is_ip';
  static ISBN = 'is_isbn';
  static DATE_ISO8601 = 'is_iso_date';
  static JSON = 'is_json';
  static MAC_ADDRESS = 'is_mac';
  static MOBILE_PHONE_NUMBER = 'is_cell';
  static MONGO_ID = 'is_mongo_id';
  static URL = 'is_url';
  static UUID = 'is_uuid';
}

export function IsBoolean(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_BOOL, validatorOptions);
  };
}

export function IsNumber(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_NUMBER, validatorOptions);
  };
}

export function IsInt(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_INT, validatorOptions);
  };
}

export function IsString(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_STRING, validatorOptions);
  };
}

export function IsFloat(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_FLOAT, validatorOptions);
  };
}

export function IsDecimal(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_BOOL, validatorOptions);
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

export function Contains(value: string, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.CONTAINS, value, validatorOptions);
  };
}

export function Matching(value: string, validatorOptions?: IValidatorOptions) {
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

export function IsDefined(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.DEFINED, validatorOptions);
  };
}

export function MobilePhoneNumber(language: string, validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.MOBILE_PHONE_NUMBER, language, validatorOptions);
  };
}

export function Creditcard(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.CREDITCARD, validatorOptions);
  };
}

export function Currency(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.CURRENCY, validatorOptions);
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

export function FullyQualifiedDomainName(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.FULLY_QUALIFIED_DOMAIN_NAME, validatorOptions);
  };
}

export function HexColor(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.HEX_COLOR, validatorOptions);
  };
}

export function IsIP(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.IP_ADDRESS, validatorOptions);
  };
}

export function Hexadecimal(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.HEXADECIMAL, validatorOptions);
  };
}

export function IsISBN(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.ISBN, validatorOptions);
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

export function IsURL(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.URL, validatorOptions);
  };
}

export function IsUUID(validatorOptions?: IValidatorOptions) {
  return function(target: Object, propertyName: string) {
    BasicDecorator(target, propertyName, DecoratorTypes.UUID, validatorOptions);
  };
}

export function Trim() {
  return function(target: Object, propertyName: string) {
    // Trim target string.
  };
}

function BasicDecorator(_target: Object, _propertyName: string, _type: string, _value: any, validatorOptions?: IValidatorOptions) {
  let metadata = Reflect.getMetadata('tsvalidate:validators', _target, _propertyName);
  if (!metadata) {
    metadata = [];
  }
  metadata.push({ type: _type, value: _value, validatorOptions });
  Reflect.defineMetadata('tsvalidate:validators', metadata, _target, _propertyName);
};
