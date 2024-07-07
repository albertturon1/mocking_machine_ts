import fs from "fs";
import path from "path";

export function loadModules(directory: string) {
	const normalizedPath = path.join(__dirname, directory);

	fs.readdirSync(normalizedPath).forEach((file) => {
		if (file.endsWith(".ts")) {
			require(path.join(normalizedPath, file));
		}
	});
}
