import StatusSelect, { EditorStatusSelect } from '../status';
import { shallow, render } from 'enzyme';
import { QUERY_ORDER_DESC } from 'assets/src/data/model/base';
import * as statusModel from 'assets/src/data/model/status';

jest.mock( '../../model-select', () => () => <span>StatusSelect</span> );

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
		expect( wrapper.prop( 'label' ) ).toEqual( 'Select Status' );
	} );
} );

describe( 'EditorStatusSelect()', () => {
	it( 'is expected to fail because of missing required prop', () => {
		render( <EditorStatusSelect /> );
		expect( console ).toHaveErrored();
	} );
	it( 'matches snapshot with default props', () => {
		const wrapper = render(
			<EditorStatusSelect
				statusType={ statusModel.STATUS_TYPE_REGISTRATION }
			/>
		);
		expect( wrapper ).toMatchSnapshot();
	} );
} );
