
class Node<T> {
	val: T;
	next?: Node<T>;

	constructor(val: T, node?: Node<T>) {
		this.val = val;
		this.next = node;
	}
}

export default class SinglyLinkedList<T> {
	public length: number;

	head?: Node<T>;

	constructor() {
		this.length = 0;
	}

	prepend(item: T): void {
		this.head = new Node(item, this.head);
		this.length += 1;
	}
	insertAt(item: T, idx: number): void {
		if (this.head == undefined) {
			this.head = new Node(item, undefined);
			this.length += 1;
		} else {
			let cur = this.head;
			for (let i = 0; i < idx; i++) {
				if (cur.next != undefined) { // inserts at end if index is not large enough
					cur = cur.next;
				}
			}
			let next = cur.next;
			cur.next = new Node(item, next);
			this.length += 1;
		}

	}
	append(item: T): void {
		let cur = this.head;

		if (cur == undefined) {
			this.head = new Node(item, undefined);
			this.length += 1;
			return;
		}
		while (cur.next !== undefined) {
			cur = cur.next
		}
		if (cur != undefined) {
			cur.next = new Node(item, undefined);
			this.length += 1;
		} 
	}
	remove(item: T): T | undefined {
		if (this.head == undefined) {
			return undefined;
		}
		if (this.head.val === item) {
			let ret = this.head.val;
			this.head = this.head.next;
			this.length -= 1;
			return ret;
		} 

		let prev = this.head;
		let cur = prev.next;
		while (cur != undefined) {
			if (cur.val === item) {
				let res = cur.val;
				prev.next = cur.next;
				this.length -= 1;
				return res;
			}
			prev = cur;
			cur = prev.next;
		} 
		return undefined;
	}
	get(idx: number): T | undefined {
		if (this.head == undefined) {
			return undefined;
		}

		let cur = this.head;
		for (let i = 0; i < idx; i++) {
			if (cur.next == undefined) {
				return undefined;
			}
			cur = cur.next;
		}
		return cur.val;
	}
	removeAt(idx: number): T | undefined {
		if (this.head == undefined) {
			return undefined;
		}

		if (idx == 0) {
			let r = this.head.val;
			this.head = this.head.next;
			this.length -= 1;
			return r;
		}

		let prev = this.head;
		if (prev != undefined) {
			for (let i = 0; i < idx - 1; i++) {
				if (prev.next != undefined) {
					prev = prev.next;
				}
			}
			let remove = prev.next;
			if (remove == undefined) {
				return undefined;
			}
			let next = remove.next;
			prev.next = next;
			this.length -= 1;
			return remove.val;
		}
		return undefined
	}
}
