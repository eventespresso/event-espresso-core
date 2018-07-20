import { shallow, mount } from 'enzyme';
import { ToggleButton, ToggleButtonWithHoverText } from "../";


describe( 'ToggleButton', () => {
	it( 'renders nothing if toggleCallback not supplied', () => {
		const wrapper = shallow( <ToggleButton /> );
		expect( wrapper.find( '.ee-toggle-button' ) ).toHaveLength( 0 );
	} );
	it( 'renders default when toggleCallback supplied', () => {
		const mockFn = jest.fn();
		const wrapper = shallow( <ToggleButton toggleCallback={ mockFn } /> );
		expect( wrapper ).toHaveLength( 1 );
		const btn = wrapper.find( '.ee-toggle-button' );
		expect( btn ).toHaveLength( 1 );
		expect( btn.props().id ).toEqual( 'undefined-undefined' );
		expect( btn.props().className ).toEqual( 'undefined-undefined ee-undefined ee-toggle-button' );
		expect( btn.props().role ).toEqual( 'button' );
		expect( btn.props().tabIndex ).toEqual( 0 );
		// test callback
		btn.simulate( 'click' );
		expect( mockFn ).toHaveBeenCalled();
		const dashicon = wrapper.find( 'span' );
		expect( dashicon ).toHaveLength( 1 );
		expect( dashicon.props().className ).toEqual( 'dashicons dashicons-no' );
	} );
	it( 'renders correctly when all props supplied', () => {
		const mockFn = jest.fn();
		const wrapper = shallow(
			<ToggleButton
				htmlId={ 'test-id' }
				htmlClass={ 'test-class' }
				description={ 'toggles-something' }
				dashicon={ 'yes' }
				tabIndex={ 123 }
				toggleCallback={ mockFn }
			/>
		);
		expect( wrapper ).toHaveLength( 1 );
		const btn = wrapper.find( '.ee-toggle-button' );
		expect( btn ).toHaveLength( 1 );
		expect( btn.props().id ).toEqual( 'test-id-toggles-something' );
		expect( btn.props().className ).toEqual( 'test-class-toggles-something ee-toggles-something ee-toggle-button' );
		expect( btn.props().role ).toEqual( 'button' );
		expect( btn.props().tabIndex ).toEqual( 123 );
		// test callback
		btn.simulate( 'click' );
		expect( mockFn ).toHaveBeenCalled();
		const dashicon = wrapper.find( 'span' );
		expect( dashicon ).toHaveLength( 1 );
		expect( dashicon.props().className ).toEqual( 'dashicons dashicons-yes' );
	} );
} );


describe( 'ToggleButtonWithHoverText', () => {
	it( 'renders nothing if toggleCallback not supplied', () => {
		const wrapper = shallow( <ToggleButtonWithHoverText hoverText={ 'click-this' } /> );
		expect( wrapper.find( '.ee-toggle-button' ) ).toHaveLength( 0 );
	} );
	it( 'renders nothing if hoverText not supplied', () => {
		const mockFn = jest.fn();
		const wrapper = shallow( <ToggleButtonWithHoverText toggleCallback={ mockFn }/> );
		expect( wrapper.find( '.ee-toggle-button' ) ).toHaveLength( 0 );
	} );
	it( 'renders default when hoverText and toggleCallback supplied', () => {
		const mockFn = jest.fn();
		const wrapper = mount( <ToggleButtonWithHoverText hoverText={ 'click-this' } toggleCallback={ mockFn } /> );
		expect( wrapper ).toHaveLength( 1 );
		const hover = wrapper.find( '.ee-toggle-hover-text' );
		expect( hover ).toHaveLength( 1 );
		expect( hover.props().id ).toEqual( 'undefined-undefined-hover-text' );
		expect( hover.props().className ).toEqual(
			'ee-toggle-hover-text undefined-undefined-hover-text ee-hover-text-position-top-right ee-undefined ee-hover-text'
		);
		const btn = wrapper.find( '.ee-toggle-button' );
		expect( btn ).toHaveLength( 1 );
		expect( btn.props().id ).toEqual( 'undefined-undefined' );
		expect( btn.props().className ).toEqual( 'undefined-undefined ee-undefined ee-toggle-button' );
		expect( btn.props().role ).toEqual( 'button' );
		expect( btn.props().tabIndex ).toEqual( 0 );
		// test callback
		btn.simulate( 'click' );
		expect( mockFn ).toHaveBeenCalled();
		const dashicon = wrapper.find( '.dashicons' );
		expect( dashicon ).toHaveLength( 1 );
		expect( dashicon.props().className ).toEqual( 'dashicons dashicons-no' );
	} );
	it( 'renders correctly when all props supplied', () => {
		const mockFn = jest.fn();
		const wrapper = mount(
			<ToggleButtonWithHoverText
				hoverText={ 'click-this' }
				htmlId={ 'test-id' }
				htmlClass={ 'test-class' }
				description={ 'toggles-something' }
				dashicon={ 'yes' }
				tabIndex={ 123 }
				toggleCallback={ mockFn }
			/>
		);

		expect( wrapper ).toHaveLength( 1 );
		const hover = wrapper.find( '.ee-toggle-hover-text' );
		expect( hover ).toHaveLength( 1 );
		expect( hover.props().id ).toEqual( 'test-id-toggles-something-hover-text' );
		expect( hover.props().className ).toEqual(
			'ee-toggle-hover-text test-class-toggles-something-hover-text ee-hover-text-position-top-right ee-toggles-something ee-hover-text'
		);
		const btn = wrapper.find( '.ee-toggle-button' );
		expect( btn ).toHaveLength( 1 );
		expect( btn.props().id ).toEqual( 'test-id-toggles-something' );
		expect( btn.props().className ).toEqual( 'test-class-toggles-something ee-toggles-something ee-toggle-button' );
		expect( btn.props().role ).toEqual( 'button' );
		expect( btn.props().tabIndex ).toEqual( 123 );
		// test callback
		btn.simulate( 'click' );
		expect( mockFn ).toHaveBeenCalled();
		const dashicon = wrapper.find( '.dashicons' );
		expect( dashicon ).toHaveLength( 1 );
		expect( dashicon.props().className ).toEqual( 'dashicons dashicons-yes' );
	} );
} );

// assets/src/components/ui/toggle-button/test/index.js
