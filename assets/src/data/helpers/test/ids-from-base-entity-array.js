/**
 * External imports
 */
import { EventFactory } from '@test/fixtures';

/**
 * Internal imports
 */
import { getIdsFromBaseEntityArray } from '../ids-from-base-entity-array';

describe( 'getIdsFromBaseEntityArray', () => {
	const EventA = EventFactory.createNew(
		{ EVT_name: 'Event A' }
	);
	const EventB = EventFactory.createNew(
		{ EVT_name: 'Event B' }
	);
	const testArray = [
		EventA,
		'should get excluded',
		EventB,
	];
	it( 'returns expected list of ids from a given array', () => {
		expect( getIdsFromBaseEntityArray( testArray ) )
			.toEqual( [ EventA.id, EventB.id ] );
	} );
} );
