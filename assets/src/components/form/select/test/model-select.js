import { shallow } from 'enzyme';
import { ModelSelect } from '../model-select';

const simulatedResponse = [
	{ EVT_ID: 1, EVT_name: 'Event A' },
	{ EVT_ID: 2, EVT_name: 'Event B' },
];

describe( 'ModelSelect Snapshot with default options (with required modelName)',
	() => {
		it( 'should render and match snapshot', () => {
			const wrapper = shallow( <ModelSelect modelName={ 'events' } /> );
			expect( wrapper ).toMatchSnapshot();
		} );
	},
);

describe( 'ModelSelect props check', () => {
	it( 'should render and have passed in props match expectation', () => {
		const wrapper = shallow(
			<ModelSelect
				modelName={ 'events' }
				modelEntities={ simulatedResponse }
				selectConfiguration={ {
					isClearable: false,
					isLoading: false,
				} }
			/>,
		);
		expect( wrapper.prop( 'options' ) ).toEqual(
			[
				{ label: 'Event A', value: 1 },
				{ label: 'Event B', value: 2 },
			],
		);
		expect( wrapper.prop( 'isClearable' ) ).toEqual( false );
		expect( wrapper.prop( 'isLoading' ) ).toEqual( false );
		expect( wrapper.prop( 'placeholder' ) ).toEqual( 'Select...' );
	} );
} );
