import DatetimeSelect from '../datetime';
import { shallow } from 'enzyme';

describe( 'DatetimeSelect()', () => {
	const expectedDefaultQueryData = {
		limit: 100,
		order: 'DESC',
		orderBy: 'start_date',
		showExpired: false,
	};
	it( 'matches snapshot with default props', () => {
		const wrapper = shallow( <DatetimeSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches expected default props', () => {
		const wrapper = shallow( <DatetimeSelect /> );
		expect( wrapper.prop( 'queryData' ) )
			.toEqual( expectedDefaultQueryData );
		expect( wrapper.state( 'queryData' ) )
			.toEqual( expectedDefaultQueryData );
		expect( wrapper
			.prop( 'selectConfiguration' ).placeholder ).toEqual(
			'Select Datetime...',
		);
		expect( wrapper.prop( 'modelName' ) ).toEqual( 'datetime' );
		expect( wrapper.prop( 'selectLabel' ) ).toEqual( 'Select Datetime' );
		expect( wrapper.prop( 'addAllOptionLabel' ) )
			.toEqual( 'All Datetimes' );
	} );
	it( 'matches expected update to queryData state with forEventId prop',
		() => {
			const wrapper = shallow( <DatetimeSelect forEventId={ 20 } /> );
			expect( wrapper.state( 'queryData' ) ).toEqual( {
				...expectedDefaultQueryData,
				forEventId: 20,
			} );
		},
	);
} );
