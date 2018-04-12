import { data, exception } from '../index.js';

describe( 'eejs', () => {
	describe( 'data', () => {
		it( 'ensures data object gets set from eejsdata.data global', () => {
			expect( data.testData ).toBe( true );
		} );
	} );

	describe( 'exception', () => {
		it( 'it should throw error with msg "error thrown"', () => {
			const t = () => {
				throw new exception( 'error thrown' );
			};
			expect( t ).toThrowError( 'error thrown' );
		} );
	} );
} );
