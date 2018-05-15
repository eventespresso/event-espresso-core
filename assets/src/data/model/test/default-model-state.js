import {
	DEFAULT_LISTS_STATE,
	DEFAULT_CORE_STATE,
} from '../default-model-state';

describe( 'DEFAULT_LISTS_STATE', () => {
	it( 'matches expected initial state for the models exposed ' +
		'on the endpoints', () => {
		const expectedState = {
			events: [],
			tickets: [],
			venues: [],
			terms: [],
		};
		expect( DEFAULT_LISTS_STATE ).toEqual( expectedState );
	} );
} );

describe( 'DEFAULT_CORE_STATE', () => {
	it( 'matches expected initial state for the models exposed' +
		' on the endpoints', () => {
		const expectedState = {
			entities: {
				events: {},
				tickets: {},
				venues: {},
				terms: {},
			},
			entityIds: {
				events: [],
				tickets: [],
				venues: [],
				terms: [],
			},
			dirty: {
				events: [],
				tickets: [],
				venues: [],
				terms: [],
			},
		};
		expect( DEFAULT_CORE_STATE ).toEqual( expectedState );
	} );
} );
