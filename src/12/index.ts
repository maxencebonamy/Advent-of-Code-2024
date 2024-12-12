import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

type Point = [number, number]

const getPlantType = (lines: string[], point: Point): string => {
	const [ x, y ] = point
	return lines[y][x]
}

const getNeighbors = (point: Point, lines: string[]): Point[] => {
	const plantType = getPlantType(lines, point)
	const neighbors: Point[] = []
	const [ x, y ] = point

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (Math.abs(i) === Math.abs(j)) continue
			if (x + i < 0 || x + i >= lines.length) continue
			if (y + j < 0 || y + j >= lines[x + i].length) continue
			if (getPlantType(lines, [ x + i, y + j ]) !== plantType) continue
			neighbors.push([ x + i, y + j ])
		}
	}

	return neighbors
}

const computeRegions = (lines: string[]): Point[][] => {
	const regions: Point[][] = []
	const visited: boolean[][] = lines.map(line => line.split("").map(() => false))

	const dfs = (point: Point): void => {
		const stack: Point[] = [ point ]
		const region: Point[] = []

		while (stack.length) {
			const current = stack.pop()
			const [ x, y ] = current

			if (visited[x][y]) continue
			visited[x][y] = true
			region.push(current)

			for (const neighbor of getNeighbors(current, lines)) {
				if (visited[neighbor[0]][neighbor[1]]) continue
				stack.push(neighbor)
			}
		}

		regions.push(region)
	}

	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[i].length; j++) {
			if (visited[i][j]) continue
			dfs([ i, j ])
		}
	}

	return regions
}

const computeArea = (region: Point[]): number => {
	return region.length
}

const computePerimeter = (region: Point[], lines: string[]): number => {
	let perimeter = 0

	for (const point of region) {
		const neighbors = getNeighbors(point, lines)
		perimeter += 4 - neighbors.length
	}

	return perimeter
}

const computePrice = (region: Point[], lines: string[]): number => {
	const area = computeArea(region)
	const perimeter = computePerimeter(region, lines)
	return area * perimeter
}

const lines = readFile("12/input.txt")
const regions = computeRegions(lines)
const totalPrice = regions.reduce((acc, region) => acc + computePrice(region, lines), 0)
logger.info(`First solution: ${totalPrice}`)
