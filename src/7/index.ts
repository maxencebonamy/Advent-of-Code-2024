import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

type Operator = (a: number, b: number) => number

const operators: Operator[] = [
	(a, b) => a + b,
	(a, b) => a * b
]

const getAllOperatorsCombinations = (total: number): Operator[][] => {
	const result: Operator[][] = []

	const generate = (current: Operator[]): void => {
		if (current.length === total) {
			result.push(current)
			return
		}

		for (const operator of operators) {
			generate([ ...current, operator ])
		}
	}

	generate([])
	return result
}

const extractData = (lines: string[]): { testValue: number, values: number[] }[] => {
	return lines.map(line => {
		const parts = line.split(":")
		if (parts.length !== 2) {
			throw new Error("Invalid line")
		}

		const testValue = parseInt(parts[0])
		const values = parts[1].trim().split(" ").map(e => parseInt(e))
		return { testValue, values }
	})
}

const canBeSolved = (testValue: number, values: number[]): boolean => {
	if (values.length < 2) {
		return values[0] === testValue
	}

	const operatorsCombinations = getAllOperatorsCombinations(values.length - 1)
	for (const operators of operatorsCombinations) {
		let result = values[0]
		for (let i = 0; i < operators.length; i++) {
			result = operators[i](result, values[i + 1])
		}
		if (result === testValue) {
			return true
		}
	}

	return false
}

const lines = readFile("7/input.txt")
const tests = extractData(lines)

const firstSolvableTests = tests.filter(({ testValue, values }) => canBeSolved(testValue, values))
logger.info(`First solution: ${sum(firstSolvableTests.map(e => e.testValue))}`)

operators.push((a, b) => parseInt(`${a}${b}`))
const secondSolvableTests = tests.filter(({ testValue, values }) => canBeSolved(testValue, values))
logger.info(`Second solution: ${sum(secondSolvableTests.map(e => e.testValue))}`)
