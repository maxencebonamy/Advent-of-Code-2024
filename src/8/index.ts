import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

type Point = [number, number]

const getAllAtennas = (lines: string[]): string[] => {
	const antennas: string[] = []
	for (const line of lines) {
		for (const char of line) {
			if (char === ".") continue
			else if (!antennas.includes(char)) antennas.push(char)
		}
	}
	return antennas
}

const computeAntennaCouples = (antennas: string[], lines: string[]): [Point, Point][] => {
	const couples: [Point, Point][] = []

	for (const antenna of antennas) {
		const antennaPositions: Point[] = []
		for (let y = 0; y < lines.length; y++) {
			for (let x = 0; x < lines[y].length; x++) {
				if (lines[y][x] === antenna) antennaPositions.push([ x, y ])
			}
		}

		for (let i = 0; i < antennaPositions.length; i++) {
			for (let j = i + 1; j < antennaPositions.length; j++) {
				couples.push([ antennaPositions[i], antennaPositions[j] ])
			}
		}
	}

	return couples
}

const computeAntinodes = (couple: [Point, Point], lines: string[]): Point[] => {
	const [ [ x1, y1 ], [ x2, y2 ] ] = couple
	const firstAntinode = [ x1 + (2 * (x2 - x1)), y1 + (2 * (y2 - y1)) ] as Point
	const secondAntinode = [ x2 + (2 * (x1 - x2)), y2 + (2 * (y1 - y2)) ] as Point
	return [ firstAntinode, secondAntinode ].filter(([ x, y ]) => x >= 0 && y >= 0 && x < lines[0].length && y < lines.length)
}

const lines = readFile("8/input.txt")
const antennas = getAllAtennas(lines)
const couples = computeAntennaCouples(antennas, lines)

const antinodes: Point[] = []
for (const couple of couples) {
	const newAntinodes = computeAntinodes(couple, lines)
	for (const antinode of newAntinodes) {
		if (!antinodes.some(([ x, y ]) => x === antinode[0] && y === antinode[1])) antinodes.push(antinode)
	}
}
logger.info(`First solution: ${antinodes.length}`)
