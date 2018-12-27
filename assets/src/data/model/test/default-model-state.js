import {
	DEFAULT_LISTS_STATE,
	DEFAULT_CORE_STATE,
} from '../default-model-state';

describe( 'DEFAULT_LISTS_STATE', () => {
	it( 'matches expected initial state for the models exposed ' +
		'on the endpoints', () => {
		const expectedState = {
			datetime: {},
			event: {},
			ticket: {},
			venue: {},
			term: {},
		};
		expect( DEFAULT_LISTS_STATE ).toEqual( expectedState );
	} );
} );

describe( 'DEFAULT_CORE_STATE', () => {
	it( 'matches expected initial state for the models exposed' +
		' on the endpoints', () => {
		const expectedState = {
			entities: {
				datetime: {},
				event: {},
				ticket: {},
				venue: {},
				term: {},
			},
			entityIds: {
				datetime: {},
				event: {},
				ticket: {},
				venue: {},
				term: {},
			},
		};
		expect( DEFAULT_CORE_STATE ).toEqual( expectedState );
	} );
} );
