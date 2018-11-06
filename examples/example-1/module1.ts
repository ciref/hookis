import { hookis } from '@ticou/hookis';
import { BaseObject } from '../libs/base.object';

/**
 * Module 1.
 * @package: examples
 */
export class Module1 extends BaseObject {
  public constructor() {
    super();

    hookis.triggerBefore(this.getName().toLowerCase(), 'test');
    this.test();
    hookis.triggerAfter(this.getName().toLowerCase(), 'test');
  }

  protected test() {
    hookis.trigger(this.getName().toLowerCase(), 'test', { module: this.getName() });
    console.log(`Running test on ${this.getName()}`);
  }
}