/**
 * External imports
 */
import { shallow } from 'enzyme';

/**
 * Internal imports
 */
import CheckInStatusIcon from '../status-icon';

describe( 'CheckInStatusIcon', () => {
	const rendered = ( props ) => shallow( <CheckInStatusIcon { ...props } /> );
	it( 'renders as expected for default props', () => {
		const wrapper = rendered();
		expect( wrapper ).toMatchSnapshot();
	} );
} );
