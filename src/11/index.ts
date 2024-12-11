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

const line = readFile("11/input.txt")[0]
const arrangement = parseArrangement(line)

logger.info(`First solution: ${countStonesAfterBlinks(arrangement, 25)}`)
