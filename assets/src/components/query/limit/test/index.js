/**
 * External dependencies
 */
import TestUtils from 'react-dom/test-utils';
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { QueryLimit } from '../';

describe( 'QueryLimit', () => {
	/**
	 * Needed because `TestUtils.renderIntoDocument` returns null for functional
	 * components.
	 */
	class TestWrapper extends Component {
		render() {
			return <QueryLimit { ...this.props } />;
		}
	}

	const getWrapper = ( props = {} ) => TestUtils.renderIntoDocument(
		<TestWrapper { ...props } />
	);
	describe( 'QueryLimit with no optional parameters passed', () => {
		it( 'should have default values', () => {
			const onChange = jest.fn();
			const wrapper = getWrapper( { onLimitChange: onChange } );
			const inputWrapper = TestUtils.findRenderedDOMComponentWithClass(
				wrapper,
				'components-range-control__number'
			);
			const label = TestUtils.findRenderedDOMComponentWithTag(
				wrapper,
				'label'
			);
			expect( inputWrapper.value ).toBe( '10' );
			expect( inputWrapper.min ).toBe( '1' );
			expect( inputWrapper.max ).toBe( '1000' );
			expect( label.textContent ).toEqual( 'Limit' );

			//test OnChange
			TestUtils.Simulate.change(
				inputWrapper,
				{
					target: {
						value: '5',
						checkValidity() {
							return true;
						},
					},
				}
			);
			expect( onChange ).toHaveBeenCalledWith( 5 );
		} );
	} );
	describe( 'QueryLimit with all parameters passed', () => {
		it( 'should not have default values', () => {
			const onChange = jest.fn();
			const wrapper = getWrapper( {
				limit: 25,
				label: 'No Limit',
				min: 10,
				max: 50,
				onLimitChange: onChange,
			} );
			// test range input
			const inputWrapper = TestUtils.findRenderedDOMComponentWithClass(
				wrapper,
				'components-range-control__number'
			);
			const label = TestUtils.findRenderedDOMComponentWithTag(
				wrapper,
				'label'
			);
			expect( inputWrapper.value ).toBe( '25' );
			expect( inputWrapper.min ).toBe( '10' );
			expect( inputWrapper.max ).toBe( '50' );
			// and label
			expect( label.textContent ).toEqual( 'No Limit' );
			// test onChange
			//test OnChange
			TestUtils.Simulate.change(
				inputWrapper,
				{
					target: {
						value: '30',
						checkValidity() {
							return true;
						},
					},
				}
			);
			expect( onChange ).toHaveBeenCalledWith( 30 );
		} );
	} );
} );
