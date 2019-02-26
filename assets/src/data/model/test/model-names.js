import { MODEL_NAMES } from '../model-names';

describe( 'MODEL_NAMES', () => {
	it( 'returns the expected values for models', () => {
		expect( MODEL_NAMES ).toEqual(
			[
				'event',
				'datetime',
				'ticket',
				'venue',
				'term',
				'checkin',
				'registration',
			]
		);
	} );
} );
