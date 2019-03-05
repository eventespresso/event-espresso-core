import {
	DEFAULT_LISTS_STATE,
	DEFAULT_CORE_STATE,
} from '../default-model-state';

describe( 'DEFAULT_LISTS_STATE', () => {
	it( 'matches expected initial state for the models exposed ' +
		'on the endpoints', () => {
		const expectedState = {
			datetime: {},
			datetime_ticket: {},
			event: {},
			ticket: {},
			venue: {},
			term: {},
			checkin: {},
			registration: {},
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
				datetime_ticket: {},
				event: {},
				ticket: {},
				venue: {},
				term: {},
				checkin: {},
				registration: {},
			},
			relations: {
				index: {},
				entityMap: {},
			},
			dirty: {
				relations: {
					index: {},
					delete: {},
					add: {},
				},
				trash: {},
				delete: {},
			},
		};
		expect( DEFAULT_CORE_STATE ).toEqual( expectedState );
	} );
} );
