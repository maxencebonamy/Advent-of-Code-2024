/* eslint-disable no-console */

const info = (message: { toString: () => string }): void => {
	console.log(`\x1b[32m[INFO] ${message.toString()}\x1b[0m`)
}

const error = (message: { toString: () => string }): void => {
	console.error(`\x1b[31m[ERROR] ${message.toString()}\x1b[0m`)
}

const debug = (title: string, message: { toString: () => string }): void => {
	console.log(`\x1b[34m[DEBUG] ${title}: ${message.toString()}\x1b[0m`)
}

export const logger = {
	info,
	error,
	debug
}
