const { compile } = require( 'handlebars' );
const fs = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const mkdirp = require( 'mkdirp' );
const { startCase } = require( 'lodash' );

// helper for getting Css files
const getCssFiles = require( './get-css-files' );
const buildSectionTemplates = require( './build-section-templates' );
const buildColorCssItems = require( './build-color-css-items' );
const buildStatusItems = require( './build-status-items' );
const buildSizesItems = require( './build-sizes-items' );
const getIndexPaths = require( './get-index-paths' );

// constants;
const DONE = chalk.reset.inverse.bold.green( 'DONE' );
const DEMO_TEMPLATES_PATH = path.resolve( __dirname, 'demo-templates' );
const CSS_TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );
const STYLES_DIRECTORY = path.resolve( __dirname, '../../assets/src/components/ui/styles' );
const MAIN_TEMPLATE = fs.readFileSync( path.resolve( DEMO_TEMPLATES_PATH, 'main_template.html' ), 'utf8' );

// @todo eventually the themes will be looped through, but for now we're just
// setting up the main default theme.

/**
 * Write the demo css file.
 *
 * @param {string} themeDirectory
 */
function writeCssDemoFile( themeDirectory ) {
	const demoCss = fs.readFileSync( path.resolve( DEMO_TEMPLATES_PATH, 'demo.css' ), 'utf8' );
	const destPath = path.resolve( STYLES_DIRECTORY, 'themes', themeDirectory, 'demo', 'demo' );
	process.stdout.write( `${ path.basename( destPath ) }\n` );
	fs.writeFileSync( destPath + '.css', demoCss );
	process.stdout.write(
		chalk.green(
			chalk.green( '  \u2022 ' ) +
			path.relative( DEMO_TEMPLATES_PATH, 'demo.css') +
			chalk.green( ' \u21D2 ' ) +
			path.relative( STYLES_DIRECTORY, destPath ) +
			'\n'
		)
	)
}

/**
 * Write the main demo file template (index.html)
 *
 * @param {string} themeDirectory
 */
function writeCssDemoMainFile( themeDirectory ) {
	themeDirectory = themeDirectory === undefined ? 'default' : themeDirectory;
	const config = getConfig( themeDirectory );
	const mainTemplateVars = {
		themeName: 'Default',
		variableStylesheets: getCssFiles( 'themes/default', true ),
		baseStylesheets: getCssFiles( 'root' ),
		overrideStylesheets: getCssFiles( 'themes/default' ),
		demoSections: buildSectionTemplates( config ),
	};
	const mainTemplate = compile( MAIN_TEMPLATE );
	const demoHtml = mainTemplate( mainTemplateVars );
	const destPath = path.resolve( STYLES_DIRECTORY, 'themes', 'default', 'demo', 'index' );
	process.stdout.write( `${ path.basename( destPath ) }\n` );
	fs.writeFileSync( destPath + '.html', demoHtml );
	process.stdout.write(
		chalk.green(
			chalk.green( '  \u2022 ' ) +
			path.relative( DEMO_TEMPLATES_PATH, 'main_template.html') +
			chalk.green( ' \u21D2 ' ) +
			path.relative( STYLES_DIRECTORY, destPath ) +
			'\n'
		)
	)
}

/**
 * Get the configuration object for the given theme directory
 *
 * @param {string} themeDirectory
 * @return {Object}  The configuration object for that theme.
 */
function getConfig( themeDirectory ) {
	const destPath = path.resolve( STYLES_DIRECTORY, 'themes', themeDirectory );
	return require( `${ destPath }/config` );
}

/**
 * Writes the colors css stylesheet file
 *
 * Note: Currently this only builds and writes the colors.css (or
 * colors-variables) stylesheets for the default theme.
 * The main stylesheet for the default theme is the `root` colors.css stylesheet.
 *
 * @param {string} themeDirectory
 * @param variables  Whether to build the variables stylesheet or not.
 */
function writeColorsCss( themeDirectory, variables = false ) {
	if ( themeDirectory !== 'default' && ! variables ) {
		return;
	}
	const destPath = variables ?
		path.resolve( STYLES_DIRECTORY, 'themes', themeDirectory, 'color-variables.css' ) :
		path.resolve( STYLES_DIRECTORY, 'root', 'colors.css' );
	const config = getConfig( themeDirectory );
	const colorItems = variables ?
		buildColorCssItems( config, 'variable-item' ) :
		buildColorCssItems( config, 'item' );
	const templatePath = variables ?
		path.resolve( CSS_TEMPLATES_PATH, 'color-variables.css.handlebars' ) :
		path.resolve( CSS_TEMPLATES_PATH, 'colors.css.handlebars' );
	const template = compile( fs.readFileSync( templatePath, 'utf8' ) );
	const parsedTemplate = template( {
		themeName: startCase( themeDirectory ),
		colorItems,
	} );
	process.stdout.write( `${ path.basename( destPath ) }\n` );
	fs.writeFileSync( destPath, parsedTemplate );
	process.stdout.write(
		chalk.green(
			chalk.green( '  \u2022 ' ) +
			path.relative( CSS_TEMPLATES_PATH, 'colors.css.handlebars') +
			chalk.green( ' \u21D2 ' ) +
			path.relative( STYLES_DIRECTORY, destPath ) +
			'\n'
		)
	);
}

/**
 * Writes the entity status stylesheeet.
 *
 * Note: Currently this only builds the root stylesheet for `entity-status.css`
 *
 * @param themeDirectory
 */
