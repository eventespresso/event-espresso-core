const { SOURCE_FOLDER } = require('../../paths');

const rootDir = '../../../assets';

module.exports = {
	roots: [`${rootDir}/${SOURCE_FOLDER}`],
	testMatch: [`**/?(*.)test.{ts,tsx}`],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
};
