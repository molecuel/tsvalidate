"use strict";
const validator = require('validator');
class DecoratorTypes {
}
DecoratorTypes.IS_BOOL = 'IsBoolean';
DecoratorTypes.IS_INT = 'IsInt';
DecoratorTypes.IS_NUMBER = 'IsNumber';
DecoratorTypes.IS_STRING = 'IsString';
DecoratorTypes.IS_FLOAT = 'IsFloat';
DecoratorTypes.IS_DECIMAL = 'IsDecimal';
DecoratorTypes.IS_EMPTY = 'IsEmpty';
DecoratorTypes.NOT_EMPTY = 'IsNotEmpty';
DecoratorTypes.DEFINED = 'IsDefined';
DecoratorTypes.EQUALS = 'Equals';
DecoratorTypes.IN_ARRAY = 'InArray';
DecoratorTypes.MAX_LEN = 'MaxLen';
DecoratorTypes.MIN_LEN = 'MinLen';
DecoratorTypes.CONTAINS = 'Contains';
DecoratorTypes.MAX_BYTE_LEN = 'MaxByteLen';
DecoratorTypes.MIN_BYTE_LEN = 'MinByteLen';
DecoratorTypes.DATE_AFTER = 'DateAfter';
DecoratorTypes.DATE_BEFORE = 'DateBefore';
DecoratorTypes.UPPERCASE = 'Uppercase';
DecoratorTypes.LOWERCASE = 'Lowercase';
DecoratorTypes.DATE = 'IsDate';
DecoratorTypes.EMAIL = 'IsEmail';
DecoratorTypes.ALPHA = 'Alpha';
DecoratorTypes.ALPHA_NUM = 'AlphaNumeric';
DecoratorTypes.HEX_COLOR = 'HexColor';
DecoratorTypes.HEXADECIMAL = 'Hexadecimal';
DecoratorTypes.IP_ADDRESS = 'IsIP';
DecoratorTypes.DATE_ISO8601 = 'ISO8601Date';
DecoratorTypes.MAC_ADDRESS = 'IsMAC';
DecoratorTypes.MONGO_ID = 'MongoID';
DecoratorTypes.URL = 'IsURL';
DecoratorTypes.MOBILE_PHONE_NUMBER = 'MobilePhoneNumber';
DecoratorTypes.MAX_VALUE = 'MaxValue';
DecoratorTypes.MIN_VALUE = 'MinValue';
DecoratorTypes.MULTIPLE_OF = 'MultipleOf';
DecoratorTypes.NESTED = 'ValidateNested';
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
        BasicDecorator(target, propertyName, DecoratorTypes.IS_DECIMAL, validatorOptions);
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
function MaxValue(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MAX_VALUE, value, validatorOptions);
    };
}
exports.MaxValue = MaxValue;
function MinValue(value, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.MIN_VALUE, value, validatorOptions);
    };
}
exports.MinValue = MinValue;
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
function HexColor(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.HEX_COLOR, validatorOptions);
    };
}
exports.HexColor = HexColor;
function IsIP(version, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IP_ADDRESS, version, validatorOptions);
    };
}
exports.IsIP = IsIP;
function Hexadecimal(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.HEXADECIMAL, validatorOptions);
    };
}
exports.Hexadecimal = Hexadecimal;
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
function ValidateNested(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.NESTED, validatorOptions);
    };
}
exports.ValidateNested = ValidateNested;
function Trim() {
    return function (target, propertyName) {
        for (let propertyName in target) {
            if (!target.hasOwnProperty(propertyName)) {
                continue;
            }
            validator.trim(target[propertyName]);
        }
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
