/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import { EventAttendeesEditor } from '../edit';

describe( 'EventAttendeesEditor Block', () => {
	test( 'block edit matches snapshot for no props', () => {
		const wrapper = shallow( <EventAttendeesEditor /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	test( 'block edit matches snapshot with isLoading false and ' +
		'no attendees', () => {
		const wrapper = shallow( <EventAttendeesEditor isLoading={ false } /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	test( 'block edit matches snapshot with isLoading false ' +
		'and has attendees', () => {
		const testProps = {
			isLoading: false,
			attendees: [ { ATT_ID: 10, ATT_fname: 'dude' } ],
		};
		const wrapper = shallow( <EventAttendeesEditor { ...testProps } /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
