import { sum } from "#/utils/array"
import { logger } from "#/utils/logger"
import { readFile } from "#/utils/file"

const reverseStrings = (strings: string[]): string[] => {
	return strings.map(string => string.split("").reverse().join(""))
}

const extractLists = (lines: string[]): string[][] => {
	const lists: string[][] = []

	lists.push(lines)
	lists.push(reverseStrings(lines))

	const columns = lines.map((line, i) => line.split("").map((_, j) => lines[j][i]).join(""))
	lists.push(columns)
	lists.push(reverseStrings(columns))

	const diagonals: string[] = []
	for (let i = 0; i < lines.length; i++) {
		let diagonal = ""
		for (let j = 0; j <= i; j++) {
			diagonal += lines[j][i - j]
		}
		diagonals.push(diagonal)
	}
	for (let i = 1; i < lines.length; i++) {
		let diagonal = ""
		for (let j = i; j < lines.length; j++) {
			diagonal += lines[j][lines.length - 1 + i - j]
		}
		diagonals.push(diagonal)
	}
	for (let i = 0; i < lines.length; i++) {
		let diagonal = ""
		for (let j = 0; j <= i; j++) {
			diagonal += lines[lines.length - 1 - j][i - j]
		}
		diagonals.push(diagonal)
	}
	for (let i = 1; i < lines.length; i++) {
		let diagonal = ""
		for (let j = i; j < lines.length; j++) {
			diagonal += lines[lines.length - 1 - j][lines.length - 1 + i - j]
		}
		diagonals.push(diagonal)
	}
	lists.push(diagonals)
	lists.push(reverseStrings(diagonals))

	return lists
}

const countWord = (list: string[], regex: RegExp): number => {
	let matches = 0

	list.forEach(line => {
		const match = line.match(regex)
		if (match) {
			matches += match.length
		}
	})

	return matches
}

const lines = readFile("4/input.txt")
const lists = extractLists(lines)

logger.info(`First solution: ${sum(lists.map(list => countWord(list, /XMAS/g)))}`)
