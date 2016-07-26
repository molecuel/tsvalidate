export interface IMetadataInformation {
  /**
   * The target class that is to be validated.
   */
  target: Object;
  /**
   * Name of the property that is to be validated.
   */
  property: string;
  /**
   * Single entry of metadata of the property that is to be validated.
   */
  entry?: any;
}
