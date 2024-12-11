import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const parseArrangement = (line: string): number[] => {
	return line.split(" ").map(e => parseInt(e))
}

const blink = (arrangement: number[]): number[] => {
	const newArrangement: number[] = []

	for (const stone of arrangement) {
		if (stone === 0) {
			newArrangement.push(1)
			continue
		}
		if (`${stone}`.length % 2 === 0) {
			const firstHalf = `${stone}`.slice(0, `${stone}`.length / 2)
			const secondHalf = `${stone}`.slice(`${stone}`.length / 2)
			newArrangement.push(parseInt(firstHalf))
			newArrangement.push(parseInt(secondHalf))
			continue
		}
		newArrangement.push(stone * 2024)
	}

	return newArrangement
}

const countStonesAfterBlinks = (arrangement: number[], blinks: number): number => {
	let newArrangement: number[] = [ ...arrangement ]
	for (let i = 0; i < blinks; i++) {
		newArrangement = blink(newArrangement)
	}
	return newArrangement.length
}

const addStoneInOptimisedArrangement = (arrangement: Record<number, number>, stone: number, repeat = 1): void => {
	if (arrangement[stone]) {
		arrangement[stone] += repeat
	} else {
		arrangement[stone] = repeat
	}
}

const parseOptimisedArrangement = (line: string): Record<number, number> => {
	const arrangement: Record<number, number> = {}
	const stones = line.split(" ")
	for (const stone of stones) {
		addStoneInOptimisedArrangement(arrangement, parseInt(stone))
	}
	return arrangement
}

const optimisedBlink = (arrangement: Record<number, number>): Record<number, number> => {
	const newArrangement: Record<number, number> = {}

	for (const stone in arrangement) {
		if (parseInt(stone) === 0) {
			newArrangement[1] = arrangement[0]
			continue
		}
		if (stone.length % 2 === 0) {
			const firstHalf = stone.slice(0, stone.length / 2)
			const secondHalf = stone.slice(stone.length / 2)
			addStoneInOptimisedArrangement(newArrangement, parseInt(firstHalf), arrangement[parseInt(stone)])
			addStoneInOptimisedArrangement(newArrangement, parseInt(secondHalf), arrangement[parseInt(stone)])
			continue
		}
		addStoneInOptimisedArrangement(newArrangement, parseInt(stone) * 2024, arrangement[stone])
	}

	return newArrangement
}

const countStonesAfterOptimisedBlinks = (arrangement: Record<number, number>, blinks: number): number => {
	let newArrangement: Record<number, number> = { ...arrangement }
	for (let i = 0; i < blinks; i++) {
		newArrangement = optimisedBlink(newArrangement)
	}
	return sum(Object.values(newArrangement))
}

const line = readFile("11/input.txt")[0]

const arrangement = parseArrangement(line)
logger.info(`First solution: ${countStonesAfterBlinks(arrangement, 25)}`)

const optimisedArrangement = parseOptimisedArrangement(line)
logger.info(`Second solution: ${countStonesAfterOptimisedBlinks(optimisedArrangement, 75)}`)
