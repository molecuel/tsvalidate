[![Build Status](https://travis-ci.org/molecuel/tsvalidate.svg?branch=master)](https://travis-ci.org/molecuel/tsvalidate)

[![NPM](https://nodei.co/npm-dl/tsvalidate.png?months=1)](https://nodei.co/npm/tsvalidate/)

[![NPM](https://nodei.co/npm/tsvalidate.png?downloads=true&stars=true)](https://nodei.co/npm/tsvalidate/)

[![NPM version](https://badge.fury.io/js/tsvalidate.svg)](https://badge.fury.io/js/tsvalidate)

# tsvalidate

Allows validating properties of objects and (multi-)nested objects via predefined decorators.

## Installation

```
npm install tsvalidate
```


## Usage

Import either the validator and specific decorators,

```typescript
import {Validator, AlphaNumeric, MaxLen, IsInt, IsNotEmpty, InArray, IsDecimal, HexColor, IValidatorError}
  from "tsvalidate";
```

or use an alias for all exports.

```typescript
import * as V from "tsvalidate";
```



Upon defining classes add any of the predefined decorators to their properties, then call the validate method passing the object:

```typescript
import * as V from "tsvalidate";

export class Engine {

  @V.IsInt()
  horsepower: number;
}

export class Car {
    constructor() {
      this.engine = new Engine();      
    }

    @V.IsNotEmpty()
    model: string;

    @V.InArray(['Tesla', 'BMW', 'Mercedes', 'Volkswagen', 'Audi', 'Ford', 'Toyota'])
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
car.make =  'Lamborghini';       // Should fail.
car.vin = 'VWV1234XX99......';  // AlphaNumeric should fail.
car.fuelCapacity = 35;          // Should ?.
car.color = 'red';              // Should fail.
car.engine.horsepower = 513.5;  // Should fail.

let validator = new V.Validator();
let errors: V.IValidatorError = validator.validate(car);
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
| `@ValidateType(type?: Object)`                  | Checks if a value is of the declared type. Any as parameter passed type has precedence over the declarated type. To check array items, pass an array of objects (e.g. number[][]: pass [[Number]]).               |
| `@IsInt()`                                      | Checks if the value is an integer number.                                                                                        |
| `@IsFloat()`                                    | Checks if the value is a float number.                                                                                                                                                                               |
| `@IsDecimal()`                                  | Checks if the value is a decimal number.                                                                                                                                                                               |
| **String and number validation decorators**                                                                                                                                                     |
| `@MaxLen(value: number)`                        | Checks if the string or the number is no longer than the defined character length.                                                                                                |
| `@MinLen(value: number)`                        | Checks if the string or the number is not shorter than the defined character length.                                                                                                |
| `@Contains(value: string `<code>&#124;</code>` number)`             | Checks if the string or the number contains the defined value.                                                                                                |
| **String validation decorators**                                                                                                                                                     |
| `@IsDate()`                                     | Checks if the string is a date.  [mm-dd-(yy)yy] or [mm.dd.(yy)yy]                                                                                                |
| `@ISO8601Date()`                                | Checks if the string is a date abiding ISO8601.                                                                                                  |
| `@IsEmail()`                                    | Checks if the string is an email address.                                                                                                |
| `@IsIP([4, 6]?: number)`                        | Checks if the string is an IP address. Optional check of specific protocol version.                                                                                                |
| `@IsMAC()`                                      | Checks if the string is a MAC address. [ff:ff:ff:ff:ff:ff]                                                                                               |
| `@Alpha()`                                      | Checks if the string consists entirely of letters (ignoring whitespace).                                                                                                |
| `@AlphaNumeric()`                               | Checks if the string is alphanumeric (ignoring whitespace).                                                                                                |
| `@Hexadecimal()`                                | Checks if the string is a hexadecimal number.                                                                                                |
| `@HexColor()`                                   | Checks if the string is a hex color.   [#FF#FF#FF] or [FFFFFF]                                                                                           |
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



## Build System

We are using npm to build the entire module.
During development we use the tsc compiler defined in the task.json for visual studio code cause the incremental compilation is very fast. To start the build and watch process in Visual Studio Code just press CTRL+SHIFT+B. The build console should come up and show you the results of the build process.
Any other editor can be used or just use tsc -w -p . on the commandline.

All available npm options:

### npm run tslint
Executes the linter for the typescript files in the src folder

### npm run tslint_test
Executes the linter for the typescript files in the test folder

### npm run ts
Runs the Typescript compiler for all files in the src directory

### npm run ts_test
Runs the Typescript compiler for all files in the test directory

### npm run build
Executes thes linter for the files in the src folder and runs the typescript compiler for the files in the src folder.

### npm run build_test
Executes thes linter for the files in the test folder and runs the typescript compiler for the files in the test folder.

### npm run build_all
Executes thes linter for the files in the src and test folder and runs the typescript compiler for the files in the src and test folder.

### npm run mocha
Just executes the local mocha command which relies in the local node_modules directory.

### npm run test
Executes the compilation of the test files and runs the mocha test.

### npm run cover
Runs the istanbuld code coverage test and remaps the results to the typescript sources

### npm run remap
Remaps the code coverage report to typescript

### npm run remaphtml
Remaps the html output of istanbul to the typescript sources

### npm run remaplcov
Remaps the lcov reports to the typescript sources

### npm run coveralls
Runs the code coverage reports, the remaps and send the results to the coveralls.io service

### npm run createdoc
Creates the HTML for the API documentation in the docs folder. The docs folder is in .gitignore and not part of the master branch. 

### npm run publishdocs
Publishes the API documentation to the gh-pages branch.

### npm run docs
Shortcut for createdocs and publishdocs

### npm run 2npm
Checks it the package version in package.json is higher than the registered one in npm registry and published the package if the version is higher.