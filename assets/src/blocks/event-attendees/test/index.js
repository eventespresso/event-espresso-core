/**
 * External dependencies
 */
import { shallow } from 'enzyme';
import { getCategories, setCategories } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import EventAttendeesEditor from '../edit';

beforeAll( () => {
	const categories = getCategories();
	categories.push( { slug: 'event-espresso', title: 'Event Espresso' } );
	setCategories( categories );
} );

describe( 'EventAttendeesEditor Block', () => {
	test( 'block edit matches snapshot', () => {
		const wrapper = shallow( <EventAttendeesEditor /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );

// location: /assets/src/blocks/event-attendees/test/index.js
