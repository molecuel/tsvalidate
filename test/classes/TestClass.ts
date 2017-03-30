import * as D from "../../dist/decorators";
// tslint:disable:max-classes-per-file

export class InnermostTestClass {
  @D.ValidateType()
  public testProperty: number;
  constructor(propertyValue?: any) {
    this.testProperty = propertyValue || 0;
  }
}

export class NestedTestClass {
  @D.ValidateType()
  public testProperty: string;
  @D.ValidateNested()
  public testInnermostContainer: InnermostTestClass;
  constructor(propertyValue?: any, nestedPropertyValue?: any) {
    this.testProperty = propertyValue || "property";
    this.testInnermostContainer = new InnermostTestClass(nestedPropertyValue);
  }
}

export class MultiNestedTestClass {
  @D.ValidateType()
  public testProperty: boolean;
  @D.ValidateNested()
  public testInnerContainer: NestedTestClass;
  constructor(propertyValue?: any, nestedpropertyValue?: any, multiNestedPropertyValue?: any) {
    this.testProperty = propertyValue || false;
    this.testInnerContainer = new NestedTestClass(nestedpropertyValue, multiNestedPropertyValue);
  }
}
