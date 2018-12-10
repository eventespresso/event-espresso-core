/**
 * Internal imports
 */
import {
	removeDirtyRelationForAddition,
	removeRelationForEntity,
} from '../delete-relations-generators';
import {
	removeDirtyRelationIndex,
	removeDirtyRelationAddition,
	removeRelatedEntities,
} from '../remove-relations';
import {
	removeEntityById,
} from '../remove-entities';
import {
	receiveDirtyRelationDeletion,
	receiveDirtyRelationIndex,
} from '../receive-relations';

describe( 'removeDirtyRelationForAddition', () => {
	const fullfillment = removeDirtyRelationForAddition(
		'event',
		10,
		'datetimes',
		20
	);
	[ removeDirtyRelationIndex, removeDirtyRelationAddition ].forEach(
		( actionMethod ) => {
			it( 'yields expected value for ' + actionMethod.name, () => {
				const { value } = fullfillment.next();
				expect( value ).toEqual( actionMethod(
					'datetimes',
					20,
					'event',
					10
				) );
			} );
		}
	);
} );

describe( 'removeRelationForEntity()', () => {
	const fulfillment = removeRelationForEntity(
		'event',
		10,
		'datetimes',
		20,
	);
	[
		[
			removeEntityById,
			[ 'datetime', 20 ],
		],
		[
			removeRelatedEntities,
			[ 'event', 10, 'datetimes', [ 20 ] ],
		],
		[
			removeDirtyRelationForAddition,
			[ 'event', 10, 'datetimes', 20 ],
		],
		[
			receiveDirtyRelationIndex,
			[ 'datetimes', 20, 'event', 10, false ],
		],
		[
			receiveDirtyRelationDeletion,
			[ 'datetimes', 20, 'event', 10 ],
		],
	].forEach( ( [ actionMethod, args ] ) => {
		it( 'yields expected action object for ' + actionMethod.name, () => {
			const { value } = fulfillment.next();
			expect( value ).toEqual( actionMethod( ...args ) );
		} );
	} );
} );
