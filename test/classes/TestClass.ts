import * as D from '../../dist/decorators';

export class InnermostTestClass {
  private _decoratorName: string = D.DecoratorTypes.IS_TYPED;
  private _decoratorValue: number | string = 0;
  constructor(value: number = 0, decoratorName: string = D.DecoratorTypes.IS_TYPED, decoratorValue?: number | string) {
    this.testNumber = value;
    this._decoratorName = decoratorName;
    this._decoratorValue = decoratorValue;
  }
  // @D.CustomDecorator(this._decoratorName, this._decoratorValue)
  testNumber: number;
  testBool: boolean = false;
  testText: string = 'text';
}

export class InnerContainerClass {
  constructor(name: string = 'newTestClass', _bool: boolean = true, _number: number = 0) {
    this.testText = name;
    this.testBool = _bool;
    this.testNumber = _number;
    this.testInnermostContainer = new InnermostTestClass();
  }
  testNumber: number;
  testBool: boolean = false;
  testText: string = 'text';
  testInnermostContainer: InnermostTestClass;
}

export class CustomTestClass {
  private _decoratorName: string = D.DecoratorTypes.IS_TYPED;
  private _decoratorValue: number | string = 0;
  constructor(name: string = 'newTestClass', decoratorName: string = D.DecoratorTypes.IS_TYPED, decoratorValue?: number | string,
    nestedValue?: number, nestedDecoratorName?: string, nestedDecoratorValue?: number | string) {
    this.testString = name;
    this._decoratorName = decoratorName;
    this._decoratorValue = decoratorValue;
    this.testContainer = new InnermostTestClass(nestedValue, nestedDecoratorName, nestedDecoratorValue);
  }
  // @D.CustomDecorator(this._decoratorName, this._decoratorValue)
  testString: string;
  @D.ValidateNested()
  testContainer: InnermostTestClass;
}

export class OuterContainerClass {
  constructor() {
    this.testInnerContainer = new InnerContainerClass();
  }

  @D.ValidateNested()
  testInnerContainer: InnerContainerClass;
}
