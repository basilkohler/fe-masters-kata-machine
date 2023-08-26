import Queue from "./Queue";

export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    let seen = Array(graph.length).fill(false);
    let prevs = Array(graph.length).fill(-1);
    let queue = new Queue<number>();
    queue.enqueue(source);
    do {
        let cur = queue.deque();
        if (cur == undefined) {
            return null;
        }
        seen[cur] = true;
        if (cur == needle) {
            break;
        }

        let adjs = graph[cur];
        for (let a = 0; a < adjs.length; a++) {
            if (adjs[a] > 0) {
                if (!seen[a]) {
                    prevs[a] = cur;
                    queue.enqueue(a);
                }
            }
        }
    } while (queue.length > 0);

    if (prevs[needle] == -1) {
        return null;
    }

    let path = [needle];
    let c = needle; 
    do {
        c = prevs[c];
        path.push(c)
    } while (c != source);
    path.reverse();
    return path;
}
