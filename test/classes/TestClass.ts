import { AlphaNum, MinLen, MaxLen } from '../../dist';
export class TestClass {

  constructor(name: string) {
    this.testString = name;
  }

  @MinLen(2)
  @MaxLen(10)
  @AlphaNum()
  testString: string;
}
