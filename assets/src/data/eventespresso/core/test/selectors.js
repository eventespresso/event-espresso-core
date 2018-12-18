/**
 * External dependencies
 */
import { values } from 'lodash';

/**
 * Internal dependencies
 */
import {
	getEntityRecordsForModel,
	getEntitiesForModel,
	getEntityById,
	getEntitiesByIds,
} from '../selectors';
import { mockStateForTests } from './fixtures';
import { EventEntities } from '../../test/fixtures/base';

describe( 'getEntitiesForModel()', () => {
	it( 'returns null when modelName is not in state',
		() => {
			expect( getEntitiesForModel( mockStateForTests, 'ticket' ) )
				.toBeNull();
		},
	);

	it( 'returns expected objects for the modelName in the state',
		() => {
			expect( getEntitiesForModel( mockStateForTests, 'event' ) )
				.toEqual( values( mockStateForTests.entities.event ) );
		},
	);
} );

describe( 'getEntityRecordsForModel()', () => {
	it( 'returns null when modelName is not in state', () => {
		expect( getEntityRecordsForModel( mockStateForTests, 'ticket' ) )
			.toBeNull();
	} );
	it( 'returns expected objects for the modelName in the state', () => {
		expect( getEntityRecordsForModel( mockStateForTests, 'event' ) )
			.toEqual( mockStateForTests.entities.event );
	} );
} );

describe( 'getEntityById()', () => {
	it( 'returns null when modelName is not in state', () => {
		expect( getEntityById( mockStateForTests, 'ticket', 10 ) )
			.toBeNull();
	} );

	it( 'returns null when modelName is in state but not id', () => {
		expect( getEntityById( mockStateForTests, 'event', 50 ) )
			.toBeNull();
	} );

	it( 'returns expected object for valid modelName and entity id' +
		' (when id is given as number)', () => {
		expect( getEntityById( mockStateForTests, 'event', 20 ) )
			.toEqual( EventEntities.b );
	} );

	it( 'returns expected object for valid modelName and entity id' +
		' (when id is given as string)', () => {
		expect( getEntityById( mockStateForTests, 'event', '20' ) )
			.toEqual( EventEntities.b );
	} );
} );

describe( 'getEntitiesById()', () => {
	it( 'returns null when modelName is not in state', () => {
		expect( getEntitiesByIds( mockStateForTests, 'ticket', [ 10 ] ) )
			.toBe( null );
	} );

	it( 'returns empty array when modelName is in state but entity ids are not',
		() => {
			expect( getEntitiesByIds( mockStateForTests, 'event', [ 50 ] ) )
				.toEqual( [] );
		} );

	it( 'returns expected value for valid modelName and entity ids ' +
		'(when ids are given as number)', () => {
		expect( getEntitiesByIds( mockStateForTests, 'event', [ 20 ] ) )
			.toEqual( [ EventEntities.b ] );
	} );

	it( 'returns expected value for valid modelName and entity ids ' +
		'(when ids are given as string)', () => {
		expect( getEntitiesByIds( mockStateForTests, 'event', [ '20' ] ) )
			.toEqual( [ EventEntities.b ] );
	} );
} );
