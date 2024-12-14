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

const computeCost = (machine: Machine): number => {
	const den = (machine.buttonA.x * machine.buttonB.y) - (machine.buttonA.y * machine.buttonB.x)
	if (den === 0) {
		return 0
	}
	const pressesA = ((machine.prize.x * machine.buttonB.y) - (machine.prize.y * machine.buttonB.x)) / den
	const pressesB = ((machine.buttonA.x * machine.prize.y) - (machine.buttonA.y * machine.prize.x)) / den
	if (pressesA < 0 || pressesB < 0 || pressesA % 1 !== 0 || pressesB % 1 !== 0) {
		return 0
	}
	return (pressesA * BUTTON_A_COST) + (pressesB * BUTTON_B_COST)
}

const fixMachine = (machine: Machine, factor: number): Machine => {
	return { ...machine, prize: { x: machine.prize.x + factor, y: machine.prize.y + factor } }
}

const lines = readFile("13/input.txt")
const machines = parseMachines(lines)
const costs = machines.map(computeCost)
logger.info(`First solution: ${sum(costs)}`)

const fixedMachines = machines.map(machine => fixMachine(machine, 10000000000000))
const costsOptimized = fixedMachines.map(computeCost)
logger.info(`Second solution: ${sum(costsOptimized)}`)
