class Node<T> {
	val: T;
	next?: Node<T>;

	constructor(val: T, next?: Node<T>) {
		this.val = val;
		this.next = next;
	}
}

export default class Queue<T> {
	public length: number;

	private head?: Node<T>;
	private tail?: Node<T>;


	constructor() {
		this.head = undefined;
		this.tail = undefined;
		this.length = 0;
	}

	enqueue(item: T): void {
		const node = new Node(item, undefined);
		if (!this.tail) {
			this.tail = node;
			this.head = node;
		} else {
			const tail = this.tail;
			tail.next = node;
			this.tail = node;
		}
		this.length++;
	}
	deque(): T | undefined {
		if (!this.head) {
			return undefined;
		}
		const head = this.head;
		this.head = this.head.next;
		this.length--;
		head.next = undefined;
		if (this.head == undefined) {
			this.tail = undefined;
		}
		return head.val;
	}
	peek(): T | undefined {
		return this.head?.val;
	}
}
