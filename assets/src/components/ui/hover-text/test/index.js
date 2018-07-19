import { shallow } from 'enzyme';
import { HoverText } from "../";


describe( 'HoverText', () => {
	it( 'renders nothing if hoverText not supplied', () => {
		const wrapper = shallow( <HoverText /> );
		expect( wrapper.find( '.ee-hover-text' ) ).toHaveLength( 0 );
	} );
	it( 'renders default when hoverText supplied', () => {
		const wrapper = shallow( <HoverText hoverText={ 'click-this' } /> );
		expect( wrapper ).toHaveLength( 1 );
		const hover = wrapper.find( '.ee-hover-text' );
		expect( hover ).toHaveLength( 1 );
		expect( hover.props().id ).toEqual( 'undefined-undefined-hover-text' );
		expect( hover.props().className ).toEqual(
			'undefined-undefined-hover-text ee-hover-text-position-top-right ee-undefined ee-hover-text'
		);
		const text = wrapper.find( '.ee-hover-text-notice' );
		expect( text ).toHaveLength( 1 );
		expect( text.text() ).toEqual( 'click-this' );
	} );
	it( 'renders correctly when all props supplied', () => {
		const wrapper = shallow(
			<HoverText
				hoverText={ 'click-this' }
				htmlId={ 'test-id' }
				htmlClass={ 'test-class' }
				description={ 'what-to-do' }
				dashicon={ 'yes' }
			/>
		);
		expect( wrapper ).toHaveLength( 1 );
		const hover = wrapper.find( '.ee-hover-text' );
		expect( hover ).toHaveLength( 1 );
		expect( hover.props().id ).toEqual( 'test-id-what-to-do-hover-text' );
		expect( hover.props().className ).toEqual(
			'test-class-what-to-do-hover-text ee-hover-text-position-top-right ee-what-to-do ee-hover-text'
		);
	} );
} );

// assets/src/components/ui/hover-text/test/index.js
