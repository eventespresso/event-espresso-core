const {
	routes,
	TIMEZONE_CONFIG,
	SERVER_LOCALE,
	Exception,
	InvalidSchema,
	InvalidArgument,
	InvalidTimezone,
	InvalidISO8601String,
	InvalidLocale,
	InvalidDateTime,
	mergeAndDeDuplicateArrays,
	mergeAndDeDuplicateObjects,
	mapReducer,
	convertToObjectFromMap,
	isGenerator,
	isModelEntity,
	isModelEntityFactory,
	isModelEntityFactoryOfModel,
	isModelEntityOfModel,
	isSchemaResponse,
	isSchema,
	isSchemaResponseOfModel,
	isSchemaOfModel,
	__DEV__,
} = require( '../../../../../assets/src/eejs' );

const newCurrencyConfig = {
	code: 'USD',
	singularLabel: 'dollar',
	pluralLabel: 'dollars',
	sign: '$',
	signB4: true,
	decimalMark: '.',
	thousandsSeparator: ',',
	subunits: 100,
};

module.exports.data = {
	paths: {
		collection_endpoints: {
			event: '/ee/v4.8.36/events',
			datetime: '/ee/v4.8.36/datetimes',
			ticket: '/ee/v4.8.36/tickets',
			venue: '/ee/v4.8.36/venues',
			term: '/ee/v4.8.36/terms',
		},
		primary_keys: {
			event: 'EVT_ID',
			datetime: 'DTT_ID',
			ticket: 'TKT_ID',
			venue: 'VNU_ID',
			term: [ 'TERM_ID', 'TAXONOMY_ID' ],
		},
	},
	site_formats: {
		date_formats: {
			moment_split: {
				date: 'YYYY-MM-DD',
				time: 'HH:mm:ss',
			},
		},
	},
	currency_config: {
		code: 'USD',
		singularLabel: 'dollar',
		pluralLabel: 'dollars',
		sign: '$',
		signB4: true,
		decimalMark: '.',
		thousandsSeparator: ',',
		subunits: 100,
	},
	default_timezone: {
		pretty: 'UTC',
		string: 'UTC',
		offset: 0,
	},
	locale: {
		user: 'en',
		site: 'en',
	},
};


module.exports.routes = routes;
module.exports.CURRENCY_CONFIG = newCurrencyConfig;
module.exports.TIMEZONE_CONFIG = TIMEZONE_CONFIG;
module.exports.SERVER_LOCALE = SERVER_LOCALE;
module.exports.Exception = Exception;
module.exports.InvalidSchema = InvalidSchema;
module.exports.InvalidArgument = InvalidArgument;
module.exports.InvalidTimezone = InvalidTimezone;
module.exports.InvalidISO8601String = InvalidISO8601String;
module.exports.InvalidLocale = InvalidLocale;
module.exports.InvalidDateTime = InvalidDateTime;
module.exports.mergeAndDeDuplicateArrays = mergeAndDeDuplicateArrays;
module.exports.mergeAndDeDuplicateObjects = mergeAndDeDuplicateObjects;
module.exports.mapReducer = mapReducer;
module.exports.convertToObjectFromMap = convertToObjectFromMap;
module.exports.isGenerator = isGenerator;
module.exports.isModelEntity = isModelEntity;
module.exports.isModelEntityFactory = isModelEntityFactory;
module.exports.isModelEntityFactoryOfModel = isModelEntityFactoryOfModel;
module.exports.isModelEntityOfModel = isModelEntityOfModel;
module.exports.isSchemaResponse = isSchemaResponse;
module.exports.isSchema = isSchema;
module.exports.isSchemaResponseOfModel = isSchemaResponseOfModel;
module.exports.isSchemaOfModel = isSchemaOfModel;
module.exports.__DEV__ = __DEV__;
