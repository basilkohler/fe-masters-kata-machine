

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
	let visited = do_search(source, []);
	if (visited.length == 0) {
		return null;
	}
	console.log(visited)
	return visited;

	function do_search(cur: number | undefined, visited: number[]): number[] {
		if (cur === undefined) {
			return [];
		}

		visited.push(cur);

		if (cur == needle) {
			return visited;
		}


		let adjs = graph[cur];
		for (let a = 0; a < adjs.length; a++) {
			let adj = adjs[a];
			if (visited.indexOf(adj.to) < 0) {
				let found = do_search(adj.to, visited);
				if (found.length > 0) {
					return visited;
				} 
			}
		}
		visited.pop();
		return [];
	}

}
