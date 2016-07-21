import { Validator } from '../../dist';

// create validator
let valid = new Validator();
// get MaxLen Decorator
let MaxLen = valid.d.MaxLen;

export class TestClass {

  constructor(name: string) {
    this.testString = name;
  }

  @MaxLen(10)
  testString: string;
}
