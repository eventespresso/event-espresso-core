const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { map } = require( 'lodash' );
const chalk = require( 'chalk' );

const CSS_TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );
const STYLES_DIRECTORY = path.resolve( __dirname, '../../assets/src/components/ui/styles' );

/**
 * Builds the sizes variable css files for the given theme.
 * @param {string} themeDirectory  The theme directory
 * @param {Object} sizes The sizes configuration object.
 */
function buildVariables( themeDirectory, { sizes } ) {
	const destPath = path.resolve( STYLES_DIRECTORY, 'themes', themeDirectory, 'sizes-variables.css' );
	const mainTemplate = compile( fs.readFileSync(
		path.resolve( CSS_TEMPLATES_PATH, 'sizes-variables.css.handlebars' ),
		'utf8'
	) );
	const itemsTemplate = compile( fs.readFileSync(
		path.resolve( CSS_TEMPLATES_PATH, 'sizes-variables-item.css.handlebars' ),
		'utf8'
	) );

	// Note, this will only setup variables for sizes in the map.
	// This allows for themes to only configure certain sizes, allowing the
	// fallback to the default style for undefined variables.
	const sizeItems = map( sizes.sizeMap, ( size, sizeIndex ) => {
		// strip 'size' from the index
		sizeIndex = sizeIndex.replace( 'size', '' );
		return itemsTemplate( { sizeIndex, size } );
	} );
	const mainResult = mainTemplate( {
		sizeItems,
		...sizes,
	} );
	fs.writeFileSync( destPath, mainResult );
	process.stdout.write(
		chalk.green(
			chalk.green( '  \u2022 ' ) +
			path.relative( CSS_TEMPLATES_PATH, 'sizes-variables.css.handlebars' ) +
			chalk.green( ' \u21D2 ' ) +
			path.relative( STYLES_DIRECTORY, destPath ) +
			'\n'
		)
	);
}

/**
 * Builds the sizes css stylesheet for the given theme.
 * Note: `'default'` theme will result in generating the root size stylesheets.
 *
 * @param {string} themeDirectory
 * @param {Object} sizes Sizes configuration object
 */
function buildMain( themeDirectory, { sizes } ) {
	const destPath = path.resolve( STYLES_DIRECTORY, 'root', 'sizes.css' );
	const mainTemplate = compile( fs.readFileSync(
		path.resolve( CSS_TEMPLATES_PATH, 'sizes.css.handlebars' ),
		'utf8'
	) );
	const itemsTemplate = compile( fs.readFileSync(
		path.resolve( CSS_TEMPLATES_PATH, 'sizes-item.css.handlebars' ),
		'utf8'
	) );
	// Note: this is currently only setting up the root fallback stylesheet
	const sizeItems = sizes.defaultSizes.map( ( size ) => {
		return itemsTemplate( { size } );
	} );
	const mainResult = mainTemplate( {
		sizeItems,
		...sizes
	} );
	fs.writeFileSync( destPath, mainResult );
	process.stdout.write(
		chalk.green(
			chalk.green( '  \u2022 ' ) +
			path.relative( CSS_TEMPLATES_PATH, 'sizes.css.handlebars' ) +
			chalk.green( ' \u21D2 ' ) +
			path.relative( STYLES_DIRECTORY, destPath ) +
			'\n'
		)
	);
}

module.exports = {
	buildVariables,
	buildMain,
};
