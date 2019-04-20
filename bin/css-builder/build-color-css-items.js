const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { startCase } = require( 'lodash' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

function buildColorsItems( colorsConfig, template ) {
	const COLOR_ITEM_TEMPLATE = fs.readFileSync(
		path.resolve( TEMPLATES_PATH, `color-${ template }.css.handlebars` ),
		'utf8'
	);
	const colorItemTemplate = compile( COLOR_ITEM_TEMPLATE );
	return colorsConfig.colors.map( ( colorConfig ) => {
		return colorItemTemplate(
			{
				...colorConfig,
				colorLabel: startCase( colorConfig.color )
			}
		)
	} );
}

module.exports = buildColorsItems;