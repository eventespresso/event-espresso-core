const path = require('path');

const ASSETS = 'assets';
const SOURCE_FOLDER = 'prototype';

const assetsManifestOutputPath = path.resolve(ASSETS, 'dist/build-manifest.json');
const pathToDistFolder = path.resolve(ASSETS, 'dist') + '/';
const pathToEDTRv1 = path.resolve(ASSETS, 'ZZZ') + '/';
const pathToPrototype = path.resolve(ASSETS, 'prototype') + '/';

module.exports = {
	assetsManifestOutputPath,
	pathToDistFolder,
	pathToEDTRv1,
	pathToPrototype,
	SOURCE_FOLDER,
};
