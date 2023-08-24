class Array<T> {
	private capacity: number;
	private array: T[];

	constructor(capacity: number) {
		this.capacity = capacity;
		this.array = [] as T[] ;
	}

	write(idx: number, val: T): void {
		if (idx >= this.capacity) {
			throw new Error("Array Out of Bounds on write: " + idx);
		}
		this.array[idx] = val;
	}

	get(idx: number): T {
		if (idx >= this.capacity) {
			throw new Error("Array Out of Bounds on read: " + idx);
		}
		return this.array[idx];
	}
}

export default class ArrayList<T> {
	public length: number;
	private capacity = 2;

	private array: Array<T>;

	constructor(capacity: number) {
		this.length = 0;
		this.capacity = capacity;
		this.array = new Array(this.capacity);
	}

	prepend(item: T): void {
		this.insertAt(item, 0);
	}
	insertAt(item: T, idx: number): void {
		this.length++;
		this.adjustSize();

		for (let i = this.length - 1; i > idx; i--) {
			this.array.write(i, this.array.get(i-1));
		}
		this.array.write(0, item);
	}

	append(item: T): void {
		this.length++;
		this.adjustSize();
		this.array.write(this.length - 1, item);
	}
	remove(item: T): T | undefined {
		let idx = 0;
		while (idx < this.length && item != this.array.get(idx)) {
			idx++;
		}

		if (idx >= this.length) {
			return undefined;
		} else {
			return this.removeAt(idx);
		}

	}
	get(idx: number): T | undefined {
		if (idx < this.length) {
			return this.array.get(idx);
		} else {
			return undefined;
		}
	}
	removeAt(idx: number): T | undefined {
		if (idx >= this.length) {
			return undefined;
		}
		this.length--;
		let r = this.array.get(idx);
		for (let i = idx; i < this.length; i++) {
			this.array.write(i, this.array.get(i+1));
		}
		return r;
	}

	private adjustSize() {
		if (this.length >= this.capacity) {
			this.capacity *= 2;
			let newArray = new Array<T>(this.capacity);

			for (let i = 0; i < this.length; i++) {
				newArray.write(i, this.array.get(i));
			}
			this.array = newArray;
		}
	}
}
