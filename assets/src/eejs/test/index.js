import { data, exception } from '../index.js';

describe( 'eejs', () => {
	describe( 'data', () => {
		it( 'ensures data object gets set from eejsdata.data global', () => {
			expect( data.testData ).toBe( true );
		} );
	} );

	describe( 'exception', () => {
		const t = () => {
			throw new exception( 'error thrown' );
		};
		it( 'should throw error with msg "error thrown"', () => {
			expect( t ).toThrowError( 'error thrown' );
		} );
		it( 'should throw an error which is an instance of "exception"', () => {
			expect( t ).toThrowError( exception );
		} );
	} );
} );
