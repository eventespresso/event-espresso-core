const path = require( 'path' );

const assetsManifestOutputPath = path.resolve( 'assets', 'dist/build-manifest.json' );
const pathToDistFolder = path.resolve( 'assets', 'dist' );

module.exports = {
	assetsManifestOutputPath,
	pathToDistFolder,
};
