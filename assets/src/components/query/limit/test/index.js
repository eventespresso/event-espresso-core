/**
 * External dependencies
 */
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import { QueryLimit } from '../';

describe( 'QueryLimit with no optional parameters passed', () => {
	it( 'should have default values', () => {
		const onChange = jest.fn();
		const wrapper = mount( <QueryLimit onLimitChange={ onChange } /> );
		// test range input
		const limit = wrapper.find( 'input[type="range"]' );
		expect( limit.props().value ).toBe( 10 );
		expect( limit.props().min ).toBe( 1 );
		expect( limit.props().max ).toBe( 1000 );
		// and label
		const label = wrapper.find( 'label' );
		expect( label.text() ).toEqual( 'Limit' );
		// test onChange
		limit.simulate( 'change', { target: { value: '5' } } );
		expect( onChange ).toHaveBeenCalledWith( 5 );
	} );
} );

describe( 'QueryLimit with all parameters passed', () => {
	it( 'should not have default values', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<QueryLimit
				limit={ 25 }
				label={ 'No Limit' }
				min={ 10 }
				max={ 50 }
				onLimitChange={ onChange }
			/>,
		);
		// test range input
		const limit = wrapper.find( 'input[type="range"]' );
		expect( limit.props().value ).toBe( 25 );
		expect( limit.props().min ).toBe( 10 );
		expect( limit.props().max ).toBe( 50 );
		// and label
		const label = wrapper.find( 'label' );
		expect( label.text() ).toEqual( 'No Limit' );
		// test onChange
		limit.simulate( 'change', { target: { value: '30' } } );
		expect( onChange ).toHaveBeenCalledWith( 30 );
	} );
} );

describe( 'QueryLimit with no onLimitChange callback provided', () => {
	it( 'should return nothing', () => {
		const wrapper = mount( <QueryLimit /> );
		expect( wrapper.instance() ).toBe( null );
	} );
} );
