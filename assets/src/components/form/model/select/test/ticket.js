import TicketSelect, { EditorTicketSelect } from '../ticket';
import { shallow, render } from 'enzyme';

jest.mock( '../../base/model-select', () => () => <span>TicketSelect</span> );

describe( 'TicketSelect()', () => {
	const expectedDefaultQueryData = {
		limit: 100,
		order: 'DESC',
		orderBy: 'start_date',
		showExpired: false,
	};
	it( 'matches snapshot with default props', () => {
		const wrapper = shallow( <TicketSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches expected default props', () => {
		const wrapper = shallow( <TicketSelect /> );
		expect( wrapper.prop( 'queryData' ) )
			.toEqual( expectedDefaultQueryData );
		expect( wrapper.prop( 'selectConfiguration' ).placeholder ).toEqual(
			'Select Ticket...',
		);
		expect( wrapper.prop( 'modelName' ) ).toEqual( 'ticket' );
		expect( wrapper.prop( 'label' ) ).toEqual( 'Select Ticket' );
	} );
} );

describe( 'EditorTicketSelect()', () => {
	it( 'matches snapshot with default props', () => {
		const wrapper = render( <EditorTicketSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
