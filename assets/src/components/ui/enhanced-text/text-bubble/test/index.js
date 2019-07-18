/**
 * External imports
 */
import { shallow } from 'enzyme';

/**
 * Internal imports
 */
import TextBubble from '../index';

describe( 'TextBubble', () => {
	it( 'renders as expected with default props', () => {
		const wrapper = shallow( <TextBubble /> );
		expect( wrapper ).toEqual( {} );
	} );
	it( 'renders provided string content as expected', () => {
		const wrapper = shallow( <TextBubble content={ 'Test Content' }/> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );