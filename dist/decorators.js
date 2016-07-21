"use strict";
class DecoratorTypes {
}
DecoratorTypes.IS_BOOL = 'is_bool';
DecoratorTypes.IS_INT = 'is_int';
DecoratorTypes.IS_NUMBER = 'is_number';
DecoratorTypes.IS_STRING = 'is_string';
DecoratorTypes.IS_FLOAT = 'is_float';
DecoratorTypes.IS_DECIMAL = 'is_decimal';
DecoratorTypes.MAX_LEN = 'max_len';
DecoratorTypes.MIN_LEN = 'min_len';
DecoratorTypes.MAX_BYTE_LEN = 'max_byte_len';
DecoratorTypes.MIN_BYTE_LEN = 'mix_byte_len';
DecoratorTypes.DATE_AFTER = 'date_after';
DecoratorTypes.DATE_BEFORE = 'date_before';
DecoratorTypes.CONTAINS = 'contains';
DecoratorTypes.IS_EMPTY = 'is_empty';
DecoratorTypes.NOT_EMPTY = 'not_empty';
DecoratorTypes.DEFINED = 'defined';
DecoratorTypes.EQUALS = 'equals';
DecoratorTypes.UPPERCASE = 'uppercase';
DecoratorTypes.LOWERCASE = 'lowercase';
DecoratorTypes.MULTIPLE_OF = 'multiple_of';
DecoratorTypes.IN_ARRAY = 'in_array';
DecoratorTypes.MATCHING = 'matching';
DecoratorTypes.CREDITCARD = 'creditcard';
DecoratorTypes.CURRENCY = 'currency';
DecoratorTypes.DATE = 'is_date';
DecoratorTypes.EMAIL = 'is_email';
DecoratorTypes.ALPHA = 'is_alpha';
DecoratorTypes.ALPHA_NUM = 'is_alpha_num';
DecoratorTypes.FULLY_QUALIFIED_DOMAIN_NAME = 'is_fqdn';
DecoratorTypes.HEX_COLOR = 'is_hexcolor';
DecoratorTypes.HEXADECIMAL = 'is_hexadecimal';
DecoratorTypes.IP_ADDRESS = 'is_ip';
DecoratorTypes.ISBN = 'is_isbn';
DecoratorTypes.DATE_ISO8601 = 'is_iso_date';
DecoratorTypes.JSON = 'is_json';
DecoratorTypes.MAC_ADDRESS = 'is_mac';
DecoratorTypes.MOBILE_PHONE_NUMBER = 'is_cell';
DecoratorTypes.MONGO_ID = 'is_mongo_id';
DecoratorTypes.URL = 'is_url';
DecoratorTypes.UUID = 'is_uuid';
exports.DecoratorTypes = DecoratorTypes;
function IsBoolean(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_BOOL, validatorOptions);
    };
}
exports.IsBoolean = IsBoolean;
function IsNumber(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_NUMBER, validatorOptions);
    };
}
exports.IsNumber = IsNumber;
function IsInt(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_INT, validatorOptions);
    };
}
exports.IsInt = IsInt;
function IsString(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_STRING, validatorOptions);
    };
}
exports.IsString = IsString;
function IsFloat(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_FLOAT, validatorOptions);
    };
}
exports.IsFloat = IsFloat;
function IsDecimal(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_BOOL, validatorOptions);
    };
}
exports.IsDecimal = IsDecimal;
function MaxLen(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MAX_LEN, value, validatorOptions);
    };
}
exports.MaxLen = MaxLen;
function MinLen(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MIN_LEN, value, validatorOptions);
    };
}
exports.MinLen = MinLen;
function MaxByteLen(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MAX_BYTE_LEN, value, validatorOptions);
    };
}
exports.MaxByteLen = MaxByteLen;
function MinByteLen(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MIN_BYTE_LEN, value, validatorOptions);
    };
}
exports.MinByteLen = MinByteLen;
function DateBefore(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.DATE_BEFORE, value, validatorOptions);
    };
}
exports.DateBefore = DateBefore;
function DateAfter(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.DATE_AFTER, value, validatorOptions);
    };
}
exports.DateAfter = DateAfter;
function Equals(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.EQUALS, value, validatorOptions);
    };
}
exports.Equals = Equals;
function Uppercase(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.UPPERCASE, validatorOptions);
    };
}
exports.Uppercase = Uppercase;
function Lowercase(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.LOWERCASE, validatorOptions);
    };
}
exports.Lowercase = Lowercase;
function MultipleOf(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MULTIPLE_OF, value, validatorOptions);
    };
}
exports.MultipleOf = MultipleOf;
function InArray(array, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IN_ARRAY, array, validatorOptions);
    };
}
exports.InArray = InArray;
function Contains(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.CONTAINS, value, validatorOptions);
    };
}
exports.Contains = Contains;
function Matching(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.CONTAINS, value, validatorOptions);
    };
}
exports.Matching = Matching;
function IsEmpty(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_EMPTY, validatorOptions);
    };
}
exports.IsEmpty = IsEmpty;
function IsNotEmpty(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.NOT_EMPTY, validatorOptions);
    };
}
exports.IsNotEmpty = IsNotEmpty;
function Alpha(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.ALPHA, validatorOptions);
    };
}
exports.Alpha = Alpha;
function AlphaNumeric(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.ALPHA_NUM, validatorOptions);
    };
}
exports.AlphaNumeric = AlphaNumeric;
function IsDefined(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.DEFINED, validatorOptions);
    };
}
exports.IsDefined = IsDefined;
function MobilePhoneNumber(language, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MOBILE_PHONE_NUMBER, language, validatorOptions);
    };
}
exports.MobilePhoneNumber = MobilePhoneNumber;
function Creditcard(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.CREDITCARD, validatorOptions);
    };
}
exports.Creditcard = Creditcard;
function Currency(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.CURRENCY, validatorOptions);
    };
}
exports.Currency = Currency;
function IsDate(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.DATE, validatorOptions);
    };
}
exports.IsDate = IsDate;
function IsEmail(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.EMAIL, validatorOptions);
    };
}
exports.IsEmail = IsEmail;
function FullyQualifiedDomainName(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.FULLY_QUALIFIED_DOMAIN_NAME, validatorOptions);
    };
}
exports.FullyQualifiedDomainName = FullyQualifiedDomainName;
function HexColor(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.HEX_COLOR, validatorOptions);
    };
}
exports.HexColor = HexColor;
function IsIP(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IP_ADDRESS, validatorOptions);
    };
}
exports.IsIP = IsIP;
function Hexadecimal(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.HEXADECIMAL, validatorOptions);
    };
}
exports.Hexadecimal = Hexadecimal;
function IsISBN(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.ISBN, validatorOptions);
    };
}
exports.IsISBN = IsISBN;
function ISO8601Date(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.DATE_ISO8601, validatorOptions);
    };
}
exports.ISO8601Date = ISO8601Date;
function IsMAC(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MAC_ADDRESS, validatorOptions);
    };
}
exports.IsMAC = IsMAC;
function MongoID(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MONGO_ID, validatorOptions);
    };
}
exports.MongoID = MongoID;
function IsURL(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.URL, validatorOptions);
    };
}
exports.IsURL = IsURL;
function IsUUID(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.UUID, validatorOptions);
    };
}
exports.IsUUID = IsUUID;
function Trim() {
    return function (target, propertyName) {
    };
}
exports.Trim = Trim;
function BasicDecorator(_target, _propertyName, _type, _value, validatorOptions) {
    let metadata = Reflect.getMetadata('tsvalidate:validators', _target, _propertyName);
    if (!metadata) {
        metadata = [];
    }
    metadata.push({ type: _type, value: _value, validatorOptions: validatorOptions });
    Reflect.defineMetadata('tsvalidate:validators', metadata, _target, _propertyName);
}
;

//# sourceMappingURL=decorators.js.map
