import TicketSelect from '../ticket';
import { shallow } from 'enzyme';

describe( 'TicketSelect()', () => {
	it( 'matches snapshot with default props', () => {
		const wrapper = shallow( <TicketSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches expected default props', () => {
		const wrapper = shallow( <TicketSelect /> );
		expect( wrapper.prop( 'queryData' ) ).toEqual( {
			limit: 100,
			order: 'DESC',
			orderBy: 'start_date',
			showExpired: false,
		} );
		expect( wrapper.prop( 'selectConfiguration' ).placeholder ).toEqual(
			'Select Ticket...',
		);
		expect( wrapper.prop( 'modelName' ) ).toEqual( 'ticket' );
		expect( wrapper.prop( 'selectLabel' ) ).toEqual( 'Select Ticket' );
		expect( wrapper.prop( 'addAllOptionLabel' ) ).toEqual( 'All Tickets' );
	} );
} );
