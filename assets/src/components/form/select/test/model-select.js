import { shallow } from 'enzyme';
import { ModelSelect } from '../model-select';

const optionsEntityMap = {
	default: {
		value: 'EVT_ID',
		label: 'EVT_name',
	},
};
const simulatedResponse = [
	{ EVT_ID: 1, EVT_name: 'Event A' },
	{ EVT_ID: 2, EVT_name: 'Event B' },
];

describe( 'ModelSelect Snapshot with default options (with required modelName)',
	() => {
		it( 'should render and match snapshot', () => {
			const wrapper = shallow(
				<ModelSelect modelName={ 'event' } />
			);
			expect( wrapper ).toMatchSnapshot();
		} );
	},
);

describe( 'ModelSelect props check', () => {
	it( 'should render and have passed in props match expectation', () => {
		const wrapper = shallow(
			<ModelSelect
				modelName={ 'event' }
				modelEntities={ simulatedResponse }
				optionsEntityMap={ optionsEntityMap }
				selectConfiguration={ {
					isClearable: false,
					isLoading: false,
				} }
			/>,
		);
		const selectWrapper = wrapper.childAt( 0 );
		expect( selectWrapper.prop( 'options' ) ).toEqual(
			[
				{ label: 'Event A', value: 1 },
				{ label: 'Event B', value: 2 },
			],
		);
		expect( selectWrapper.prop( 'isClearable' ) ).toEqual( false );
		expect( selectWrapper.prop( 'isLoading' ) ).toEqual( false );
		expect( selectWrapper.prop( 'placeholder' ) ).toEqual( 'Select...' );
	} );
	it( 'should render a label when selectLabel is provided', () => {
		const wrapper = shallow(
			<ModelSelect
				modelName={ 'event' }
				modelEntities={ simulatedResponse }
				optionsEntityMap={ optionsEntityMap }
				label={ 'Label for Select' }
			/>,
		);
		expect( wrapper.childAt( 0 ).text() ).toEqual( 'Label for Select' );
	} );
} );

// location: assets/src/components/form/select/test/model-select.js
