const path = require( 'path' );
const getCssFiles = require( './get-css-files' );
const chalk = require( 'chalk' );

const STYLES_DIRECTORY = path.resolve( __dirname, '../../assets/src/components/ui/styles' );
const pathRegex = new RegExp( '\\' + path.sep, 'g' );

/**
 * Get the relative path for the given file, theme directory and whether we want
 * to the root or not.
 *
 * This generates a relative path for the file from the context of the given
 * theme directory.  So for example, if the file will end up in the `styles/root`
 * folder then the relative path will be `../../root/{file}`.  If the file will
 * end up in the themeDirectory then the relative path would be `./{file}`.
 *
 * @param {string} file  The name of the file.
 * @param {string} themeDirectory The theme directory name.
 * @param {boolean} toRoot  Whether the file will end up in the `styles/root`
 * folder.
 * @return {string}  The generated relative path for the file.
 */
function getRelativePath( file, themeDirectory, toRoot = false ) {
	const from = path.resolve( STYLES_DIRECTORY, 'themes', themeDirectory );
	const to = toRoot ?
		path.resolve( STYLES_DIRECTORY, 'root', file ) :
		from;
	const relativePath = toRoot ? path.relative( from, to ) : `./${ file }`;
	return relativePath.replace( pathRegex, '/' );
}

/**
 * Returns an array of paths for adding to the index.js file.
 *
 * @param {string} themeDirectory  The theme directory the index.js is being
 * generated for.
 * @return {Array<string>}  An array of paths for writing to the index.js file.
 */
function getIndexPaths( themeDirectory ) {
	return [].concat(
		getCssFiles( 'themes/' + themeDirectory, true, false )
			.map( ( file ) => {
				const relativePath = getRelativePath( file, themeDirectory );
				process.stdout.write(
					chalk.green(
						chalk.green( ' \u21D2 ' ) +
						relativePath + '\n'
					)
				);
				return relativePath;
			} ),
		getCssFiles( 'root', false, false ).map(
			( file ) => {
				const relativePath = getRelativePath( file, themeDirectory, true );
				process.stdout.write(
					chalk.green(
						chalk.green( ' \u21D2 ' ) +
						relativePath + '\n'
					)
				);
				return relativePath;
			}
		),
		getCssFiles( 'themes/' + themeDirectory, false, false ).map(
			( file ) => {
				const relativePath = getRelativePath( file, themeDirectory );
				process.stdout.write(
					chalk.green(
						chalk.green( ' \u21D2 ' ) +
						relativePath + '\n'
					)
				);
				return relativePath;
			}
		),
	);
}

module.exports = getIndexPaths;