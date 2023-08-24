class Node<T> {
	value: T;
	prev?: Node<T>;

	constructor(value: T, next?: Node<T>) {
		this.value = value;
		this.prev = next;
	}
}
export default class Stack<T> {
	public length: number;

	private head?: Node<T>;


	constructor() {
		this.head = undefined;
		this.length = 0;
	}

	push(item: T): void {
		if (!this.head) {
			this.head = new Node(item, undefined)
		} else {
			this.head = new Node(item, this.head);
		}
		this.length++;
	}
	pop(): T | undefined {
		if (!this.head) {
			return undefined;
		}
		let head = this.head;
		this.head = this.head.prev;
		this.length--;
		head.prev = undefined;
		return head.value;

	}
	peek(): T | undefined {
		return this.head?.value;
	}
}
