import { shallow } from 'enzyme';
import { EventSelect } from '../index';

jest.mock( 'tinymce', () => jest.fn() );

describe( 'EventSelect', () => {
	it( 'should render', () => {
		const wrapper = shallow( <EventSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
