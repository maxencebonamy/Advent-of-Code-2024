import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

type Rule = [number, number]
type Update = number[]

const extractData = (lines: string[]): { rules: Rule[], updates: Update[] } => {
	const rules: Rule[] = []
	const updates: Update[] = []

	let part = 0
	for (const line of lines) {
		if (line === "") {
			part++
			continue
		}
		if (part === 0) {
			const [ min, max ] = line.split("|").map(Number)
			rules.push([ min, max ])
		} else {
			updates.push(line.split(",").map(Number))
		}
	}

	return { rules, updates }
}

const isUpdateValid = (update: Update, rules: Rule[]): boolean => {
	for (const rule of rules) {
		const [ a, b ] = rule
		if (update.indexOf(a) === -1 || update.indexOf(b) === -1) {
			continue
		}
		if (update.indexOf(a) > update.indexOf(b)) {
			return false
		}
	}
	return true
}

const getMiddleValue = (update: Update): number => {
	return update[Math.floor(update.length / 2)]
}

const sortUpdate = (update: Update, rules: Rule[]): Update => {
	return update.sort((a, b) => {
		const rule = rules.find(rule => rule.includes(a) && rule.includes(b))
		if (!rule) {
			return 0
		}
		return rule.indexOf(a) - rule.indexOf(b)
	})
}

const lines = readFile("5/input.txt")
const { rules, updates } = extractData(lines)

const validUpdates = updates.filter(update => isUpdateValid(update, rules))
const middleValues = validUpdates.map(getMiddleValue)
logger.info(`First solution: ${sum(middleValues)}`)

const invalidUpdates = updates.filter(update => !isUpdateValid(update, rules))
const sortedUpdates = invalidUpdates.map(update => sortUpdate(update, rules))
const sortedMiddleValues = sortedUpdates.map(getMiddleValue)
logger.info(`Second solution: ${sum(sortedMiddleValues)}`)
