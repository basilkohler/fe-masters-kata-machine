type HeapNode<T> = {
    value: number,
    data: T
}

export default class MinHeapData<T> {
    public length: number;

    private heap: HeapNode<T>[];

    constructor() {
        this.length = 0;
        this.heap = [];
    }

    insert(value: number, data: T): void {
        if (this.length < this.heap.length) {
            this.heap[this.length] = { value, data};
        } else {
            this.heap.push({ value, data});
        }
        this.length++;

        this.bubble_up(this.length - 1);
    }

    bubble_up(elem_idx: number): void {
        let elem = this.heap[elem_idx];

        let idx = elem_idx;
        while (idx > 0) {
            const idx_parent = Math.floor((idx + 1) / 2) - 1;
            if (idx_parent >= 0) {
                let elem_parent = this.heap[idx_parent];
                if (elem.value < elem_parent.value) {
                    this.heap[idx_parent] = elem;
                    this.heap[idx] = elem_parent;
                }
            }
            idx = idx_parent;
        }
    }

    bubble_down(): void {
        let idx = 0;
        while (idx < this.length - 1) {

            const idx_parent_left = (idx + 1) * 2 - 1;
            const idx_parent_right = idx_parent_left + 1;

            let idx_parent_min = idx;
            if (idx_parent_left < this.length - 1
                && this.heap[idx_parent_left].value < this.heap[idx_parent_min].value) {
                idx_parent_min = idx_parent_left
            }
            if (idx_parent_right < this.length - 1
                && this.heap[idx_parent_right].value < this.heap[idx_parent_min].value) {
                idx_parent_min = idx_parent_right
            }

            if (idx_parent_min != idx) {
                const tmp = this.heap[idx];
                this.heap[idx] = this.heap[idx_parent_min];
                this.heap[idx_parent_min] = tmp;
                idx = idx_parent_min;
            } else {
                break;
            }
        }
    }

    delete(): HeapNode<T> | undefined {
        if (this.length === 0) {
            return undefined;
        }
        let head = this.heap[0];
        let ret = {value: head.value, data: head.data};
        this.heap[0] = this.heap[this.length - 1];
        this.length--;
        this.bubble_down();
        return ret;
    }

    peak(): HeapNode<T> | undefined {
        if (this.length == 0) {
            return undefined;
        }
        return this.heap[0];
    }
    print() {
        let s = "[";
        for (let i = 0; i < this.length; i++) {
            s += ` ${this.heap[i].value} (${this.heap[i].data}),`
        }
        s += "]";
        console.log(s);
    }
}
