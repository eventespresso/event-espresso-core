import EventSelect from '../event';
import { shallow } from 'enzyme';

describe( 'EventSelect()', () => {
	it( 'matches snapshot with default props', () => {
		const wrapper = shallow( <EventSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches expected default props', () => {
		const wrapper = shallow( <EventSelect /> );
		expect( wrapper.prop( 'queryData' ) ).toEqual( {
			limit: 100,
			order: 'DESC',
			orderBy: 'start_date',
			showExpired: false,
		} );
		expect( wrapper.prop( 'selectConfiguration' ).placeholder ).toEqual(
			'Select Event...',
		);
		expect( wrapper.prop( 'modelName' ) ).toEqual( 'event' );
	} );
	it( 'does not allow overriding the modelName', () => {
		const wrapper = shallow( <EventSelect modelName={ 'tickets' } /> );
		expect( wrapper.prop( 'modelName' ) ).toEqual( 'event' );
	} );
} );
