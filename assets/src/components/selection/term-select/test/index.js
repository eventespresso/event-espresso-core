/**
 * External dependencies
 */
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import { TermSelectControl } from '../';

describe( 'TermSelectControl with no options provided', () => {
	it( 'should return nothing', () => {
		const wrapper = mount( <TermSelectControl/> );
		expect( wrapper.instance() ).toBe( null );
	} );
} );