const fs = require( 'fs' );
const path = require( 'path' );
const { overEvery } = require( 'lodash' );

const STYLES_DIRECTORY = path.resolve( __dirname, '../../assets/src/components/ui/styles' );
let directory = STYLES_DIRECTORY;

/**
 * Returns true if the given base file name for a file is a directory.
 *
 * @param {string} file
 *
 * @return {boolean} Whether file is a directory.
 */
function isDirectory( file ) {
	return fs.lstatSync( path.resolve( STYLES_DIRECTORY, directory, file ) ).isDirectory();
}

/**
 * Returns true if the given base file name for a file is not a directory.
 * @param {string} file
 * @return {boolean} Whether a file is not a directory
 */
function isNotDirectory( file ) {
	return ! isDirectory( file );
}

/**
 * Returns true if the given base file name is a variable css file.
 *
 * @param {string} file
 * @return {boolean} True if file is a variable css file.
 */
function isVariableCss( file ) {
	return file.includes('variable');
}

/**
 * Returns true if the given base file name is not a variable css file.
 * @param {string} file
 * @return {boolean} True if file is not a variable css file.
 */
function isNotVariableCss( file ) {
	return ! isVariableCss( file );
}

/**
 * Returns true if the given base file name is a css file.
 *
 * @param {string} file
 * @return {boolean} True if base file name is a css file.
 */
function isCssFile( file ) {
	return /.\.css$/.test( file );
}

/**
 * Filter callback function to pass into an `Array.filter` function for the files
 * being filtered.
 *
 * @param {boolean} variablesOnly  Used to indicate whether to filter out variable css files
 * or not
 * @param {string} fileDir If provided is appended to the default path for isDirectory checks.
 * @return {function}  A callback function for passing into Array.filter.
 */
function filterItems( variablesOnly = false, fileDir ) {
	directory = fileDir !== undefined ? fileDir : STYLES_DIRECTORY;
	return variablesOnly ?
		overEvery( [ isNotDirectory, isCssFile, isVariableCss ] ) :
		overEvery( [ isNotDirectory, isCssFile, isNotVariableCss ] );
}

/**
 * Returns the relative path for a given file and directory.
 *
 * @param {string} directory
 * @param {string} file
 * @return {string}
 */
function getCssRelativePath( directory, file ) {
	return directory === 'root' ?
		path.join( '../../../root', file ) :
		path.join( '../', file );
}

/**
 * A function for reading and returning a list of css files for relative path
 * inclusion (for the given arguments).
 *
 * @param {string} directory  The directory (relative to the componets/ui/styles
 * path for which to retrieve the css files from.
 *
 * @param {boolean} variablesOnly Whether to only return variable css files or
 * not.
 * @param {boolean} relative  Whether to return the path relative to the demo
 * directory.
 * @return {string[]}  An array of relative css file paths for all the css files
 * found in the given directory.
 */
function getCssFiles( directory, variablesOnly = false, relative = true ) {
	const filesToRead = path.join( STYLES_DIRECTORY, directory );
	return fs
		.readdirSync( filesToRead )
		.filter( filterItems( variablesOnly, directory ) )
		.map( ( file ) =>  relative ?
			getCssRelativePath( directory, file ) :
			file
		)
}

module.exports = getCssFiles;