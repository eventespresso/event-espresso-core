/**
 * External dependencies
 */
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import { default as TermSelectControl } from '../';

describe( 'TermSelectControl with no options provided', () => {
	it( 'should return nothing', () => {
		const wrapper = mount( <TermSelectControl /> );
		expect( wrapper.instance() ).toBeNull();
	} );
} );

describe( 'TermSelectControl with empty options provided', () => {
	it( 'should return nothing', () => {
		const terms = [];
		const wrapper = mount( <TermSelectControl terms={ terms } /> );
		expect( wrapper.instance() ).toBeNull();
	} );
} );

describe( 'TermSelectControl with no selected Term', () => {
	it( 'should have default option added and selected', () => {
		// set up props
		const selectedTerm = '';
		const terms = [
			{
				slug: 'one',
				name: 'One',
			},
			{
				slug: 'two',
				name: 'Two',
			},
			{
				slug: 'three',
				name: 'Three',
			},
		];
		const label = 'Select one to three';
		const onChange = jest.fn();

		const wrapper = mount(
			<TermSelectControl
				selectedTerm={ selectedTerm }
				terms={ terms }
				label={ label }
				onChange={ onChange }
			/>
		);
		// test select input
		const termSelect = wrapper.find( 'select' );
		expect( termSelect.props().value ).toBe( '' );
		// and options
		const termSelectOptions = wrapper.find( 'option' );
		expect( termSelectOptions ).toHaveLength( terms.length + 1 );
		expect( termSelectOptions.at( 0 ).props().value ).toBe( '' );
		expect( termSelectOptions.at( 0 ).text() ).toEqual(
			'Please make a selection'
		);
		expect( termSelectOptions.at( 1 ).props().value ).toBe( 'one' );
		expect( termSelectOptions.at( 2 ).props().value ).toBe( 'two' );
		expect( termSelectOptions.at( 3 ).props().value ).toBe( 'three' );
		// and label
		const selectLabel = wrapper.find( 'label' );
		expect( selectLabel.text() ).toEqual( 'Select one to three' );
		// test onChange
		termSelect.simulate( 'change', { target: { value: 'two' } } );
		expect( onChange ).toHaveBeenCalledWith( 'two' );
	} );
} );

describe( 'TermSelectControl with previously selected Term', () => {
	it( 'should have that term selected', () => {
		// set up props
		const selectedTerm = 'two';
		const terms = [
			{
				slug: 'one',
				name: 'One',
			},
			{
				slug: 'two',
				name: 'Two',
			},
			{
				slug: 'three',
				name: 'Three',
			},
		];
		const label = 'Select one to three';
		const onChange = jest.fn();

		const wrapper = mount(
			<TermSelectControl
				selectedTerm={ selectedTerm }
				terms={ terms }
				label={ label }
				onChange={ onChange }
			/>
		);
		// test select input
		const termSelect = wrapper.find( 'select' );
		expect( termSelect.props().value ).toBe( 'two' );
	} );
} );
