import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const extractLists = (lines: string[]): [number[], number[]] => {
	const firstList: number[] = []
	const secondList: number[] = []

	lines.forEach(line => {
		const elements = line.split(" ").filter(Boolean)
		firstList.push(parseInt(elements[0]))
		secondList.push(parseInt(elements[1]))
	})

	return [ firstList, secondList ]
}

const computeDistance = (firstList: number[], secondList: number[]): number => {
	const sortedFirstList = [ ...firstList ].sort()
	const sortedSecondList = [ ...secondList ].sort()

	let distance = 0

	Array.from({ length: lines.length }).forEach((_, i) => {
		distance += Math.abs(sortedFirstList[i] - sortedSecondList[i])
	})

	return distance
}

const computeSimilarityScore = (firstList: number[], secondList: number[]): number => {
	let score = 0

	firstList.forEach(value => {
		let countInSecondList = 0
		secondList.forEach(e => {
			if (value === e) countInSecondList++
		})
		score += value * countInSecondList
	})

	return score
}

const lines = readFile("1/input.txt")
const lists = extractLists(lines)

const firstSolution = computeDistance(...lists)
logger.info(`First solution: ${firstSolution}`)

const secondSolution = computeSimilarityScore(...lists)
logger.info(`Second solution: ${secondSolution}`)
