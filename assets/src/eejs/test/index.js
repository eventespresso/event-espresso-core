import { data, exception, routes } from '../';

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

	describe( 'routes', () => {
		describe( 'getAdminUrl()', () => {
			it( 'provides the url to the events admin page by default.', () => {
				expect( routes.getAdminUrl() ).toEqual(
					'https://eetest.test/wp-admin/?admin.php&page=espresso_events&action=default'
				);
			} );
		} );
	} );
} );
