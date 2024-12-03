import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const filterValidOperations = (memory: string): string[] => {
	return memory.match(/mul\([0-9]+,[0-9]+\)/g) || []
}

const filterValidOperationsWithConditions = (memory: string): string[] => {
	const filteredMemory = memory.match(/(mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\))/g) || []
	const output: string[] = []
	let enabled = true
	filteredMemory.forEach(e => {
		if (e === "do()") {
			enabled = true
			return
		}
		if (e === "don't()") {
			enabled = false
			return
		}
		if (enabled) output.push(e)
	})
	return output
}

const computeOperation = (operation: string): number => {
	const numbers = operation.match(/[0-9+]+/g)
	if (numbers.length !== 2) return 0

	const parsedNumbers = numbers.map(Number)
	return parsedNumbers[0] * parsedNumbers[1]
}

const memory = readFile("3/input.txt").join("")

const filteredMemory = filterValidOperations(memory)
logger.info(`First solution: ${sum(filteredMemory.map(computeOperation))}`)

const filteredMemoryWithOperations = filterValidOperationsWithConditions(memory)
logger.info(`First solution: ${sum(filteredMemoryWithOperations.map(computeOperation))}`)
