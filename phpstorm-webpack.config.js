const path = require( 'path' );

const assets = 'assets/src/';

const aliases = {
	'@eventespresso/eejs': path.resolve( __dirname, assets + 'eejs' ),
	'@eventespresso/i18n': '@wordpress/i18n',
	'@eventespresso/validators': path.resolve( __dirname, assets + 'eejs/validators' ),
	'@eventespresso/helpers': path.resolve( __dirname, assets + 'data/helpers' ),
	'@eventespresso/model': path.resolve( __dirname, assets + 'data/model' ),
	'@eventespresso/value-objects': path.resolve( __dirname, assets + 'vo' ),
	'@eventespresso/higher-order-components': path.resolve( __dirname, assets + 'higher-order-components' ),
	'@eventespresso/components': path.resolve( __dirname, assets + 'components' ),
	'@eventespresso/editor-hocs': path.resolve( __dirname, assets + 'editor/hocs' ),
};
module.exports = {
	resolve: {
		alias: aliases,
	},
};
