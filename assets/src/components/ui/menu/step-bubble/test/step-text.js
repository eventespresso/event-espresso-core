/**
 * External imports
 */
import { shallow } from 'enzyme';

/**
 * Internal imports
 */
import { StepText } from '../step-text';

describe( 'StepText', () => {
	it( 'renders with provided content', () => {
		const wrapper = shallow( <StepText content={ 'foo' } /> );
		expect( wrapper.find( 'span' ).children() ).toHaveLength( 1 );
		expect( wrapper.text() ).toBe( 'foo' );
	} );
} );