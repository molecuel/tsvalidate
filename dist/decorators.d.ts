import { IValidatorOptions } from './interfaces/IValidatorOptions';
export declare class DecoratorTypes {
    static IS_BOOL: string;
    static IS_INT: string;
    static IS_NUMBER: string;
    static IS_STRING: string;
    static IS_FLOAT: string;
    static IS_DECIMAL: string;
    static IS_EMPTY: string;
    static NOT_EMPTY: string;
    static DEFINED: string;
    static EQUALS: string;
    static IN_ARRAY: string;
    static MAX_LEN: string;
    static MIN_LEN: string;
    static CONTAINS: string;
    static MOBILE_PHONE_NUMBER: string;
    static MAX_BYTE_LEN: string;
    static MIN_BYTE_LEN: string;
    static DATE_AFTER: string;
    static DATE_BEFORE: string;
    static UPPERCASE: string;
    static LOWERCASE: string;
    static MATCHING: string;
    static DATE: string;
    static EMAIL: string;
    static ALPHA: string;
    static ALPHA_NUM: string;
    static HEX_COLOR: string;
    static HEXADECIMAL: string;
    static IP_ADDRESS: string;
    static DATE_ISO8601: string;
    static MAC_ADDRESS: string;
    static MONGO_ID: string;
    static URL: string;
    static MAX_VALUE: string;
    static MIN_VALUE: string;
    static MULTIPLE_OF: string;
    static NESTED: string;
}
export declare function IsBoolean(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsNumber(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsInt(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsString(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsFloat(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsDecimal(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MaxLen(value: number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MinLen(value: number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MaxByteLen(value: number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MinByteLen(value: number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MaxValue(value: number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MinValue(value: number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function DateBefore(value: any, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function DateAfter(value: any, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Equals(value: any, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Uppercase(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Lowercase(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MultipleOf(value: number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function InArray(array: any[], validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Contains(value: string | number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Matching(value: string, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsEmpty(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsNotEmpty(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Alpha(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function AlphaNumeric(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsDefined(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MobilePhoneNumber(language: string, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsDate(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsEmail(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function HexColor(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsIP(version?: number, validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Hexadecimal(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function ISO8601Date(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsMAC(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function MongoID(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function IsURL(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function ValidateNested(validatorOptions?: IValidatorOptions): (target: Object, propertyName: string) => void;
export declare function Trim(): (target: Object, propertyName: string) => void;
