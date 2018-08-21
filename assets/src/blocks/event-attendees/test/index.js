/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import EventAttendeesEditor from '../edit';

describe( 'EventAttendeesEditor Block', () => {
	test( 'block edit matches snapshot', () => {
		const wrapper = shallow( <EventAttendeesEditor /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
