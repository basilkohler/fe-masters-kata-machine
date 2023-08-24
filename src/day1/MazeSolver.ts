function do_solve(maze: string[], wall: string, cur: Point, end: Point, visited: Point[]): boolean {

	if (cur.x === end.x && cur.y === end.y) {
		visited.push(end);
		return true;
	}

	if (cur.y < 0 || cur.y >= maze.length || cur.x < 0 || cur.x >= maze[cur.y].length) {
		return false;
	}

	if (visited.some(vis => vis.x == cur.x && vis.y == cur.y)) {
		return false;
	}

	if (maze[cur.y][cur.x] == wall) {
		return false;
	}

	visited.push(cur);

	const next_points = [
		{ x: cur.x, y: cur.y - 1, } as Point, // make sure to go into the wrong direction first
		{ x: cur.x, y: cur.y + 1, } as Point,
		{ x: cur.x + 1, y: cur.y, } as Point,
		{ x: cur.x - 1, y: cur.y, } as Point,
	];

	for (let next_point of next_points) {
		if (do_solve(maze, wall, next_point, end, visited)) {
			return true;
		} 
	}
	visited.pop();
	return false;

}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
	let path = [] as Point[];
	do_solve(maze, wall, start, end, path);
	return path;
}

