/**
 * External imports
 */
import { isGenerator } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import * as resolvers from '../../resolvers';
import { createResolvers } from '../entity-resolvers';

jest.mock( '@eventespresso/model', () => ( {
	...require.requireActual( '@eventespresso/model' ),
	MODEL_NAMES: [ 'datetime' ],
} ) );

describe( 'createResolvers()', () => {
	const newResolvers = createResolvers( resolvers );
	const expectedResolvers = [
		[
			'getDatetimeById',
			[ 10 ],
			'generator',
		],
	];
	describe( 'creates expected resolvers for given model name', () => {
		expectedResolvers.forEach( ( [
			expectedResolver,
			args,
			expectedResponse,
		] ) => {
			describe( expectedResolver + '()', () => {
				it( 'is defined.', () => {
					expect( newResolvers[ expectedResolver ] ).toBeDefined();
				} );
				it( 'returns expectedValue', () => {
					if ( expectedResponse === 'generator' ) {
						expect( isGenerator(
							newResolvers[ expectedResolver ]( ...args )
						) ).toBe( true );
					} else {
						expect( newResolvers[ expectedResolver ](
							...args
						) ).toEqual( expectedResponse );
					}
				} );
			} );
		} );
	} );
} );

