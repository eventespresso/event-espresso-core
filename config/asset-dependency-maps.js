const requestToExternal = ( request ) => {
	const eeDependenciesMap = {
		'@eventespresso/eejs': [ 'eejs' ],
		'@eventespresso/core-blocks': [ 'eejs', 'core-blocks' ],
		'@eventespresso/components': [ 'eejs', 'components' ],
		'@eventespresso/editor': [ 'eejs', 'editor' ],
		'@eventespresso/editor-hocs': [ 'eejs', 'editorHocs' ],
		'@eventespresso/helpers': [ 'eejs', 'helpers' ],
		'@eventespresso/higher-order-components': [ 'eejs', 'hocs' ],
		'@eventespresso/hooks': [ 'eejs', 'hooks' ],
		'@eventespresso/i18n': [ 'eejs', 'i18n' ],
		'@eventespresso/model': [ 'eejs', 'model' ],
		'@eventespresso/model-schema': [ 'eejs', 'modelSchema' ],
		'@eventespresso/utils': [ 'eejs', 'utils' ],
		'@eventespresso/validators': [ 'eejs', 'validators' ],
		'@eventespresso/value-objects': [ 'eejs', 'valueObjects' ],
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
		'@eventespresso/core-blocks': 'eventespresso-core-blocks',
		'@eventespresso/components': 'eventespresso-components',
		'@eventespresso/editor': 'eventespresso-editor',
		'@eventespresso/editor-hocs': 'eventespresso-editor-hocs',
		'@eventespresso/helpers': 'eventespresso-helpers',
		'@eventespresso/higher-order-components': 'eventespresso-hocs',
		'@eventespresso/hooks': 'eventespresso-hooks',
		'@eventespresso/i18n': 'eventespresso-vendor',
		'@eventespresso/model': 'eventespresso-model',
		'@eventespresso/model-schema': 'eventespresso-model-schema',
		'@eventespresso/utils': 'eventespresso-utils',
		'@eventespresso/validators': 'eventespresso-validators',
		'@eventespresso/value-objects': 'eventespresso-value-objects',
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