const { compile } = require( 'handlebars' );
const fs = require( 'fs' );
const path = require( 'path' );
const chalk = require( 'chalk' );

/**
 * converts backslashes to slashes
 *
 * @param {string} path
 * @return {string} path with backslashes converted to slashes
 */
function fixSlashes( path ) {
	return path.replace( /\\/g, '/' );
}

/**
 * loads and returns file contents
 *
 * @param {Array} pathParts
 * @return {string} rendered template
 */
function readFile( pathParts ) {
	const filePath = path.resolve.apply( null, pathParts );
	return fs.readFileSync( filePath, 'utf8' );
}

/**
 * returns compiler for Handlebars templates
 *
 * @param {Array} templatePath
 * @return {Function} HandlebarsTemplateDelegate
 */
function getTemplateCompiler( templatePath ) {
	return compile( readFile( templatePath ) );
}

/**
 * loads templates and parses content for variables
 *
 * @param {Array} templatePath
 * @param {Object} templateVars
 * @return {string} rendered template
 */
function parseCssTemplate( templatePath, templateVars ) {
	const templateCompiler = getTemplateCompiler( templatePath );
	return templateCompiler( templateVars );
}

/**
 * Writes the content to file and prints results to console
 *
 * @param {Array|string} pathParts
 * @param {string} fileData
 * @param {string} template
 * @param {string} output
 */
function writeFile( pathParts, fileData, template = '', output = '' ) {
	const filePath = typeof pathParts === 'object' ?
		path.resolve.apply( null, pathParts ) :
		pathParts;
	fs.writeFileSync( filePath, fileData );
	if ( template !== '' && output !== '' ) {
		process.stdout.write(
			chalk.green( '  \u2022 ' + template + ' \u21D2 ' + output + '\n' )
		);
	}
}

module.exports = {
	fixSlashes,
	readFile,
	getTemplateCompiler,
	parseCssTemplate,
	writeFile,
};
