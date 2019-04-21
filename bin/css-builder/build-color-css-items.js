const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { startCase } = require( 'lodash' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

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