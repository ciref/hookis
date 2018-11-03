/**
 * Helpers class.
 * @package hookis
 */
export class Helpers {
    private static context: any;

    /**
     * Constructor.
     * @param context
     */
    public constructor(context?: any) {
        if (Helpers.isNullOrUndefined(context))
            context = this;
        Helpers.context = context;
    }

    /**
     * Generate the skeleton for a package.
     * @param pkg
     * @param context
     */
    public static provide(pkg: any, context: any) {
        let parts,
            optContext = context || Helpers.context,
            part, i;

        if (Array.isArray(pkg)) {
            parts = pkg;
        } else {
            Helpers.assertTypeOf('string', pkg);
            parts = pkg.split('.');
        }

        for (i = 0; i < parts.length; i += 1) {
            part = parts[i];
            optContext[part] = optContext[part] || {};
            optContext = optContext[part];
        }
    };

    /**
     * Check if the value is either null or undefined
     * @param {*} arg
     * @return boolean
     */
    public static isNullOrUndefined(arg: any): boolean {
        return arg == null;
    }

    /**
     * Check if the value is undefined
     * @param {*} val
     * @return boolean
     */
    public static isUndefined(val: any) {
        return val === undefined;
    }

    /**
     * Throw an exception of the type doesn't match.
     * @param type
     * @param val
     */
    public static assertTypeOf(type: string, val: any) {
        if (typeof val !== type) {
            throw new TypeError("Expecting param of " +
                arguments.callee + "to be a(n) " + type + "." +
                "  Was actually a(n) " + typeof val + ".");
        }
    };

    /**
     * Tests if object[parent] contains child
     *
     * @param {Object} object The object to add to
     * @param {String} parent The parent array to add to.
     * @param {*}      value  The value
     */
    public static isInObjectArray = function (object: any, parent: string, value: any) {
        Helpers.assertTypeOf('object', object);
        Helpers.assertTypeOf('string', parent);

        return typeof(object[parent]) != 'undefined' && object[parent].includes(value);
    };

    /**
     * Adds child to object[parent] array.
     *
     * @param {Object} object The object to add to
     * @param {String} parent The parent array to add to.
     * @param {*}      value  The value
     * @return {boolean}
     */
    public static pushToObjectArray(object: object | any, parent: string, value: any): boolean {
        Helpers.assertTypeOf('object', object);
        Helpers.assertTypeOf('string', parent);

        if (!(object[parent] instanceof Array))
            object[parent] = [];

        if (object[parent].includes(value))
            return object[parent].push(value);

        return false;
    };
}