function do_search(head: BinaryNode<number> | undefined, res: number[]): number[] {
	if (head == undefined) {
		return res;
	}
	do_search(head.left, res);
	do_search(head.right, res);
	res.push(head.value);
	return res;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
	return do_search(head, []);
}
