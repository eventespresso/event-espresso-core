/**
 * Internal imports
 */
import { getMethodName, keepExistingEntitiesInObject } from '../base-model';

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
	const plainExisting = { 0: 'bar' };
	const plainIncoming = { 1: 'foo', 0: 'foo' };
	const mapExisting = new Map( [ [ 0, 'bar' ] ] );
	const mapIncoming = new Map(
		[
			[ 1, 'foo' ],
			[ 0, 'foo' ],
		]
	);
	const expectedMapUnordered = new Map(
		[ [ 0, 'bar' ], [ 1, 'foo' ] ]
	);
	const expectedMapOrdered = new Map(
		[ [ 1, 'foo' ], [ 0, 'bar' ] ]
	);
	const testConditions = [
		[
			'when both arguments are plain objects',
			plainExisting,
			plainIncoming,
			expectedMapUnordered,
		],
		[
			'when existing is Map and incoming is plain object',
			mapExisting,
			plainIncoming,
			expectedMapUnordered,
		],
		[
			'when existing is plain Object and incoming is Map',
			plainExisting,
			mapIncoming,
			expectedMapOrdered,
		],
		[
			'when both arguments are Maps',
			mapExisting,
			mapIncoming,
			expectedMapOrdered,
		],
	];
	testConditions.forEach( ( [
		description,
		existing,
		incoming,
		expectedResult,
	] ) => {
		it( 'returns expected result ' + description, () => {
			expect( keepExistingEntitiesInObject( existing, incoming ) )
				.toEqual( expectedResult );
		} );
	} );
} );
