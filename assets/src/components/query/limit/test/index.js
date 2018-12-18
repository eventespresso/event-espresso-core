/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import { QueryLimit } from '../';

describe( 'QueryLimit with no optional parameters passed', () => {
	it( 'should have default values', () => {
		const onChange = jest.fn();
		const rendered = TestRenderer.create( <QueryLimit onLimitChange={ onChange } /> );
		const input = rendered.root.findAllByType( 'input' )[ 0 ];
		const label = rendered.root.findByType( 'label' );
		expect( input.props.value ).toBe( 10 );
		expect( input.props.min ).toBe( 1 );
		expect( input.props.max ).toBe( 1000 );
		expect( label.props.children ).toEqual( 'Limit' );

		//test OnChange
		input.props.onChange( { target: { value: '5' } } );
		expect( onChange ).toHaveBeenCalledWith( 5 );
	} );
} );

describe( 'QueryLimit with all parameters passed', () => {
	it( 'should not have default values', () => {
		const onChange = jest.fn();
		const rendered = TestRenderer.create(
			<QueryLimit
				limit={ 25 }
				label={ 'No Limit' }
				min={ 10 }
				max={ 50 }
				onLimitChange={ onChange }
			/>,
		);
		// test range input
		const input = rendered.root.findAllByType( 'input' )[ 0 ];
		expect( input.props.value ).toBe( 25 );
		expect( input.props.min ).toBe( 10 );
		expect( input.props.max ).toBe( 50 );
		// and label
		const label = rendered.root.findByType( 'label' );
		expect( label.props.children ).toEqual( 'No Limit' );
		// test onChange
		input.props.onChange( { target: { value: '30' } } );
		expect( onChange ).toHaveBeenCalledWith( 30 );
	} );
} );
