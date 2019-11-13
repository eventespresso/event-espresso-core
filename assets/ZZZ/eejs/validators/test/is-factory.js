/**
 * External imports
 */
import { EventFactory, DateTimeFactory } from '@test/fixtures';

/**
 * Internal imports
 */
import {
	isModelEntityFactory,
	isModelEntityFactoryOfModel,
} from '../is-factory';

describe( 'isModelEntityFactory()', () => {
	[
		[ 0, false ],
		[ {}, false ],
		[ null, false ],
		[ 'fail', false ],
		[ { modelName: 'something', classDef: {} }, false ],
		[ true, false ],
		[ EventFactory, true ],
	].forEach( ( [
		factoryWannabe,
		expectedResult,
	] ) => {
		it( 'has expected result for tested value', () => {
			expect( isModelEntityFactory( factoryWannabe ) ).toBe( expectedResult );
		} );
	} );
} );

describe( 'isModelEntityFactoryOfModel', () => {
	[
		[ EventFactory, 'event', true ],
		[ DateTimeFactory, 'event', false ],
	].forEach( ( [
		factoryWannabe,
		modelName,
		expectedResult,
	] ) => {
		it( 'has expected result for tested value', () => {
			expect( isModelEntityFactoryOfModel( factoryWannabe, modelName ) )
				.toBe( expectedResult );
		} );
	} );
} );
