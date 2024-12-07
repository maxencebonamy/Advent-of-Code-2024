import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const directions = [ [ 0, -1 ], [ 1, 0 ], [ 0, 1 ], [ -1, 0 ] ]

const getGuardPosition = (map: string[]): [number, number] => {
	for (let y = 0; y < map.length; y++) {
		const x = map[y].indexOf("^")
		if (x !== -1) return [ x, y ]
	}
	throw new Error("Guard not found")
}

const isGuardAtBorder = (map: string[]): boolean => {
	const position = getGuardPosition(map)
	return position[0] === 0 || position[0] === map[0].length - 1 || position[1] === 0 || position[1] === map.length - 1
}

const forwardGuard = (map: string[], direction: number): { newDirection: number } => {
	const position = getGuardPosition(map)
	const [ dx, dy ] = directions[direction]
	const newPosition = [ position[0] + dx, position[1] + dy ]

	if (map[newPosition[1]][newPosition[0]] === "#") {
		return { newDirection: (direction + 1) % 4 }
	}

	map[position[1]] = map[position[1]].substring(0, position[0]) + "X" + map[position[1]].substring(position[0] + 1)
	map[newPosition[1]] = map[newPosition[1]].substring(0, newPosition[0]) + "^" + map[newPosition[1]].substring(newPosition[0] + 1)

	return { newDirection: direction }
}

const countSteps = (map: string[]): number => {
	return sum(map.map(line => line.split("").filter(char => char === "X" || char === "^").length))
}

const addObstacle = (map: string[], position: [number, number]): void => {
	const [ x, y ] = position
	map[y] = map[y].substring(0, x) + "#" + map[y].substring(x + 1)
}

const removeObstacle = (map: string[], position: [number, number]): void => {
	const [ x, y ] = position
	map[y] = map[y].substring(0, x) + "." + map[y].substring(x + 1)
}

const isObstacleValid = (map: string[], position: [number, number]): boolean => {
	const [ x, y ] = position
	if (map[y][x] !== "." && map[y][x] !== "X") return false

	const maxIterations = map.length * map[0].length
	addObstacle(map, position)
	let currentDirection = 0
	let steps = 0
	while (!isGuardAtBorder(map)) {
		const { newDirection } = forwardGuard(map, currentDirection)
		currentDirection = newDirection
		steps++
		if (steps >= maxIterations) {
			removeObstacle(map, position)
			return true
		}
	}
	removeObstacle(map, position)
	return false
}

const map = readFile("6/input.txt")

const firstMap = [ ...map ]
let currentDirection = 0
while (!isGuardAtBorder(firstMap)) {
	const { newDirection } = forwardGuard(firstMap, currentDirection)
	currentDirection = newDirection
}
logger.info(`First solution: ${countSteps(firstMap)}`)

let possibleObstacles = 0
for (let y = 0; y < map.length; y++) {
	for (let x = 0; x < map[y].length; x++) {
		if (isObstacleValid([ ...map ], [ x, y ])) {
			possibleObstacles++
		}
	}
}
logger.info(`Second solution: ${possibleObstacles}`)
