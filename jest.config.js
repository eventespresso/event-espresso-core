module.exports = {
	roots: [`<rootDir>/assets/prototype`],
	testMatch: [`**/?(*.)test.{ts,tsx}`],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
	},
};
