import { MinLen, MaxLen, AlphaNumeric, IsBoolean } from '../../dist/decorators';

export class TestClass {
  constructor(name: string) {
    this.testString = name;
  }
  @MinLen(2)
  @MaxLen(10)
  @AlphaNumeric()
  @IsBoolean()
  testString: string;
  // testContainer: TestContainer;
}

class TestContainer {
  testNumber: number;
}
