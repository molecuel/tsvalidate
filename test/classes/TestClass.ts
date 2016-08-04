import * as D from '../../dist/decorators';

export class InnermostTestClass {
  constructor(propertyValue?: any) {
    this.testProperty = propertyValue || 0;
  }
  @D.ValidateType()
  testProperty: number;
}

export class NestedTestClass {
  constructor(propertyValue?: any, nestedPropertyValue?: any) {
    this.testProperty = propertyValue || 'property';
    this.testInnermostContainer = new InnermostTestClass(nestedPropertyValue);
  }
  @D.ValidateType()
  testProperty: string;
  @D.ValidateNested()
  testInnermostContainer: InnermostTestClass;
}

export class MultiNestedTestClass {
  constructor(propertyValue?: any, nestedpropertyValue?: any, multiNestedPropertyValue?: any) {
    this.testProperty = propertyValue || false;
    this.testInnerContainer = new NestedTestClass(nestedpropertyValue, multiNestedPropertyValue);
  }
  @D.ValidateType()
  testProperty: boolean;
  @D.ValidateNested()
  testInnerContainer: NestedTestClass;
}
