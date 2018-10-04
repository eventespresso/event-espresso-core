import DatetimeSelect, { EditorDatetimeSelect } from '../datetime';
import { shallow, render } from 'enzyme';

jest.mock( '../../base/model-select', () => () => <span>DatetimeSelect</span> );

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
		expect( wrapper.prop( 'label' ) ).toEqual( 'Select Datetime' );
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

describe( 'EditorDatetimeSelect()', () => {
	it( 'matches snapshot with default props', () => {
		const wrapper = render( <EditorDatetimeSelect /> );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
