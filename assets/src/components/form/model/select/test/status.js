import StatusSelect, { EditorStatusSelect } from '../status';
import { shallow, render } from 'enzyme';
import { QUERY_ORDER_ASC } from 'assets/src/data/model/base';

jest.mock( '../../base/model-select', () => () => <span>StatusSelect</span> );

describe( 'StatusSelect()', () => {
	const expectedDefaultQueryData = {
		limit: 25,
		orderBy: 'statusCode',
		order: QUERY_ORDER_ASC,
	};
	it( 'matches snapshot with default props plus provided statusType', () => {
		const wrapper = shallow(
			<StatusSelect />
		);
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches expected default props plus provided statusType', () => {
		const wrapper = shallow(
			<StatusSelect />
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
	it( 'matches snapshot with default props', () => {
		const wrapper = render(
			<EditorStatusSelect />
		);
		expect( wrapper ).toMatchSnapshot();
	} );
} );
