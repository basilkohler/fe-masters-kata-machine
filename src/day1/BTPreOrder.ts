function do_search(head: BinaryNode<number> | null, res: number[]): number[] {
	if (head == null) {
		return res;
	}
	res.push(head.value);
	do_search(head.left, res);
	do_search(head.right, res);
	return res;
}
export default function pre_order_search(head: BinaryNode<number>): number[] {
	return do_search(head, []);
}
