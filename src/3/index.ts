import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const filterValidOperations = (memory: string): string[] => {
	return memory.match(/mul\([0-9]+,[0-9]+\)/g) || []
}

const computeOperation = (operation: string): number => {
	const numbers = operation.match(/[0-9+]+/g)
	if (numbers.length !== 2) return 0

	const parsedNumbers = numbers.map(Number)
	return parsedNumbers[0] * parsedNumbers[1]
}

const memory = readFile("3/input.txt").join("")

const filteredMemory = filterValidOperations(memory)
const result = sum(filteredMemory.map(computeOperation))
logger.info(`First solution: ${result}`)
