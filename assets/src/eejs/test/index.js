import {
	data,
	Exception,
	routes,
} from '../';

describe( 'eejs', () => {
	describe( 'data', () => {
		it( 'ensures data object gets set from eejsdata.data global', () => {
			expect( data.testData ).toBe( true );
		} );
	} );

	describe( 'Exception', () => {
		const t = () => {
			throw new Exception( 'error thrown' );
		};
		it( 'should throw error with msg "error thrown"', () => {
			expect( t ).toThrow( 'error thrown' );
		} );
		it( 'should throw an error which is an instance of "Exception"', () => {
			expect( t ).toThrow( Exception );
		} );
	} );
	describe( 'routes', () => {
		it( 'provides the url to the events admin page by default.', () => {
			expect( routes.getAdminUrl() ).toEqual(
				'https://eetest.test/wp-admin/admin.php?page=espresso_events&action=default'
			);
		} );
	} );
} );
