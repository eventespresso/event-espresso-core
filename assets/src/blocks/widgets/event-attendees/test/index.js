/**
 * External dependencies
 */
import { blockEditRender } from '../../../helpers';

/**
 * Internal dependencies
 */
import { name, settings } from '../';

describe ( name, () => {
	test ( 'block edit matches snapshot', () => {
		const wrapper = blockEditRender ( name, settings );
		expect ( wrapper ).toMatchSnapshot ();
	} );
} );

// location: /assets/src/blocks/widgets/event-attendees/test/index.js