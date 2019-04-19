/**
 * External imports
 */
import { shallow } from 'enzyme';

import StepBubbleMenu from '../index';
import StepBubble from '../step-bubble';

describe( 'StepBubbleMenu', () => {
	it( 'renders as expected with default props', () => {
		const wrapper = shallow( <StepBubbleMenu /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'renders the expected number of children StepBubble components ' +
		'for the given data', () => {
		const testData = {
			foo: { label: 'foo label', value: 1  },
			bar: { label: 'bar label', value: 2 },
		};
		const wrapper = shallow( <StepBubbleMenu bubbleData={ testData } /> );
		expect( wrapper.find( StepBubble ) ).toHaveLength( 2 );
	} );
	it( 'renders expected prop for slug given the provided data', () => {
		const testData = {
			someData: {
				label: 'bar',
				value: 1
			}
		};
		const wrapper = shallow( <StepBubbleMenu bubbleData={ testData } /> );
		expect( wrapper.find( StepBubble ).first().props().slug )
			.toBe( 'someData' );
	} );
	describe( 'renders expected props for given incoming props', () => {
		const bubbleClick = jest.fn();
		const props = {
			bubbleData: {
				foo: {
					label: 'foo label',
					value: 42,
					action: bubbleClick,
					clickable: false,
					active: true
				}
			},
		};
		const wrapper = shallow( <StepBubbleMenu { ...props } /> );
		const expectedProps = [
			[ 'label', 'foo label' ],
			[ 'slug', 'foo' ],
			[ 'stepValue', 42 ],
			[ 'isActive', true ],
			[ 'clickable', false ],
			[ 'action', bubbleClick ],
		];
		const child = wrapper.find( StepBubble ).first();
		const childProps = child.props();
		expectedProps.forEach( ( [
			prop,
			expectedValue,
		] ) => {
			it( `has expected value for the ${ prop } prop`, () => {
				expect( childProps[ prop ] ).toEqual( expectedValue );
			} );
		} );
		expect( child.key() ).toEqual( 'foo' );
	} );
} );