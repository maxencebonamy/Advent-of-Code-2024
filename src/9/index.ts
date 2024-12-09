import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const computeAmphipod = (line: string): string[] => {
	const amphipod: string[] = []
	line.split("").forEach((char, index) => {
		if (index % 2 === 0) {
			for (let i = 0; i < parseInt(char); i++) {
				amphipod.push((index / 2).toString())
			}
		} else {
			for (let i = 0; i < parseInt(char); i++) {
				amphipod.push(".")
			}
		}
	})
	return amphipod
}

const isAmphipodOptimised = (amphipod: string[]): boolean => {
	const firstDotIndex = amphipod.indexOf(".")
	for (let i = firstDotIndex; i < amphipod.length; i++) {
		if (amphipod[i] !== ".") return false
	}
	return true
}

const optimiseAmphipod = (amphipod: string[]): string[] => {
	let newAmphipod = [ ...amphipod ]
	while (!isAmphipodOptimised(newAmphipod)) {
		const firstDotIndex = newAmphipod.indexOf(".")
		const lastNumberIndex = newAmphipod.length - [ ...newAmphipod ].reverse().findIndex(char => char !== ".") - 1
		newAmphipod = [
			...newAmphipod.slice(0, firstDotIndex),
			newAmphipod[lastNumberIndex],
			...newAmphipod.slice(firstDotIndex + 1, lastNumberIndex),
			".",
			...newAmphipod.slice(lastNumberIndex + 1)
		]
	}
	return newAmphipod
}

const compactAmphipod = (amphipod: string[]): string[] => {
	const newAmphipod = [ ...amphipod ]
	let patternLength = 1
	for (let i = newAmphipod.length - 1; i >= 0; i--) {
		if (newAmphipod[i] === ".") continue
		if (i > 0 && newAmphipod[i - 1] === newAmphipod[i]) {
			patternLength++
			continue
		}
		let dotGroupIndex = -1
		for (let j = 0; j <= i; j++) {
			if (newAmphipod.slice(j, j + patternLength).every(char => char === ".")) {
				dotGroupIndex = j
				break
			}
		}
		if (dotGroupIndex !== -1) {
			if (dotGroupIndex < i) {
				for (let j = 0; j < patternLength; j++) {
					newAmphipod[dotGroupIndex + j] = newAmphipod[i + j]
					newAmphipod[i + j] = "."
				}
			}
		}
		patternLength = 1
	}
	return newAmphipod
}

const computeChecksum = (amphipod: string[]): number => {
	let checksum = 0
	amphipod.forEach((char, index) => {
		if (char === ".") return
		checksum += index * parseInt(char)
	})
	return checksum
}

const line = readFile("9/input.txt")[0]
const amphipod = computeAmphipod(line)

const optimisedAmphipod = optimiseAmphipod(amphipod)
const firstChecksum = computeChecksum(optimisedAmphipod)
logger.info(`First solution: ${firstChecksum}`)

const compactedAmphipod = compactAmphipod(amphipod)
const secondChecksum = computeChecksum(compactedAmphipod)
logger.info(`Second solution: ${secondChecksum}`)
