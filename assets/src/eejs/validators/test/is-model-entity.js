/**
 * Internal Imports
 */
import { isModelEntity, isModelEntityOfModel } from '../is-model-entity';
/**
 * External imports
 */
import { EventEntity, AuthedDateTimeEntity } from '@test/fixtures';

describe( 'isModelEntity()', () => {
	[
		[ 0, false ],
		[ {}, false ],
		[ null, false ],
		[ 'fail', false ],
		[ true, false ],
		[ EventEntity, true ],
		[ AuthedDateTimeEntity, true ],
	].forEach( ( [
		entity,
		expectedResult,
	] ) => {
		it( 'returns expected result for given value', () => {
			expect( isModelEntity( entity ) ).toBe( expectedResult );
		} );
	} );
} );

describe( 'isModelEntityOfModel()', () => {
	[
		[ EventEntity, 'event', true ],
		[ AuthedDateTimeEntity, 'event', false ],
	].forEach( ( [
		entity,
		modelName,
		expectedResult,
	] ) => {
		it( 'returns expected result for given value', () => {
			expect( isModelEntityOfModel( entity, modelName ) )
				.toBe( expectedResult );
		} );
	} );
} );
