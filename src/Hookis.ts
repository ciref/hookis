import {Helpers} from "./Helpers";
import {PriorityList} from "./PriorityList";

/**
 * Hooks class.
 * @package hookis
 */
export class Hookis {
    protected hooks: any = {};
    protected instantHooks: any = [];
    protected triggeredHooks: any = [];
    private static instance: Hookis;

    /**
     * Constructor.
     * @return any
     */
    public constructor() {
        if (Hookis.instance)
            return Hookis.instance;
        Hookis.instance = this;
    }

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

        // call if already triggered.
        if (this.isTriggeredHook(name, type))
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
        this.markAsTriggeredHook(name, type);

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

        let hooksList = [];
        Helpers.provide([name, type], hooks);
        hooksList.push(hooks[name][type]);

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
     * Return all registered handlers.
     * @return any
     */
    public getAllHandlers(): any {
        return this.hooks;
    }

    /**
     * Registers a hook as an instant hook.
     *
     * After being trigger once, registration of a handler to an instant hook will cause the
     * handle to be executed immediately.
     *
     * @param name name The hook name.
     * @param type type The hook type.
     * @return number|boolean integer
     */
    public registerInstant(name: string, type: string): boolean | number {
        Helpers.assertTypeOf('string', name);
        Helpers.assertTypeOf('string', type);

        return Helpers.pushToObjectArray(this.instantHooks, name, type);
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
    protected markAsTriggeredHook(name: string, type: string) {
        return Helpers.pushToObjectArray(this.triggeredHooks, name, type);
    };
}
