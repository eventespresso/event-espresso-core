/**
 * External imports
 */
import { shallow } from 'enzyme';

/**
 * Internal imports
 */
import StatusSection from '../index';

describe( 'StatusSection', () => {
	const getWrapper = ( props ) => shallow( <StatusSection
		statusLabel={ 'Transaction Status:' }
		statusValue={ 'Failed' }
		statusCode={ 'TFL' }
		{ ...props }
	/> );
	it( 'returns expected shape for default props (with required ' +
		'values)', () => {
		expect( getWrapper() ).toMatchSnapshot();
	} );
	it( 'returns expected classname for section container when custom css ' +
		'class passed in', () => {
		const wrapper = getWrapper( { className: 'custom' } );
		expect(
			wrapper.find( '.ee-status-section-container' ).hasClass( 'custom' )
		).toBe( true );
	} );
} );