export default function quick_sort(arr: number[]): void {
	do_quick_sort(arr, 0, arr.length - 1);
}

function do_quick_sort(arr: number[], lo: number, hi: number): void {
	if (lo >= hi) {
		return 
	}
	let pivot = arr[hi];

	let j = lo;
	for (let i = lo; i <= hi - 1; i++) { 
		let cur = arr[i];
		if (cur <= pivot) {
			arr[i] = arr[j]
			arr[j] = cur
			j++;
		} 
	}
	arr[hi] = arr[j]
	arr[j] = pivot
	j++;
	do_quick_sort(arr, lo, j - 2);
	do_quick_sort(arr, j, hi);
}
