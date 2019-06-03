const requestToExternal = ( request ) => {
	const eeDependenciesMap = {
		'@eventespresso/eejs': [ 'eejs' ],
		'@eventespresso/i18n': [ 'eejs', 'i18n' ],
		'@eventespresso/validators': [ 'eejs', 'validators' ],
		'@eventespresso/helpers': [ 'eejs', 'helpers' ],
		'@eventespresso/value-objects': [ 'eejs', 'valueObjects' ],
		'@eventespresso/model': [ 'eejs', 'model' ],
		'@eventespresso/higher-order-components': [ 'eejs', 'hocs' ],
		'@eventespresso/components': [ 'eejs', 'components' ],
		'@eventespresso/editor-hocs': [ 'eejs', 'editorHocs' ],
		'react-redux': [ 'eejs', 'vendor', 'reactRedux' ],
		redux: [ 'eejs', 'vendor', 'redux' ],
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
		'react-redux': 'eventespresso-vendor',
		redux: 'eventespresso-vendor',
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