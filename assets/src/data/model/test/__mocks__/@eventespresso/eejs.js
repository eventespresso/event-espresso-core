const { Exception } = require( '../../../../../eejs/index' );

module.exports.data = {
	paths: {
		collection_endpoints: {
			events: '/ee/v4.8.36/events',
			tickets: '/ee/v4.8.36/tickets',
			venues: '/ee/v4.8.36/venues',
			terms: '/ee/v4.8.36/terms',
		},
		primary_keys: {
			events: 'EVT_ID',
			tickets: 'TKT_ID',
			venues: 'VNU_ID',
			terms: [ 'TERM_ID', 'TAXONOMY_ID' ],
		},
	},
};

module.exports.Exception = Exception;
