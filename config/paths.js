const path = require('path');

const ASSETS = 'assets';
const SOURCE_FOLDER = 'prototype';

const assetsManifestOutputPath = path.resolve(ASSETS, 'dist/build-manifest.json');
const assetsPath = `./${ASSETS}/ZZZ/`;
const pathToDistFolder = path.resolve(ASSETS, 'dist');

module.exports = {
	assetsManifestOutputPath,
	assetsPath,
	pathToDistFolder,
	SOURCE_FOLDER,
};
