import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const directions = [ [ 0, -1 ], [ 1, 0 ], [ 0, 1 ], [ -1, 0 ] ]

const getGuardPosition = (map: string[]): [ number, number ] => {
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === "^") return [ x, y ]
		}
	}
}

const isGuardAtBorder = (map: string[]): boolean => {
	const position = getGuardPosition(map)
	return position[0] === 0 || position[0] === map[0].length - 1 || position[1] === 0 || position[1] === map.length - 1
}

const forwardGuard = (map: string[], direction: number): { newMap: string[], newDirection: number } => {
	const position = getGuardPosition(map)

	const [ dx, dy ] = directions[direction]
	const newPosition = [ position[0] + dx, position[1] + dy ]
	if (map[newPosition[1]][newPosition[0]] === "#") {
		return { newMap: map, newDirection: (direction + 1) % 4 }
	}

	const newMap = map.map((line, y) => {
		return line.split("").map((char, x) => {
			if (x === newPosition[0] && y === newPosition[1]) return "^"
			if (x === position[0] && y === position[1]) return "X"
			return char
		}).join("")
	})
	return { newMap, newDirection: direction }
}

const countSteps = (map: string[]): number => {
	return sum(map.map(line => line.split("").filter(char => char === "X" || char === "^").length))
}

let map = readFile("6/input.txt")
let currentDirection = 0
while (!isGuardAtBorder(map)) {
	const { newMap, newDirection } = forwardGuard(map, currentDirection)
	map = newMap
	currentDirection = newDirection
}
logger.info(`First solution: ${countSteps(map)}`)
