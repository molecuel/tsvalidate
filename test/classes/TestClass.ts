import * as D from '../../dist/decorators';

export class InnerTestClass {
  private _decoratorName: string = D.DecoratorTypes.IS_NUMBER;
  private _decoratorValue: number | string = 0;
  constructor(value: number = 0, decoratorName: string = D.DecoratorTypes.IS_NUMBER, decoratorValue?: number | string) {
    this.testNumber = value;
    this._decoratorName = decoratorName;
    this._decoratorValue = decoratorValue;
  }
  // @D.CustomDecorator(this._decoratorName, this._decoratorValue)
  @D.IsString()
  testNumber: number;
  @D.IsNumber()
  testBool: boolean = false;
  @D.IsBoolean()
  testText: string = 'text';
}

export class CustomTestClass {
  private _decoratorName: string = D.DecoratorTypes.IS_STRING;
  private _decoratorValue: number | string = 0;
  constructor(name: string = 'newTestClass', decoratorName: string = D.DecoratorTypes.IS_STRING, decoratorValue?: number | string,
    nestedValue?: number, nestedDecoratorName?: string, nestedDecoratorValue?: number | string) {
    this.testString = name;
    this._decoratorName = decoratorName;
    this._decoratorValue = decoratorValue;
    this.testContainer = new InnerTestClass(nestedValue, nestedDecoratorName, nestedDecoratorValue);
  }
  // @D.CustomDecorator(this._decoratorName, this._decoratorValue)
  testString: string;
  @D.ValidateNested()
  testContainer: InnerTestClass;
}
