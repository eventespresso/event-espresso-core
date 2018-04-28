import { shallow } from 'enzyme';
import { EventSelect } from '../index';

describe( 'EventSelect', () => {
	it( 'should render', () => {
		const wrapper = shallow( <EventSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
