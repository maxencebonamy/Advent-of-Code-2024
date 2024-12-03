import { readFile } from "#/utils/file"
import { logger } from "#/utils/logger"

const parseReport = (line: string): number[] => {
	return line.split(" ").map(Number)
}

const isReportSafe = (report: number[]): boolean => {
	if (report.length <= 1) return true

	const direction = report[0] < report[1] ? "positive" : "negative"
	let lastIndex = 0
	for (let index = 1; index < report.length; index++) {
		if (direction === "positive" && report[index] - report[lastIndex] > 3) return false
		if (direction === "positive" && report[index] - report[lastIndex] < 1) return false
		if (direction === "negative" && report[lastIndex] - report[index] > 3) return false
		if (direction === "negative" && report[lastIndex] - report[index] < 1) return false
		lastIndex = index
	}

	return true
}

const isReportAlmostSafe = (report: number[]): boolean => {
	if (isReportSafe(report)) return true

	for (let index = 0; index < report.length; index++) {
		const reportWithoutElement = report.filter((_, i) => index !== i)
		if (isReportSafe(reportWithoutElement)) return true
	}

	return false
}

const lines = readFile("2/input.txt")
const reports = lines.map(parseReport)

const safeReports = reports.filter(isReportSafe)
logger.info(`First solution: ${safeReports.length}`)

const almostSafeReports = reports.filter(isReportAlmostSafe)
logger.info(`Second solution: ${almostSafeReports.length}`)
