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
 */
function writeCssDemoFile() {
	const demoCss = fs.readFileSync( path.resolve( DEMO_TEMPLATES_PATH, 'demo.css' ), 'utf8' );
	const destPath = path.resolve( STYLES_DIRECTORY, 'themes', 'default', 'demo', 'demo' );
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
 * Write the main file template
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

function getConfig( themeDirectory ) {
	const destPath = path.resolve( STYLES_DIRECTORY, 'themes', themeDirectory );
	return require( `${ destPath }/config` );
}

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
	)
}

function createDemos() {
	const destPath = path.resolve( STYLES_DIRECTORY, 'themes', 'default', 'demo' );
	process.stdout.write( `Writing css demo files: ${ path.basename( destPath ) }\n` );
	mkdirp.sync( path.dirname( destPath ) );
	writeCssDemoFile();
	writeCssDemoMainFile();
}

/**
 * Invoked for building the files.
 */
function buildFiles() {
	writeColorsCss( 'default' );
	writeColorsCss( 'default', true );
	writeEntityStatusCss( 'default' );
	writeButtonCss( 'default' );
	createDemos();
	process.stdout.write( `${ DONE }\n` );
}

process.stdout.write( chalk.inverse( '>> Building global CSS stylesheets (and demo) \n' ) );
buildFiles();
process.stdout.write( '\n' );