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
	} );
	it( 'renders correctly when all props supplied', () => {
		const wrapper = shallow(
			<HoverText
				hoverText={ 'click-this' }
				htmlId={ 'test-id' }
				htmlClass={ 'test-class' }
				description={ 'what-to-do' }
				dashicon={ 'yes' }
			>
				<div>CLICK ME</div>
			</HoverText>
		);
		expect( wrapper ).toHaveLength( 1 );
		const hover = wrapper.find( '.ee-hover-text' );
		expect( hover ).toHaveLength( 1 );
		expect( hover.props().id ).toEqual( 'test-id-what-to-do-hover-text' );
		expect( hover.props().className ).toEqual(
			'test-class-what-to-do-hover-text ee-hover-text-position-top-right ee-what-to-do ee-hover-text'
		);
		const text = wrapper.find( '.ee-hover-text-text' );
		expect( text ).toHaveLength( 1 );
		expect( text.text() ).toEqual( 'click-this' );
		const content = wrapper.find( '.ee-hover-text-content' );
		expect( content ).toHaveLength( 1 );
		expect( content.text() ).toEqual( 'CLICK ME' );
	} );
} );

// assets/src/components/ui/hover-text/test/index.js
