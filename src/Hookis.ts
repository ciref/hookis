import {Helpers} from "./Helpers";
import {PriorityList} from "./PriorityList";

/**
 * Hooks class.
 * @package hookis
 */
export class Hookis {
    protected hooks: any = {};
    protected instantHooks: any = {};
    protected triggeredHooks: any = {};

    /**
     * Registers a hook handler with the event system.
     * @param name
     * @param type
     * @param handler
     * @param priority
     */
    public register(name: string, type: string, handler: object | any, priority?: number) {
        Helpers.assertTypeOf('string', name);
        Helpers.assertTypeOf('string', type);
        Helpers.assertTypeOf('function', handler);

        if (!name || !type)
            return false;

        Helpers.provide([name, type], this.hooks);

        if (!(this.hooks[name][type] instanceof PriorityList)) {
            this.hooks[name][type] = new PriorityList();
        }

        // call if instant and already triggered.
        if (this.isInstantHook(name, type) && this.isTriggeredHook(name, type))
            handler(name, type, null, null);

        return this.hooks[name][type].insert(handler, priority);
    }

    /**
     * Registers a hook handler with the event system with before prefix on hook name.
     * @param name
     * @param type
     * @param handler
     * @param priority
     */
    public registerBefore(name: string, type: string, handler: object | any, priority?: number) {
        return this.register(`before:${name}`, type, handler, priority);
    }

    /**
     * Registers a hook handler with the event system with after prefix on hook name.
     * @param name
     * @param type
     * @param handler
     * @param priority
     */
    public registerAfter(name: string, type: string, handler: object | any, priority?: number) {
        return this.register(`after:${name}`, type, handler, priority);
    }

    /**
     * Emits a hook.
     * Loops through all registered hooks and calls the handler functions in order.
     * Every handler function will always be called, regardless of the return value.
     *
     * @param name
     * @param type
     * @param params
     * @param value
     * @return any
     */
    public trigger(name: string, type: string, params?: object | any, value ?: any): any {
        Helpers.assertTypeOf('string', name);
        Helpers.assertTypeOf('string', type);

        // mark as triggered
        this.setTriggeredHook(name, type);

        // default to null if un passed
        value = !Helpers.isNullOrUndefined(value) ? value : null;

        let hooks = this.hooks,
            tempReturnValue = null,
            returnValue = value,
            callHookHandler = (handler: any) => {
                tempReturnValue = handler(params, returnValue);
                if (!Helpers.isNullOrUndefined(tempReturnValue)) {
                    returnValue = tempReturnValue;
                }
            };

        Helpers.provide([name, type], hooks);
        Helpers.provide(['all', type], hooks);
        Helpers.provide([name, 'all'], hooks);
        Helpers.provide(['all', 'all'], hooks);

        let hooksList = [];

        if (name != 'all' && type != 'all')
            hooksList.push(hooks[name][type]);

        if (type != 'all')
            hooksList.push(hooks['all'][type]);

        if (name != 'all')
            hooksList.push(hooks[name]['all']);

        hooksList.push(hooks['all']['all']);

        hooksList.every((handlers) => {
            if (handlers instanceof PriorityList)
                handlers.forEach(callHookHandler);
            return true;
        });

        return returnValue;
    };

    /**
     * Emit a hook wit before prefix of name.
     * @param name
     * @param type
     * @param params
     * @param value
     */
    public triggerBefore(name: string, type: string, params?: object | any, value ?: any): any {
        return this.trigger(`before:${name}`, type, params, value);
    }

    /**
     * Emit a hook wit after prefix of name.
     * @param name
     * @param type
     * @param params
     * @param value
     */
    public triggerAfter(name: string, type: string, params?: object | any, value ?: any): any {
        return this.trigger(`after:${name}`, type, params, value);
    }

    /**
     * Is this hook registered as an instant hook?
     *
     * @param {String} name The hook name.
     * @param {String} type The hook type.
     * @return {boolean}
     */
    public isInstantHook(name: string, type: string): boolean {
        return Helpers.isInObjectArray(this.instantHooks, name, type);
    };

    /**
     * Has this hook been triggered yet?
     *
     * @param {String} name The hook name.
     * @param {String} type The hook type.
     * @return {boolean}
     */
    public isTriggeredHook(name: string, type: string): boolean {
        return Helpers.isInObjectArray(this.triggeredHooks, name, type);
    };

    /**
     * Records that a hook has been triggered.
     *
     * @param {String} name The hook name.
     * @param {String} type The hook type.
     */
    protected setTriggeredHook(name: string, type: string) {
        return Helpers.pushToObjectArray(this.triggeredHooks, name, type);
    };
}