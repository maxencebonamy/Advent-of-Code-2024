import fs from "fs"
import path from "path"

export const readFile = (filename: string): string[] => {
	return fs.readFileSync(path.join(__dirname, "..", filename), "utf-8").split("\n")
}
