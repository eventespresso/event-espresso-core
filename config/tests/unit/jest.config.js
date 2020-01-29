const { SOURCE_FOLDER } = require('../../paths');

const rootDir = '../../../assets';

module.exports = {
	roots: [`${rootDir}/${SOURCE_FOLDER}`],
	testMatch: [`**/?(*.)test.{ts,tsx}`],
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
	},
	coveragePathIgnorePatterns: [/data\/mutations/],
};