function writeEntityStatusCss( themeDirectory ) {
	if ( themeDirectory !== 'default' ) {
		return;
	}
	const destPath = path.resolve( STYLES_DIRECTORY, 'root', 'entity-status.css' );
	const config = getConfig( themeDirectory );
	const entityStatusItems = buildStatusItems( config );
	const templatePath = path.resolve( CSS_TEMPLATES_PATH, 'entity-status.css.handlebars' );
	const template = compile( fs.readFileSync( templatePath, 'utf8' ) );
	const parsedTemplate = template( {
		themeName: startCase( themeDirectory ),
		status_groups: entityStatusItems,
	} );
	process.stdout.write( `${ path.basename( destPath ) }\n` );
	fs.writeFileSync( destPath, parsedTemplate );
	process.stdout.write(
		chalk.green(
			chalk.green( '  \u2022 ' ) +
			path.relative( CSS_TEMPLATES_PATH, 'entity-status.css.handlebars' ) +
			chalk.green( ' \u21D2 ' ) +
			path.relative( STYLES_DIRECTORY, destPath ) +
			'\n'
		)
	);
}

/**
 * Writes the button css for a given theme.
 *
 * Note: Currently this only builds the root `buttons.css` stylesheet.
 *
 * @param {string} themeDirectory
 */
function writeButtonCss( themeDirectory ) {
	if ( themeDirectory !== 'default' ) {
		return;
	}
	const cssFile = fs.readFileSync( path.resolve( CSS_TEMPLATES_PATH, 'buttons.css' ), 'utf8' );
	const destPath = path.resolve( STYLES_DIRECTORY, 'root', 'buttons.css' );
	process.stdout.write( `${ path.basename( destPath ) }\n` );
	fs.writeFileSync( destPath, cssFile );
	process.stdout.write(
		chalk.green(
			chalk.green( '  \u2022 ' ) +
			path.relative( CSS_TEMPLATES_PATH, 'buttons.css') +
			chalk.green( ' \u21D2 ' ) +
			path.relative( STYLES_DIRECTORY, destPath ) +
			'\n'
		)
	);
}

/**
 * Writes the shadow css for a given theme.
 *
 * Note: currently this only builds the root shadows.css stylesheet.
 *
 * @param {string} themeDirectory
 */
function writeShadowCss( themeDirectory ) {
	if ( themeDirectory !== 'default' ) {
		return;
	}
	const mainTemplate = compile(
		fs.readFileSync( path.resolve( CSS_TEMPLATES_PATH, 'shadows-main.css.handlebars' ), 'utf8' )
	);
	const itemTemplate = compile(
		fs.readFileSync( path.resolve( CSS_TEMPLATES_PATH, 'shadows-item.css.handlebars' ), 'utf8' )
	);
	const { colors }= getConfig( themeDirectory );
	const destPath = path.resolve( STYLES_DIRECTORY, 'root', 'shadows.css' );
	process.stdout.write( `${ path.basename( destPath ) }\n` );
	const shadowItems = colors.map( ( { color, rgba1, rgba2, rgba3 } ) => {
		return itemTemplate( {
			colorLabel: startCase( color ),
			color,
			rgba1,
			rgba2,
			rgba3,
		} );
	} );
	const cssFile = mainTemplate( { shadowItems } );
	fs.writeFileSync( destPath, cssFile );
	process.stdout.write(
		chalk.green(
			chalk.green( '  \u2022 ' ) +
			path.relative( CSS_TEMPLATES_PATH, 'shadows-main.css.handlebars') +
			chalk.green( ' \u21D2 ' ) +
			path.relative( STYLES_DIRECTORY, destPath ) +
			'\n'
		)
	);
}

/**
 * Writes the sizes and sizes-variables stylesheets for the given theme.
 *
 * Note: Currently this only builds the root sizes.css stylesheet and 'default'
 * sizes-variables.css stylesheet.
 *
 * @param {string} themeDirectory
 * @param {boolean} variables  If true then the variables stylesheet is built,
 * otherwise the main stylesheet is built.
 */
function writeSizesCss( themeDirectory, variables = false ) {
	if ( themeDirectory !== 'default' && ! variables ) {
		return;
	}
	const config = getConfig( themeDirectory );
	if ( variables ) {
		buildSizesItems.buildVariables( themeDirectory, config );
	} else {
		buildSizesItems.buildMain( themeDirectory, config );
	}
}

/**
 * Create the demo files for the given theme.
 */
function createDemos( themeDirectory ) {
	const destPath = path.resolve( STYLES_DIRECTORY, 'themes', themeDirectory, 'demo' );
	process.stdout.write( `Writing css demo files: ${ path.basename( destPath ) }\n` );
	mkdirp.sync( path.dirname( destPath ) );
	writeCssDemoFile( themeDirectory );
	writeCssDemoMainFile( themeDirectory );
}

/**
 * Writes the index.js file as the entrypoint for the webpack build process.
 *
 * @param {string} themeDirectory
 */
function createIndexFile( themeDirectory ) {
	const destPath = path.resolve(
		STYLES_DIRECTORY,
		'themes',
		'default',
		'index.js'
	);
	process.stdout.write( `Creating index.js for styles: \n` );
	const indexPaths = getIndexPaths( themeDirectory );
	fs.writeFileSync(
		destPath,
		indexPaths.map(
			( file ) => `import '${ file }';`
		).join( '\n' )
	);
}

/**
 * Invoked for building the files.
 */
function buildFiles() {
	writeColorsCss( 'default' );
	writeColorsCss( 'default', true );
	writeEntityStatusCss( 'default' );
	writeButtonCss( 'default' );
	writeShadowCss( 'default' );
	writeSizesCss( 'default' );
	writeSizesCss( 'default', true );
	createDemos( 'default' );
	createIndexFile( 'default' );
	process.stdout.write( `${ DONE }\n` );
}

process.stdout.write( chalk.inverse( '>> Building global CSS stylesheets (and demo) \n' ) );
buildFiles();
process.stdout.write( '\n' );