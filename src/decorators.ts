import { IValidatorOptions } from "./interfaces/IValidatorOptions";
import validator = require("validator");

export class DecoratorTypes {

  // all types
  public static get IS_TYPED(): string { return "ValidateType"; }
  // public static get IS_ARRAY(): string { return "ValidateArray"; }
  public static get IS_INT(): string { return "IsInt"; }
  public static get IS_FLOAT(): string { return "IsFloat"; }
  public static get IS_DECIMAL(): string { return "IsDecimal"; }
  public static get IS_EMPTY(): string { return "IsEmpty"; }
  public static get NOT_EMPTY(): string { return "IsNotEmpty"; }
  public static get DEFINED(): string { return "IsDefined"; }
  public static get EQUALS(): string { return "Equals"; }
  public static get IN_ARRAY(): string { return "InArray"; }
  public static get NOT_IN_ARRAY(): string { return "NotInArray"; }
  // public static get IS_NUMBER(): string { return "IsNumber"; } // disabled
  // public static get IS_STRING(): string { return "IsString"; } // disabled
  // public static get IS_BOOL(): string { return "IsBoolean"; } // disabled

  // string and number types
  public static get MAX_LEN(): string { return "MaxLen"; }
  public static get MIN_LEN(): string { return "MinLen"; }
  public static get CONTAINS(): string { return "Contains"; }

  // string types
  public static get MAX_BYTE_LEN(): string { return "MaxByteLen"; }
  public static get MIN_BYTE_LEN(): string { return "MinByteLen"; }
  public static get DATE_AFTER(): string { return "DateAfter"; }
  public static get DATE_BEFORE(): string { return "DateBefore"; }
  public static get UPPERCASE(): string { return "Uppercase"; }
  public static get LOWERCASE(): string { return "Lowercase"; }
  public static get DATE(): string { return "IsDate"; }
  public static get EMAIL(): string { return "IsEmail"; }
  public static get ALPHA(): string { return "Alpha"; }
  public static get ALPHA_NUM(): string { return "AlphaNumeric"; }
  public static get HEX_COLOR(): string { return "HexColor"; }
  public static get HEXADECIMAL(): string { return "Hexadecimal"; }
  public static get IP_ADDRESS(): string { return "IsIP"; }
  public static get DATE_ISO8601(): string { return "ISO8601Date"; }
  public static get MAC_ADDRESS(): string { return "IsMAC"; }
  public static get MONGO_ID(): string { return "MongoID"; }
  // public static get URL(): string { return "IsURL"; } // disabled
  // public static get MOBILE_PHONE_NUMBER(): string { return "MobilePhoneNumber"; } // disabled

  // number types
  public static get MAX_VALUE(): string { return "MaxValue"; }
  public static get MIN_VALUE(): string { return "MinValue"; }
  public static get MULTIPLE_OF(): string { return "MultipleOf"; }

  // object types
  public static get NESTED(): string { return "ValidateNested"; }
}

// export function UseMongoCollection(collection: string) {
//   return (target: any) => {
//     const input: any = target;
//     let className: string;
//     if ("prototype" in input) {
//       className = input.prototype.constructor.name;
//     } else {
//       className = input.constructor.name;
//     }
//     let metadata = Reflect.getMetadata(METADATAKEY, target);
//     if (!metadata) {
//       metadata = [];
//     }
//     metadata.push({
//       property: className,
//       type: "UseMongoCollection",
//       value: collection });
//     Reflect.defineMetadata(METADATAKEY, metadata, target);
//   };
// }

export const METADATAKEY = "tsvalidate:validators";

export function ValidateType(objectType?: any|any[], validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_TYPED, objectType, validatorOptions);
  };
}

export function IsInt(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_INT, validatorOptions);
  };
}

export function IsFloat(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_FLOAT, validatorOptions);
  };
}

export function IsDecimal(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_DECIMAL, validatorOptions);
  };
}

export function MaxLen(value: number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MAX_LEN, value, validatorOptions);
  };
}

export function MinLen(value: number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MIN_LEN, value, validatorOptions);
  };
}

export function MaxByteLen(value: number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MAX_BYTE_LEN, value, validatorOptions);
  };
}

export function MinByteLen(value: number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MIN_BYTE_LEN, value, validatorOptions);
  };
}

export function MaxValue(value: number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MAX_VALUE, value, validatorOptions);
  };
}

export function MinValue(value: number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MIN_VALUE, value, validatorOptions);
  };
}

export function DateBefore(value, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.DATE_BEFORE, value, validatorOptions);
  };
}

export function DateAfter(value, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.DATE_AFTER, value, validatorOptions);
  };
}

export function Equals(value, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.EQUALS, value, validatorOptions);
  };
}

export function Uppercase(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.UPPERCASE, validatorOptions);
  };
}

export function Lowercase(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.LOWERCASE, validatorOptions);
  };
}

export function MultipleOf(value: number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MULTIPLE_OF, value, validatorOptions);
  };
}

export function InArray(array: any[], validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.IN_ARRAY, array, validatorOptions);
  };
}

export function NotInArray(array: any[], validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.NOT_IN_ARRAY, array, validatorOptions);
  };
}

export function Contains(value: string | number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.CONTAINS, value, validatorOptions);
  };
}

export function IsEmpty(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.IS_EMPTY, validatorOptions);
  };
}

export function IsNotEmpty(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.NOT_EMPTY, validatorOptions);
  };
}

export function Alpha(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.ALPHA, validatorOptions);
  };
}

export function AlphaNumeric(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.ALPHA_NUM, validatorOptions);
  };
}

export function IsDate(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.DATE, validatorOptions);
  };
}

export function IsEmail(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.EMAIL, validatorOptions);
  };
}

export function HexColor(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.HEX_COLOR, validatorOptions);
  };
}

export function IsIP(version?: number, validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.IP_ADDRESS, version, validatorOptions);
  };
}

export function Hexadecimal(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.HEXADECIMAL, validatorOptions);
  };
}

export function ISO8601Date(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.DATE_ISO8601, validatorOptions);
  };
}

export function IsMAC(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MAC_ADDRESS, validatorOptions);
  };
}

export function MongoID(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.MONGO_ID, validatorOptions);
  };
}

export function ValidateNested(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.NESTED, validatorOptions);
  };
}

export function IsDefined(validatorOptions?: IValidatorOptions) {
  return (target: any, propertyName: string) => {
    BasicDecorator(target, propertyName, DecoratorTypes.DEFINED, validatorOptions);
  };
}

export function Trim() {
  return (target: any, propertyName: string) => {
    for (const property in target) {
      // Check object for property.
      if (!target.hasOwnProperty(property)) {
        continue;
      }
      validator.trim(target[property]);
    }
  };
}

export function ClearValidators() {
  return (target: any, propertyName: string) => {
    let metadata = Reflect.getMetadata(METADATAKEY, target);
    if (typeof metadata !== "undefined") {
      metadata = metadata.filter((entry) => {
        return entry.property !== propertyName;
      });
      Reflect.defineMetadata(METADATAKEY, metadata, target);
    }
  };
}

function BasicDecorator(
  target: any,
  propertyName: string,
  type: string,
  value?: any,
  validatorOptions?: IValidatorOptions) {

  let metadata = Reflect.getMetadata(METADATAKEY, target);
  if (!metadata) {
    metadata = [];
  }
  metadata = metadata.concat({
    options: validatorOptions,
    property: propertyName,
    type,
    value });
  Reflect.defineMetadata(METADATAKEY, metadata, target);
}
