import EditorSelect from '../editor-select';
import { shallow } from 'enzyme';

describe( '<EditorSelect />', () => {
	it( 'matches snapshot with no props provided', () => {
		const wrapper = shallow(
			<EditorSelect />
		);
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches snapshot with all props provided but no child component', () => {
		const wrapper = shallow(
			<EditorSelect
				label={ 'not a default label' }
				id={ 'i-am-unique' }
				className={ 'not-so-unique' }
				help={ 'try not to fall down stairs!' }
			/>
		);
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'matches snapshot with only child component provided', () => {
		const wrapper = shallow(
			<EditorSelect>
				<p>{ 'child component' }</p>
			</EditorSelect>
		);
		expect( wrapper ).toMatchSnapshot();
	} );
} );

// location: assets/src/components/form/select/model-selects/test/editor-select.js
