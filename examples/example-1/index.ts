import { hookis } from '@ticou/hookis';
import { Module1 } from './module1';


// register handler
const handler = (params: any, ret: any): any => {
  console.log(params);
  console.log(ret);
};

// register hooks
let hookType = 'test';
for (let i = 1; i <= 3; i++) {
  let hookName = 'module' + i;
  hookis.registerBefore(hookName, hookType, handler);
  hookis.registerAfter(hookName, hookType, handler);
  hookis.register(hookName, hookType, handler);
}

// list all registered hooks

//
console.log('\n\n');

(new Module1());