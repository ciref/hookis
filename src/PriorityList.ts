import {Helpers} from "./Helpers";

/**
 * PriorityList class.
 * @package hookis
 */
export class PriorityList {
    protected length: number;
    protected priorities: any[];

    /**
     * Constructor.
     * @return VoidFunction
     */
    public constructor() {
        this.length = 0;
        this.priorities = [];
    }

    /**
     * Inserts an element into the priority list at the priority specified.
     * @param {Object} obj          The object to insert
     * @param {Number} thePriority An optional priority to insert at.
     * @return {VoidFunction}
     */
    public insert(obj: Object, thePriority?: number | any): void {
        let priority = 500;
        if (arguments.length == 2 && priority !== undefined)
            priority = parseInt(thePriority, 10);

        priority = Math.max(priority, 0);

        if (Helpers.isUndefined(this.priorities[priority]))
            this.priorities[priority] = [];

        this.priorities[priority].push(obj);
        this.length++;
    };

    /**
     * Iterates through each element in order.
     * @param callback
     * @return PriorityList
     */
    public forEach(callback: any): PriorityList {
        Helpers.assertTypeOf('function', callback);
        let index = 0;
        this.priorities.forEach(function (elems: any) {
            elems.forEach(function (elem: any) {
                callback(elem, index++);
            });
        });

        return this;
    };

}