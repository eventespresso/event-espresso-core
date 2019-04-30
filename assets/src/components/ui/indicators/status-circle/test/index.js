/**
 * External imports
 */
import { shallow } from 'enzyme';

/**
 * Internal imports
 */
import StatusCircle, { statusSizes } from '../index';


describe( 'StatusCircle', () => {
	it( 'renders as expected with default props', () => {
		const wrapper = shallow( <StatusCircle statusCode={ 'TFL' } /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'renders expected class names for different size passed in', () => {
		const wrapper = shallow(
			<StatusCircle
				statusCode={ 'TFL' }
				circleSize={ statusSizes[ 32 ] }
			/>
		);
		expect(
			wrapper
				.find( '.ee-status-circle' )
				.hasClass( 'status-bg-TFL circle-size-32' )
		).toBe( true );
	} );
	it( 'renders custom class names passed in', () => {
		const wrapper = shallow(
			<StatusCircle
				statusCode={ 'TFL' }
				className={ 'customa customb' }
			/>
		);
		expect(
			wrapper
				.find( '.ee-status-circle' )
				.hasClass( 'customa customb' )
		).toBe( true );
	} );
} );