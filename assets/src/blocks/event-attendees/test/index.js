/**
 * External dependencies
 */
import { blockEditRender } from '../../tests';

/**
 * Internal dependencies
 */
import { name, settings } from '../';

describe( name, () => {
	test( 'block edit matches snapshot', () => {
		const wrapper = blockEditRender( name, settings );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
