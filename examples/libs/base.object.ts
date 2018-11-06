/**
 * Base object.
 * @package: core.
 */
export class BaseObject {
  /**
   * Return class base name as string.
   * @return string
   */
  public getName(): string {
    return (<any>this).constructor.name;
  }
}