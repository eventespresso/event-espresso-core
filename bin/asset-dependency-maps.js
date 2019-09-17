const requestToExternal = ( request ) => {
	const eeDependenciesMap = {
		'@eventespresso/eejs': [ 'eejs' ],
		'@eventespresso/editor-hocs': [ 'eejs', 'editorHocs' ],
		'@eventespresso/components': [ 'eejs', 'components' ],
		'@eventespresso/helpers': [ 'eejs', 'helpers' ],
		'@eventespresso/validators': [ 'eejs', 'validators' ],
		'@eventespresso/i18n': [ 'eejs', 'i18n' ],
		'@eventespresso/value-objects': [ 'eejs', 'valueObjects' ],
		'@eventespresso/model': [ 'eejs', 'model' ],
		'@eventespresso/higher-order-components': [ 'eejs', 'hocs' ],
		'@eventespresso/editor': [ 'eejs', 'editor' ],
		'@eventespresso/hooks': [ 'eejs', 'hooks' ],
		'@eventespresso/utils': [ 'eejs', 'utils' ],
		classnames: [ 'eejs', 'vendor', 'classnames' ],
		'moment-timezone': [ 'eejs', 'vendor', 'moment' ],
		cuid: [ 'eejs', 'vendor', 'cuid' ],
	};
	if ( eeDependenciesMap[ request ] ) {
		return eeDependenciesMap[ request ];
	}
};

const requestToHandle = ( request ) => {
	const handlesMap = {
		'@eventespresso/eejs': 'eejs-core',
		'@eventespresso/i18n': 'eventespresso-vendor',
		'@eventespresso/validators': 'eventespresso-validators',
		'@eventespresso/helpers': 'eventespresso-helpers',
		'@eventespresso/value-objects': 'eventespresso-value-objects',
		'@eventespresso/model': 'eventespresso-model',
		'@eventespresso/higher-order-components': 'eventespresso-hocs',
		'@eventespresso/components': 'eventespresso-components',
		'@eventespresso/editor-hocs': 'eventespresso-editor-hocs',
		'@eventespresso/editor': 'eventespresso-editor',
		'@eventespresso/hooks': 'eventespresso-hooks',
		'@eventespresso/utils': 'eventespresso-utils',
		classnames: 'eventespresso-vendor',
		'moment-timezone': 'eventespresso-vendor',
		cuid: 'eventespresso-vendor',
	};
	if ( handlesMap[ request ] ) {
		return handlesMap[ request ];
	}
};

module.exports = {
	requestToExternal,
	requestToHandle,
};