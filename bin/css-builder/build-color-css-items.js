const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { startCase } = require( 'lodash' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

/**
 * Function that builds the colors stylesheets.
 * @param {Object} themeConfig The configuration object for the theme
 * @param {string} templateId  The specific template being built.
 * @return {string} The build content for writing to a final file.
 */
function buildColorsItems( themeConfig, templateId ) {
	const colorItemTemplate = fs.readFileSync(
		path.resolve( TEMPLATES_PATH, `color-${ templateId }.css.handlebars` ),
		'utf8'
	);
	const template = compile( colorItemTemplate );
	return themeConfig.colors.map( ( colorConfig ) => {
		return template(
			{
				...colorConfig,
				colorLabel: startCase( colorConfig.color )
			}
		)
	} );
}

module.exports = buildColorsItems;