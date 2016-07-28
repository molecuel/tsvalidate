import * as D from '../../dist/decorators';

export class InnermostTestClass {
  constructor(propertyValue: any = 0) {
    this.testProperty = propertyValue;
  }
  @D.ValidateType()
  testProperty: number;
}

export class NestedTestClass {
  constructor(propertyValue: any = 'property', nestedPropertyValue?: any) {
    this.testProperty = propertyValue;
    this.testInnermostContainer = new InnermostTestClass(nestedPropertyValue);
  }
  @D.ValidateType()
  testProperty: string;
  @D.ValidateNested()
  testInnermostContainer: InnermostTestClass;
}

export class MultiNestedTestClass {
  constructor(propertyValue: any = false, nestedpropertyValue?: any, multiNestedPropertyValue?: any) {
    this.testProperty = propertyValue;
    this.testInnerContainer = new NestedTestClass(nestedpropertyValue, multiNestedPropertyValue);
  }
  @D.ValidateType()
  testProperty: boolean;
  @D.ValidateNested()
  testInnerContainer: NestedTestClass;
}
