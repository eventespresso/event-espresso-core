import TicketSelect from '../ticket';
import { shallow } from 'enzyme';

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
		expect( wrapper.prop( 'selectLabel' ) ).toEqual( 'Select Ticket' );
		expect( wrapper.prop( 'addAllOptionLabel' ) ).toEqual( 'All Tickets' );
	} );
	it( 'matches expected update to queryData state with forEventId prop',
		() => {
			const wrapper = shallow( <TicketSelect forEventId={ 20 } /> );
			expect( wrapper.state( 'queryData' ) ).toEqual( {
				...expectedDefaultQueryData,
				forEventId: 20,
			} );
		} );
	it( 'matches expected update to queryData state with forDatetimeId prop',
		() => {
			const wrapper = shallow( <TicketSelect forDatetimeId={ 20 } /> );
			expect( wrapper.state( 'queryData' ) ).toEqual( {
				...expectedDefaultQueryData,
				forDatetimeId: 20,
			} );
		} );
} );
