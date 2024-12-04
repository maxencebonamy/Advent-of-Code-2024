import { sum } from "#/utils/array"
import { logger } from "#/utils/logger"
import { readFile } from "#/utils/file"

const countPatternInLines = (lines: string[], pattern: string[]): number => {
	const patternWidth = pattern[0].length
	const patternHeight = pattern.length
	const linesWidth = lines[0].length
	const linesHeight = lines.length

	let matches = 0

	logger.debug("Pattern", pattern)

	for (let i = 0; i < linesHeight - patternHeight + 1; i++) {
		for (let j = 0; j < linesWidth - patternWidth + 1; j++) {
			let match = true
			for (let k = 0; k < patternHeight; k++) {
				for (let l = 0; l < patternWidth; l++) {
					if (pattern[k][l] !== "*" && pattern[k][l] !== lines[i + k][j + l]) {
						match = false
						break
					}
				}
				if (!match) break
			}
			if (match) matches++
		}
	}

	logger.debug("Matches", matches)

	return matches
}

const lines = readFile("4/input.txt")

const first_patterns = [
	[ "XMAS" ],
	[ "SAMX" ],
	[ "X", "M", "A", "S" ],
	[ "S", "A", "M", "X" ],
	[ "X***", "*M**", "**A*", "***S" ],
	[ "***S", "**A*", "*M**", "X***" ],
	[ "S***", "*A**", "**M*", "***X" ],
	[ "***X", "**M*", "*A**", "S***" ]
]
const first_matches = sum(first_patterns.map(pattern => countPatternInLines(lines, pattern)))
logger.info(`First solution: ${first_matches}`)

const second_patterns = [
	[ "M*M", "*A*", "S*S" ],
	[ "S*M", "*A*", "S*M" ],
	[ "S*S", "*A*", "M*M" ],
	[ "M*S", "*A*", "M*S" ]
]
const second_matches = sum(second_patterns.map(pattern => countPatternInLines(lines, pattern)))
logger.info(`Second solution: ${second_matches}`)
