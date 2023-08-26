function do_search(node: BinaryNode<number> | null, needle: number): boolean {
	if (node == null) {
		return false;
	}
	if (node.value == needle) {
		return true;
	}
	if (node.value < needle) {
		return do_search(node.right, needle);
	} else {
		return do_search(node.left, needle);
	}

}
export default function dfs(head: BinaryNode<number>, needle: number): boolean {
	return do_search(head, needle);
}
