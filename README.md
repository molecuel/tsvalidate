# tsvalidate

Allows validating properties of objects and (multi-)nested objects via predefined decorators.

## Usage

Upon defining classes add any of the predefined decorators to their properties, then call validate method passing the object:

Either
`typescript
import {Validator, AlphaNumeric, MaxLen, IsInt, IsNotEmpty, InArray, IsDecimal, HexColor} from "class-validator";

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
`

or
`typescript
import * as V from "class-validator";

export class Car {

    @DIsNotEmpty()
    model: string;

    @InArray(['BMW', 'Mercedes', 'Volkswagen', 'Audi', 'Honda', 'Porsche', 'Ford', 'Toyota'])
    make: string;

    @IsNotEmpty()
    @MaxLen(17)
    vehicleIdentificationNumber: string;

    @IsInt()
    horsepower: number;

    @IsDecimal()
    fuelCapacity: number;

    @AlphaNumeric()
    @HexColor()
    color: string;
}
`


##
