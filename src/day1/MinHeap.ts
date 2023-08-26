
export default class MinHeap {
	public length: number;

	private heap: number[];

	constructor() {
		this.length = 0;
		this.heap = [];
	}

	insert(value: number): void {
		this.heap.push(value);
		this.length++;

		this.bubble_up(this.length - 1);
	}

	bubble_up(elem_idx: number): void {
		let value = this.heap[elem_idx];

		let idx = elem_idx;
		while (idx > 0) {
			const idx_parent = Math.floor( (idx + 1) / 2) - 1;
			if (idx_parent >= 0) {
				let value_parent = this.heap[idx_parent]
				if (value < value_parent) {
					this.heap[idx_parent] = value;
					this.heap[idx] = value_parent;
				}
			}
			idx = idx_parent;
		}
	}

	bubble_down(): void {
		let idx = 0;
		while (idx < this.length - 1) {
			const value = this.heap[idx];
			const idx_parent_left = (idx + 1) * 2 - 1;
			const idx_parent_right = idx_parent_left + 1;

			let idx_parent_min = idx;
			if (idx_parent_left < this.length - 1 
				&& this.heap[idx_parent_left] < this.heap[idx_parent_min]) {
				idx_parent_min = idx_parent_left
			}
			if (idx_parent_right < this.length - 1 
				&& this.heap[idx_parent_right] < this.heap[idx_parent_min]) {
				idx_parent_min = idx_parent_right
			}

			if (idx_parent_min != idx) {
				this.heap[idx] = this.heap[idx_parent_min];
				this.heap[idx_parent_min] = value;
				idx = idx_parent_min;
			} 
			else {
				break;
			}
		}
	}

	delete(): number | undefined {
		if (this.length === 0) {
			return 0;
		}
		let value = this.heap[0];
		this.heap[0] = this.heap[this.length - 1];
		this.heap[this.length - 1] = 0;
		this.length--;

		this.bubble_down();

		return value;
	}

	peak(): number | undefined {
		if (this.heap.length == 0) {
			return undefined;
		}
		return this.heap[0];
	}
}
