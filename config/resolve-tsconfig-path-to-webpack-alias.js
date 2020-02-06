const { resolve } = require('path');

function resolveTsconfigPathsToAlias() {
	const tsconfigPath = '../tsconfig.json';
	const { paths } = require(tsconfigPath).compilerOptions;

	const aliases = {};

	Object.keys(paths).forEach((item) => {
		const key = item.replace('/*', '');
		const value = resolve('./', paths[item][0].replace('/*', '').replace('*', ''));

		aliases[key] = value;
	});

	return aliases;
}

module.exports = resolveTsconfigPathsToAlias;
