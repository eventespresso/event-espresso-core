const path = require( 'path' );
const getCssFiles = require( './get-css-files' );
const chalk = require( 'chalk' );

const STYLES_DIRECTORY = path.resolve( __dirname, '../../assets/src/components/ui/styles' );

function getRelativePath( file, themeDirectory, toRoot = false ) {
	const from = path.resolve( STYLES_DIRECTORY, 'themes', themeDirectory );
	const to = toRoot ?
		path.resolve( STYLES_DIRECTORY, 'root', file ) :
		from;
	return toRoot ? path.relative( from, to ) : `./${ file }`;
}

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