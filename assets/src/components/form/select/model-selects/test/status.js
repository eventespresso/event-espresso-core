import StatusSelect from '../status';
import { shallow } from 'enzyme';
import { QUERY_ORDER_DESC } from 'assets/src/data/model/base';
import * as statusModel from 'assets/src/data/model/status';

describe( 'StatusSelect()', () => {
	const expectedDefaultQueryData = {
		limit: 25,
		orderBy: 'statusCode',
		order: QUERY_ORDER_DESC,
		statusType: statusModel.STATUS_TYPE_REGISTRATION,
	};
	it( 'matches snapshot with default props plus provided statusType', () => {
		const wrapper = shallow(
			<StatusSelect
				statusType={ statusModel.STATUS_TYPE_REGISTRATION }
			/>
		);
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches expected default props plus provided statusType', () => {
		const wrapper = shallow(
			<StatusSelect
				statusType={ statusModel.STATUS_TYPE_REGISTRATION }
			/>
		);
		expect( wrapper.prop( 'queryData' ) )
			.toEqual( expectedDefaultQueryData );
		expect( wrapper.prop( 'selectConfiguration' ).placeholder ).toEqual(
			'Select Status...',
		);
		expect( wrapper.prop( 'modelName' ) ).toEqual( 'status' );
		expect( wrapper.prop( 'selectLabel' ) ).toEqual( 'Select Status' );
		expect( wrapper.prop( 'addAllOptionLabel' ) ).toEqual( 'All Statuses' );
	} );
} );
