import { sum } from "#/utils/array"
import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

type Point = [number, number]

export const parseMap = (lines: string[]): number[][] => {
	return lines.map(line => line.split("").map(e => parseInt(e)))
}

export const getConsecutiveNeighbors = (point: Point, map: number[][]): Point[] => {
	const [ x, y ] = point
	const value = map[y][x]
	const neighbors: Point[] = []

	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			if (Math.abs(i) === Math.abs(j)) continue
			if (x + j < 0 || y + i < 0 || x + j >= map[0].length || y + i >= map.length) continue
			if (map[y + i][x + j] === value + 1) {
				neighbors.push([ x + j, y + i ])
			}
		}
	}

	return neighbors
}

export const getTotalScore = (map: number[][]): number => {
	let trails: Point[][] = []
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (map[y][x] === 0) {
				trails.push([ [ x, y ] ])
			}
		}
	}

	for (let i = 1; i <= 9; i++) {
		const newTrails: Point[][] = []
		for (const trail of trails) {
			const newPoints: Point[] = []
			for (const point of trail) {
				const neighbors = getConsecutiveNeighbors(point, map)
				for (const neighbor of neighbors) {
					if (!newPoints.some(e => e[0] === neighbor[0] && e[1] === neighbor[1])) {
						newPoints.push(neighbor)
					}
				}
			}
			newTrails.push(newPoints)
		}
		trails = newTrails
	}

	return sum(trails.map(trail => trail.length))
}

export const getTotalRating = (map: number[][]): number => {
	let trailHeads: Point[] = []
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[0].length; x++) {
			if (map[y][x] === 0) {
				trailHeads.push([ x, y ])
			}
		}
	}

	for (let i = 1; i <= 9; i++) {
		const newTrailHeads: Point[] = []
		for (const trailHead of trailHeads) {
			const neighbors = getConsecutiveNeighbors(trailHead, map)
			newTrailHeads.push(...neighbors)
		}
		trailHeads = newTrailHeads
	}
	return trailHeads.length
}

const lines = readFile("10/input.txt")
const map = parseMap(lines)

const score = getTotalScore(map)
logger.info(`First solution: ${score}`)

const rating = getTotalRating(map)
logger.info(`Second solution: ${rating}`)
