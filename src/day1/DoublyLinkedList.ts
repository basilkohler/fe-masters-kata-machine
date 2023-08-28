export class Node<T> {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;

    constructor(value: T, next?: Node<T>, prev?: Node<T>) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): Node<T> {

        if (this.head == undefined || this.tail == undefined) {
            const node = new Node(item, undefined, undefined);
            this.length++;
            this.head = this.tail = node
            return node;
        }

        this.length++;
        const node = new Node(item, this.head, undefined);
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
        return node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("yikes");
        } else if (idx == this.length) {
            this.append(item);
        } else if (idx == 0) {
            this.prepend(item);
        }

        let cur = this.head;
        for (let i = 0; i < idx; i++) {
            if (cur && cur.next) {
                cur = cur?.next;
            }
        }
        if (!cur) {
            return undefined
        }
        const node = new Node(item, cur.next, cur.prev);
        this.length++;
        cur.next = node;
        cur.prev = node;
        return;

    }
    append(item: T): Node<T> {
        if (this.tail == undefined) {
            this.head = new Node(item, undefined, undefined);
            this.tail = this.head;
            this.length++;
            return this.head;
        }

        const node = new Node(item, undefined, this.tail);
        this.tail.next = node;
        this.tail = node;
        this.length++;
        return node;

    }
    public remove_tail(): T | undefined {
        if (this.tail == undefined) {
            return;
        }
        if (this.tail.prev == undefined) {
            let value = this.tail.value;
            this.tail = this.head = undefined;
            this.length--;
            return value;
        }

        let tail = this.tail;
        let value = tail.value;
        console.log("tail value:", value);

        let prev = this.tail.prev;
        prev.next = undefined;
        if (this.tail.prev) {
            this.tail.prev.next = this.tail;
        }
        this.tail = prev;
        this.length--;

        return value;
    }
    public remove_node(node: Node<T>): void {
        if (node == undefined) {
            return;
        }

        console.log(`remove ${node.value}`)
        this.print()
        let prev = node.prev;
        if (prev == undefined) {
            this.head = node.next;
        }

        let next = node.next;
        if (next == undefined) {
            this.tail = node.prev;
        }
        if (prev) {
            prev.next = node.prev;
        }
        if (next) {
            next.prev = node.next;
        }
        this.length--;
        this.print()
        console.log(`remove done ${node.value}`)
    }
    remove(item: T): T | undefined {
        if (this.head == undefined) {
            return undefined;
        }

        let cur: Node<T> | undefined = this.head;
        for (let i = 0; i < this.length; i++) {
            if (!cur || cur.value == item) {
                break;
            }
            cur = cur.next;
        }

        if (!cur) {
            return undefined;
        }

        this.remove_node(cur);

        return cur.value;
    }
    get(idx: number): T | undefined {
        return this.get_node(idx)?.value;
    }
    private get_node(idx: number): Node<T> | undefined {
        if (idx > this.length / 2) {
            return this.get_back(idx);
        } else {
            return this.get_front(idx);
        }
    }
    private get_front(idx: number): Node<T> | undefined {
        let cur = this.head;
        for (let i = 0; i < idx; i++) {
            cur = cur?.next;
        }
        return cur;
    }
    private get_back(idx: number): Node<T> | undefined {
        let cur = this.tail;
        for (let i = this.length - 1; i > idx; i--) {
            cur = cur?.prev;
        }
        return cur;
    }
    removeAt(idx: number): T | undefined {
        if (this.head == undefined) {
            return undefined;
        }

        let cur = this.get_node(idx);

        if (cur == undefined) {
            return undefined;
        }

        if (cur.prev == undefined) {
            this.head = cur.next;
        }
        if (cur.next == undefined) {
            this.tail = cur.prev;
        }
        if (cur.prev) {
            cur.prev.next = cur.next;
        }
        if (cur.next) {
            cur.next.prev = cur.prev;
        }
        this.length--;
        return cur?.value;
    }
    print() {
        let s = "head->[";
        let cur = this.head;
        for (let i = 0; i < this.length; i++) {
            s += ` ${cur?.value},`;
            cur = cur?.next;
        }
        s += "]";
        console.log(s);
        s = "tail->[";
        cur = this.tail;
        for (let i = 0; i < this.length; i++) {
            s += ` ${cur?.value},`;
            cur = cur?.prev;
        }
        s += "]";
        console.log(s);
    }
}
