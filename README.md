[![Build Status](https://travis-ci.org/molecuel/mlcl_i18n.svg?branch=master)](https://travis-ci.org/molecuel/tsvalidate)

[![NPM](https://nodei.co/npm-dl/mlcl_i18n.png?months=1)](https://nodei.co/npm/tsvalidate/)

[![NPM](https://nodei.co/npm/mlcl_i18n.png?downloads=true&stars=true)](https://nodei.co/npm/tsvalidate/)

[![NPM version](https://badge.fury.io/js/mlcl_i18n@2x.png)](http://badge.fury.io/js/tsvalidate)

# tsvalidate

Allows validating properties of objects and (multi-)nested objects via predefined decorators.

## Usage

Upon defining classes add any of the predefined decorators to their properties, then call validate method passing the object:

Either

```typescript
import {Validator, AlphaNumeric, MaxLen, IsInt, IsNotEmpty, InArray, IsDecimal, HexColor, IValidatorError} from "class-validator";

export class Engine {

  @IsInt()
  horsepower: number;
}

export class Car {
    constructor() {
      this.engine = new Engine();      
    }

    @IsNotEmpty()
    model: string;

    @InArray(['BMW', 'Mercedes', 'Volkswagen', 'Audi', 'Honda', 'Porsche', 'Ford', 'Toyota'])
    make: string;

    @IsNotEmpty()
    @MinLen(17)
    @MaxLen(17)
    @AlphaNumeric()
    vehicleIdentificationNumber: string;

    @IsDecimal()
    fuelCapacity: number;

    @AlphaNumeric()
    @HexColor()
    color: string;

    @ValidateNested()
    engine: Engine;
}

let car = new Car();
car.model = 'Gallardo';         // Should succeed.
car.make =  'Laborghini';       // Should fail.
car.vin = 'VWV1234XX99......';  // AlphaNumeric should fail.
car.fuelCapacity = 35;          // Should ?.
car.color = 'red';              // Should fail.
car.engine.horsepower = 513.5;  // Should fail.

let validator = new Validator();
let errors: IValidatorError = validator.validate(car);
if (errors.length > 0) {
  for (let i in errors)
    console.log(errors[i].message);
}
```

or

```typescript
import * as V from "class-validator";

export class Engine {

  @V.IsInt()
  horsepower: number;
}

export class Car {

  @V.IsNotEmpty()
  model: string;

  @V.InArray(['BMW', 'Mercedes', 'Volkswagen', 'Audi', 'Honda', 'Porsche', 'Ford', 'Toyota'])
  make: string;

  @V.IsNotEmpty()
  @V.MinLen(17)
  @V.MaxLen(17)
  @V.AlphaNumeric()
  vehicleIdentificationNumber: string;

  @V.IsDecimal()
  fuelCapacity: number;

  @V.AlphaNumeric()
  @V.HexColor()
  color: string;

  @V.ValidateNested()
  engine: Engine;
}

let car = new Car();
car.model = 'Gallardo';         // Should succeed.
car.make =  'Laborghini';       // Should fail.
car.vin = 'VWV1234XX99......';  // AlphaNumeric should fail.
car.fuelCapacity = 35;          // Should ?.
car.color = 'red';              // Should fail.
car.engine.horsepower = 513.5;  // Should fail.

let validator = new V.Validator();
let errors: IValidatorError = validator.validate(car);
if (errors.length > 0) {
  for (let i in errors)
    console.log(errors[i].message);
}
```

## Errors

Returned errors use the supplied IValidatorError interface:

```typescript
export interface IValidatorError {
  /**
   * Name of the target class that was validated.
   */
  target: string;
  /**
   * Target's property on which validation is applied.
   */
  property: string;
  /**
   * Error's type.
   */
  type: string;
  /**
   * Error's message.
   */
  message: string;
  /**
   * Value of that target's property, that didn't pass a validation.
   */
  value?: any;
  /**
   * That which the target's property was validated against.
   */
  comparison?: any;
}
```

## Decorators

Currently, the following decorators are supported:

## Validation decorators

| Decorator                                       | Description                                                                                                                      |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **Common validation decorators**                                                                                                                                                   |
| `@IsDefined()`                                  | Checks if value is defined (!== undefined).                                   |
| `@Equals(comparison: any)`                      | Checks if value equals ("===") comparison.                                                                                       |
| `@IsEmpty()`                                    | Checks if given value is empty (=== '', === null, === undefined).                                                                |
| `@IsNotEmpty()`                                 | Checks if given value is not empty (!== '', !== null, !== undefined).                                                            |
| `@IsIn(values: any[])`                          | Checks if value is in a array of allowed values.                                                                                 |
| `@NotInArray(values: any[])`                    | Checks if value is not in a array of disallowed values.                                                                          |
| **Type validation decorators**                                                                                                                                                     |
| `@ValidateType(type?: Object)`                  | Checks if a value is of the declared type. Any as parameter passed type has precedence over the declarated type.                                                                                                  |
| `@IsInt()`                                      | Checks if the value is an integer number.                                                                                        |
| `@IsFloat()`                                    | Checks if the value is a float number.                                                                                                                                                                               |
| `@IsDecimal()`                                  | Checks if the value is a decimal number.                                                                                                                                                                               |
| **String and number validation decorators**                                                                                                                                                     |
| `@MaxLen(value: number)`                        | Checks if the string or the number is no longer than the defined character length.                                                                                                |
| `@MinLen(value: number)`                        | Checks if the string or the number is not shorter than the defined character length.                                                                                                |
| `@Contains(value: string | number)`             | Checks if the string or the number contains the defined value.                                                                                                |
| **String validation decorators**                                                                                                                                                     |
| `@IsDate()`                                     | Checks if the string is a date.  [mm-dd-(yy)yy] or [mm.dd.(yy)yy]                                                                                                |
| `@ISO8601Date()`                                | Checks if the string is a date abiding ISO8601.                                                                                                  |
| `@IsEmail()`                                    | Checks if the string is an email address.                                                                                                |
| `@IsIP([4, 6]?: number)`                        | Checks if the string is an IP address. Optional check of specific protocol version.                                                                                                |
| `@IsMAC()`                                      | Checks if the string is a MAC address. [ff:ff:ff:ff:ff:ff]                                                                                               |
| `@Alpha()`                                      | Checks if the string consists entirely of letters (ignoring whitespace).                                                                                                |
| `@AlphaNumeric()`                               | Checks if the string is alphanumeric (ignoring whitespace).                                                                                                |
| `@Hexadecimal()`                                | Checks if the string is a hexadecimal number.                                                                                                |
| `@HexColor()`                                   | Checks if the string is a hex color (uppercase only).                                                                                              |
| `@MaxByteLen(value: number)`                    | Checks if the string is no longer than the defined byte length.                                                                                                |
| `@MinByteLen(value: number)`                    | Checks if the string is not shorter than the defined byte length.                                                                                                |
| `@DateBefore(value: string)`                    | Checks if the string is a date prior to the defined date.                                                                                                |
| `@DateAfter(value: string)`                     | Checks if the string is a date past the defined date.                                                                                                |
| `@Uppercase()`                                  | Checks if the string's letters are all uppercase.                                                                                                |
| `@Lowercase()`                                  | Checks if the string's letters are all lowercase.                                                                                                |
| **Number validation decorators**                                                                                                                                                     |
| `@MaxValue(value: number)`                      | Checks if the number is no bigger than the defined cardinality.                                                                                                |
| `@MinValue(value: number)`                      | Checks if the number is not smaller than the defined cardinality.                                                                                                |
| `@MultipleOf(value: number)`                    | Checks if the number is a multiple of the defined integer.                                                                                                |
| **Object validation decorators**                                                                                                                                                     |
| `@ValidateNested()`                             | Checks all properties of the given object for decorators and handles all applicable.                                                                                                |
