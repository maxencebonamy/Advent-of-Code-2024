/* eslint-disable no-console */

const info = (message: string): void => {
	console.log(`\x1b[32m[INFO] ${message}\x1b[0m`)
}

const error = (message: string): void => {
	console.error(`\x1b[31m[ERROR] ${message}\x1b[0m`)
}

export const logger = {
	info,
	error
}
