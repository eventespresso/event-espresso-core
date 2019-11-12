const path = require( 'path' );

const assets = 'assets/ZZZ/';

const aliases = {
	'@eventespresso/eejs': path.resolve( __dirname, assets + 'eejs' ),
	'@eventespresso/blocks': path.resolve( __dirname, assets + 'blocks' ),
	'@eventespresso/components': path.resolve( __dirname, assets + 'components' ),
	'@eventespresso/data': path.resolve( __dirname, assets + 'data' ),
	'@eventespresso/editor': path.resolve( __dirname, assets + 'editor' ),
	'@eventespresso/editor-hocs': path.resolve( __dirname, assets + 'editor-hocs' ),
	'@eventespresso/helpers': path.resolve( __dirname, assets + 'data/helpers' ),
	'@eventespresso/higher-order-components': path.resolve( __dirname, assets + 'higher-order-components' ),
	'@eventespresso/hooks': path.resolve( __dirname, assets + 'hooks' ),
	'@eventespresso/i18n': '@wordpress/i18n',
	'@eventespresso/model': path.resolve( __dirname, assets + 'data/model' ),
	'@eventespresso/model-schema': path.resolve( __dirname, assets + 'data/model/eventespresso/schema' ),
	'@eventespresso/utils': path.resolve( __dirname, assets + 'utils' ),
	'@eventespresso/validators': path.resolve( __dirname, assets + 'eejs/validators' ),
	'@eventespresso/value-objects': path.resolve( __dirname, assets + 'vo' ),
	'@test/fixtures': path.resolve( __dirname, 'tests/javascript-config/unit/fixtures' ),
};
module.exports = {
	resolve: {
		alias: aliases,
	},
};
