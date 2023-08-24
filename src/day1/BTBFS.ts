import Queue from "./Queue";

function do_search(head: BinaryNode<number> | undefined, needle: number): boolean {

	if (head == undefined) {
		return false;
	}

	let queue = new Queue<BinaryNode<number>>();
	queue.enqueue(head);
	while (queue.length > 0) {
		let next = queue.deque();
		if (next == undefined) {
			return false;
		}
		if (next.value == needle) {
			return true;
		}
		if (next.left) {
			queue.enqueue(next.left);
		}
		if (next.right) {
			queue.enqueue(next.right);
		}
	}
	return false;
}

export default function bfs(head: BinaryNode<number>, needle: number): boolean {

	return do_search(head, needle);
}
