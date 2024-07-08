type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

type HttpMethod =
	| "Delete"
	| "Post"
	| "Connect"
	| "Get"
	| "Head"
	| "Options"
	| "Put"
	| "Patch"
	| "Trace";

export type MocksTemplate = {
	[path: string]: {
		[method in HttpMethod]?: {
			[httpCode: number]: Record<number, any>;
		};
	};
};

type AppendMock<Mocks extends MocksTemplate> = Partial<{
	[path in keyof Mocks as path extends `${infer before}/{${string}}${infer after}`
	? `${before}/${string}${after}`
	: path]: Partial<{
		[method in keyof Mocks[path]]: Partial<{
			[httpCode in keyof Mocks[path][method]]: Partial<
				Mocks[path][method][httpCode]
			>;
		}>;
	}>;
}>;

export class MockingMachine<Mocks extends MocksTemplate = never> {
	private mocks: Partial<Mocks> = {};
	private name: string;

	constructor(name: string) {
		this.name = name;
	}

	build() {
		return this.mocks;
	}

	appendMock(mock: AppendMock<Mocks>) {
		const entries = Object.entries(mock) as Entries<typeof mock>;

		for (const entry of entries) {
			const [path, pathProps] = entry;
			const pathString = path.toString();

			if (!pathString || !pathProps) {
				continue;
			}

			if (this.mocks[pathString]) {
				const filename = getFilenameFromStack();

				console.log(
					`ERROR: Conflict in "${filename}".\nPath "${pathString}" has already been mocked for "${this.name}" service.\n\nExecuting process.`,
				);
				process.exit(1);
			}

			//@ts-expect-error - ignore -> Type 'Partial<Mocks>' is generic and can only be indexed for reading.
			this.mocks[pathString] = pathProps;

		}

		return this;
	}
}

function getFilenameFromStack() {
	const stack = new Error().stack;
	if (!stack) {
		return "unknown";
	}

	const stackLines = stack.split("\n");
	const callerLine = stackLines[3]; // Example: '    at <anonymous> (/Users/user/dev/repo/src/lambdas/person/mocks/personMocks.ts:3:20)'

	const regex = /\(([^)]+)\)/;
	const match = callerLine?.match(regex);
	const secondMatch = match?.[1]; // Example: '/Users/user/dev/repo/src/lambdas/person/mocks/personMocks.ts:3:20'

	if (!secondMatch) {
		return "unknown";
	}

	return secondMatch;
}
