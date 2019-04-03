import {
	MODEL_NAMES,
	modelNameForQueryString,
} from '../model-names';

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

describe( 'modelNameForQueryString()', () => {
	[
		[ 'event', 'Event' ],
		[ 'message_template_group', 'Message_Template_Group' ],
	].forEach( ( [ incomingString, expectedValue ] ) => {
		it( `returns expected format for the string: ${ incomingString }`, () => {
			expect( modelNameForQueryString( incomingString ) )
				.toBe( expectedValue );
		} );
	} );
} );
