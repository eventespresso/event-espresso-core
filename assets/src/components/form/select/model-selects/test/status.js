import StatusSelect from '../status';
import { shallow } from 'enzyme';
import { QUERY_ORDER_DESC } from 'assets/src/data/model/base';

describe( 'StatusSelect()', () => {
	it( 'matches snapshot with default props', () => {
		const wrapper = shallow( <StatusSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches expected default props', () => {
		const wrapper = shallow( <StatusSelect /> );
		expect( wrapper.prop( 'queryData' ) ).toEqual( {
			limit: 25,
			orderBy: 'statusCode',
			order: QUERY_ORDER_DESC,
		} );
		expect( wrapper.prop( 'selectConfiguration' ).placeholder ).toEqual(
			'Select Status...',
		);
		expect( wrapper.prop( 'modelName' ) ).toEqual( 'status' );
		expect( wrapper.prop( 'selectLabel' ) ).toEqual( 'Select Status' );
		expect( wrapper.prop( 'addAllOptionLabel' ) ).toEqual( 'All Statuses' );
	} );
} );
