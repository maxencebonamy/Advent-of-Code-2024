import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const BUTTON_A_COST = 3
const BUTTON_B_COST = 1

type Machine = {
	buttonA: { x: number, y: number }
	buttonB: { x: number, y: number }
	prize: { x: number, y: number }
}

const parseLine = (line: string): { x: number, y: number } => {
	const matches = line.match(/[0-9]+/g) || []
	if (matches.length !== 2) {
		throw new Error("Invalid line")
	}
	return {
		x: parseInt(matches[0], 10),
		y: parseInt(matches[1], 10)
	}
}

const parseMachines = (lines: string[]): Machine[] => {
	const machines: Machine[] = []
	for (let i = 0; i < lines.length; i += 4) {
		const buttonA = parseLine(lines[i])
		const buttonB = parseLine(lines[i + 1])
		const prize = parseLine(lines[i + 2])
		machines.push({ buttonA, buttonB, prize })
	}
	return machines
}

const computeCheapestCost = (machine: Machine): number => {
	let cost: number | null = null

	for (let i = 1; i <= 100; i++) {
		for (let j = 1; j <= 100; j++) {
			if ((i * machine.buttonA.x) + (j * machine.buttonB.x) === machine.prize.x
				&& (i * machine.buttonA.y) + (j * machine.buttonB.y) === machine.prize.y) {
				const newCost = (i * BUTTON_A_COST) + (j * BUTTON_B_COST)
				if (!cost || newCost < cost) {
					cost = newCost
				}
			}
		}
	}

	return cost ?? 0
}

const lines = readFile("13/input.txt")
const machines = parseMachines(lines)
const costs = machines.map(computeCheapestCost)
logger.info(`First solution: ${sum(costs)}`)
