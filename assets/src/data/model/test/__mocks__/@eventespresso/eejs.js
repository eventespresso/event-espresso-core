const {
	Exception,
	mergeAndDeDuplicateArrays,
	mergeAndDeDuplicateObjects,
} = require( '../../../../../eejs/index' );

module.exports.data = {
	paths: {
		collection_endpoints: {
			event: '/ee/v4.8.36/events',
			ticket: '/ee/v4.8.36/tickets',
			venue: '/ee/v4.8.36/venues',
			term: '/ee/v4.8.36/terms',
		},
		primary_keys: {
			event: 'EVT_ID',
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
};

module.exports.Exception = Exception;
module.exports.mergeAndDeDuplicateArrays = mergeAndDeDuplicateArrays;
module.exports.mergeAndDeDuplicateObjects = mergeAndDeDuplicateObjects;
