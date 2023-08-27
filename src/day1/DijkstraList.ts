function hasUnvisited(seen: boolean[], dists: number[]): boolean {
	for (let i = 0; i < seen.length; i++) {
		if (seen[i] == false && dists[i] < Infinity) {
			return true;
		}
	}
	return false;
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
	let dist = Infinity;
	let lo = undefined;
	for (let i = 0; i < seen.length; i++) {
		if (seen[i] == false && dist > dists[i]) {
			lo = i;
			dist = dists[i];
		}
	}
	if (lo === undefined) {
		throw new Error("");
	}
	return lo;
}


export default function dijkstra_list(source: number, needle: number, graph: WeightedAdjacencyList): number[] {

	let prevs = new Array(graph.length).fill(-1);
	let seen = new Array(graph.length).fill(false);
	let dists = new Array(graph.length).fill(Infinity);
	dists[source] = 0;

	while(hasUnvisited(seen, dists)) {
		let cur = getLowestUnvisited(seen, dists);
		seen[cur] = true;

		const adjs = graph[cur];
		for (let a = 0; a < adjs.length; a++) {
			const adj = adjs[a];
			let distance_cur_adj = dists[cur] + adj.weight;
			if (!seen[adj.to] && distance_cur_adj < dists[adj.to]) {
				dists[adj.to] = distance_cur_adj;
				prevs[adj.to] = cur
			} 
		}

	}; 

    if (prevs[needle] == -1) {
        return [];
    }

    let path = [needle];
    let c = needle;
    do {
        c = prevs[c];
        path.push(c)
    } while (c != source);
    path.reverse();
	console.log("res", path);
    return path;
}

