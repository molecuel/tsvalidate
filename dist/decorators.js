"use strict";
const validator = require('validator');
class DecoratorTypes {
    static get IS_TYPED() { return 'ValidateType'; }
    ;
    static get IS_ARRAY() { return 'ValidateArray'; }
    ;
    static get IS_INT() { return 'IsInt'; }
    ;
    static get IS_FLOAT() { return 'IsFloat'; }
    ;
    static get IS_DECIMAL() { return 'IsDecimal'; }
    ;
    static get IS_EMPTY() { return 'IsEmpty'; }
    ;
    static get NOT_EMPTY() { return 'IsNotEmpty'; }
    ;
    static get DEFINED() { return 'IsDefined'; }
    ;
    static get EQUALS() { return 'Equals'; }
    ;
    static get IN_ARRAY() { return 'InArray'; }
    ;
    static get NOT_IN_ARRAY() { return 'NotInArray'; }
    ;
    static get MAX_LEN() { return 'MaxLen'; }
    ;
    static get MIN_LEN() { return 'MinLen'; }
    ;
    static get CONTAINS() { return 'Contains'; }
    ;
    static get MAX_BYTE_LEN() { return 'MaxByteLen'; }
    ;
    static get MIN_BYTE_LEN() { return 'MinByteLen'; }
    ;
    static get DATE_AFTER() { return 'DateAfter'; }
    ;
    static get DATE_BEFORE() { return 'DateBefore'; }
    ;
    static get UPPERCASE() { return 'Uppercase'; }
    ;
    static get LOWERCASE() { return 'Lowercase'; }
    ;
    static get DATE() { return 'IsDate'; }
    ;
    static get EMAIL() { return 'IsEmail'; }
    ;
    static get ALPHA() { return 'Alpha'; }
    ;
    static get ALPHA_NUM() { return 'AlphaNumeric'; }
    ;
    static get HEX_COLOR() { return 'HexColor'; }
    ;
    static get HEXADECIMAL() { return 'Hexadecimal'; }
    ;
    static get IP_ADDRESS() { return 'IsIP'; }
    ;
    static get DATE_ISO8601() { return 'ISO8601Date'; }
    ;
    static get MAC_ADDRESS() { return 'IsMAC'; }
    ;
    static get MONGO_ID() { return 'MongoID'; }
    ;
    static get MAX_VALUE() { return 'MaxValue'; }
    ;
    static get MIN_VALUE() { return 'MinValue'; }
    ;
    static get MULTIPLE_OF() { return 'MultipleOf'; }
    ;
    static get NESTED() { return 'ValidateNested'; }
    ;
}
exports.DecoratorTypes = DecoratorTypes;
function UseMongoCollection(collection) {
    return function (target) {
        let input = target;
        let className;
        if ('prototype' in input) {
            className = input.prototype.constructor.name;
        }
        else {
            className = input.constructor.name;
        }
        let metadata = Reflect.getMetadata(exports.METADATAKEY, target);
        if (!metadata) {
            metadata = [];
        }
        metadata.push({
            type: 'UseMongoCollection',
            property: className,
            value: collection
        });
        Reflect.defineMetadata(exports.METADATAKEY, metadata, target);
    };
}
exports.UseMongoCollection = UseMongoCollection;
exports.METADATAKEY = 'tsvalidate:validators';
function ValidateType(objectType, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_TYPED, objectType, validatorOptions);
    };
}
exports.ValidateType = ValidateType;
function IsInt(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.IS_INT, validatorOptions);
    };
}
exports.IsInt = IsInt;
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
function NotInArray(array, validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.NOT_IN_ARRAY, array, validatorOptions);
    };
}
exports.NotInArray = NotInArray;
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
function ValidateNested(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.NESTED, validatorOptions);
    };
}
exports.ValidateNested = ValidateNested;
function IsDefined(validatorOptions) {
    return function (target, propertyName) {
        BasicDecorator(target, propertyName, DecoratorTypes.DEFINED, validatorOptions);
    };
}
exports.IsDefined = IsDefined;
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
function ClearValidators() {
    return function (target, propertyName) {
        let metadata = Reflect.getMetadata(exports.METADATAKEY, target);
        if (typeof metadata !== 'undefined') {
            metadata = metadata.filter(function (entry) {
                return entry.property !== propertyName;
            });
            Reflect.defineMetadata(exports.METADATAKEY, metadata, target);
        }
    };
}
exports.ClearValidators = ClearValidators;
function BasicDecorator(target, propertyName, type, value, validatorOptions) {
    let metadata = Reflect.getMetadata(exports.METADATAKEY, target);
    if (!metadata) {
        metadata = [];
    }
    metadata.push({
        type: type,
        property: propertyName,
        value: value,
        options: validatorOptions
    });
    Reflect.defineMetadata(exports.METADATAKEY, metadata, target);
}
;

//# sourceMappingURL=decorators.js.map
