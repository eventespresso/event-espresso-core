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

describe( 'EditorTicketSelect()', () => {
	it( 'matches snapshot with default props', () => {
		const wrapper = render( <EditorTicketSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
