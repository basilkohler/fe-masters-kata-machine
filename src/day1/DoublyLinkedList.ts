class Node<T> {
	val: T;
	next?: Node<T>;
	prev?: Node<T>;

	constructor(val: T, next?: Node<T>, prev?: Node<T>) {
		this.val = val;
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

	prepend(item: T): void {
		const node = new Node(item, this.head, undefined);
		this.length++;
		const next = this.head?.next;
		if (next) {
			next.prev = node;
		}
		this.head = node;
		if (this.tail == undefined) {
			this.tail = node;
		}
		return;
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
	append(item: T): void {
		if (this.tail == undefined) {
			this.head = new Node(item, undefined, undefined);
			this.tail = this.head;
			this.length++;
			return;
		}

		const node = new Node(item, undefined, this.tail);
		this.tail.next = node;
		this.tail = node;
		this.length++;

	}
	remove(item: T): T | undefined {
		if (this.head == undefined) {
			return undefined;
		}

		let cur: Node<T> | undefined = this.head;
		for (let i = 0; i < this.length; i++) {
			if (!cur || cur.val == item) {
				break;
			}
			cur = cur.next;
		}

		if (!cur) {
			return undefined;
		}

		if (cur.prev == undefined) {
			this.head = cur.next;
		}
		if (cur.next == undefined) {
			this.tail = cur.prev;
		}
		if (cur.prev) {
			cur.next = cur.next;
		}
		if (cur.next) {
			cur.prev = cur.prev;
		}
		this.length--;
		return cur.val;
	}
	get(idx: number): T | undefined {
		return this.get_node(idx)?.val;
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
		return cur?.val;
	}
}
