module.exports = {
	roots: [`<rootDir>/assets/src`],
	testMatch: [`**/?(*.)test.{ts,tsx}`],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
	},
};
