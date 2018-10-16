/**
 * Internal imports
 */
import { getMethodName, keepExistingEntitiesInObject } from '../base-entities';

describe( 'getMethodName()', () => {
	[
		[
			[ 'event', '', 'get', false ],
			'getEvent',
		],
		[
			[ 'event', '', 'get', true ],
			'getEvents',
		],
		[
			[ 'event', 'toGo', '', false ],
			'EventToGo',
		],
		[
			[ 'event', 'toGo', '', true ],
			'EventsToGo',
		],
	].forEach( ( [
		args,
		expectedName,
	] ) => {
		it( 'returns the expected value of ' + expectedName, () => {
			expect( getMethodName( ...args ) ).toEqual( expectedName );
		} );
	} );
} );

describe( 'keepExistingEntitiesInObject()', () => {
	const existing = {
		1: 'some_value',
		2: 'foo',
		3: 'bar',
	};
	const incoming = {
		1: 'foo',
		2: 'bar',
		4: 'surprise',
	};

	it( 'returns expected merged values', () => {
		expect( keepExistingEntitiesInObject( existing, incoming ) ).toEqual(
			{
				1: 'some_value',
				2: 'foo',
				4: 'surprise',
			}
		);
	} );
} );
