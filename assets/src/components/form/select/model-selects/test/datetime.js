import DatetimeSelect from '../datetime';
import { shallow } from 'enzyme';

describe( 'DatetimeSelect()', () => {
	it( 'matches snapshot with default props', () => {
		const wrapper = shallow( <DatetimeSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches expected default props', () => {
		const wrapper = shallow( <DatetimeSelect /> );
		expect( wrapper.prop( 'queryData' ) ).toEqual( {
			limit: 100,
			order: 'DESC',
			orderBy: 'start_date',
			showExpired: false,
		} );
		expect( wrapper.prop( 'selectConfiguration' ).placeholder ).toEqual(
			'Select Datetime...',
		);
		expect( wrapper.prop( 'modelName' ) ).toEqual( 'datetime' );
		expect( wrapper.prop( 'selectLabel' ) ).toEqual( 'Select Datetime' );
		expect( wrapper.prop( 'addAllOptionLabel' ) )
			.toEqual( 'All Datetimes' );
	} );
} );
