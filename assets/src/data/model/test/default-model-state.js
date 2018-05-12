import { DEFAULT_STATE } from '../default-model-state';

describe( 'DEFAULT_STATE', () => {
	it( 'matches expected initial state for the models exposed ' +
		'on the endpoints', () => {
		const expectedState = {
			events: [],
			tickets: [],
			venues: [],
			terms: [],
		};
		expect( DEFAULT_STATE ).toEqual( expectedState );
	} );
} );
