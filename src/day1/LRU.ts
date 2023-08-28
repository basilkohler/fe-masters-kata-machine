type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class LRU<K, V> {
    private length: number;
    private capacity: number;

    private head?: Node<V>;
    private tail?: Node<V>;

	private lookup_by_key: Map<K, Node<V>>;
	private lookup_by_node: Map<Node<V>, K>;

    constructor(capacity: number) {
		this.capacity = capacity;
		this.length = 0;
		this.lookup_by_key = new Map();
		this.lookup_by_node = new Map();
        this.head = undefined;
        this.tail = undefined;
    }

    update(key: K, value: V): void {
		let node = this.lookup_by_key.get(key);

		if (node == undefined) {
			let node = {value} as Node<V>;
			this.length++;
			this.prepend(node);
			this.restrict_cache();
			this.lookup_by_key.set(key, node);
			this.lookup_by_node.set(node, key);
		} else {
			this.remove(node);
			this.prepend(node);
			node.value = value;
		}
    }

    get(key: K): V | undefined {
		let node = this.lookup_by_key.get(key);
		if (node == undefined) {
			return undefined;
		}

		this.remove(node);
		this.prepend(node);
		return node.value;
    }
	
	private restrict_cache() {
		if (this.tail == undefined || this.length <= this.capacity) {
			return;
		}

		let tail = this.tail
		this.remove(tail);
		this.length--;

		let key = this.lookup_by_node.get(tail);
		if (key == undefined) {
			throw new Error ("oopsie");
		}
		this.lookup_by_key.delete(key);
		this.lookup_by_node.delete(tail);
	}

	private remove(node: Node<V>): void {
		if (node.prev) {
			node.prev.next = node.next;
		} 
		if (node.next) {
			node.next.prev = node.prev;
		} 
		if (this.head === node) {
			this.head = this.head.next;
		}
		if (this.tail === node) {
			this.tail = this.tail.prev;
		}
		node.next = undefined;
		node.prev = undefined;

	}

    private prepend(node: Node<V>): void {
        if (this.head == undefined || this.tail == undefined) {
            this.head = node;
			this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

}
