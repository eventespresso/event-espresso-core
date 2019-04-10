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
		const testData = [
			{ label: 'foo', value: 1  },
			{ label: 'bar', value: 2 },
		];
		const wrapper = shallow( <StepBubbleMenu bubbleData={ testData } /> );
		expect( wrapper.find( StepBubble ) ).toHaveLength( 2 );
	} );
	it( 'renders expected prop for slug given the provided data when ' +
		'slug is in the data', () => {
		const testData = [ { slug: 'someData', label: 'bar', value: 1 } ];
		const wrapper = shallow( <StepBubbleMenu bubbleData={ testData } /> );
		expect( wrapper.find( StepBubble ).first().props().slug )
			.toBe( 'someData' );
	} );
	it( 'renders expected prop for slug given the provided data when ' +
		'slug is not in the data', () => {
		const testData = [ { label: 'foo', value: 2 } ];
		const wrapper = shallow( <StepBubbleMenu bubbleData={ testData } /> );
		expect( wrapper.find( StepBubble ).first().props().slug )
			.toBe( 'foo' );
	} );
	it( 'renders expected props for given incoming props', () => {
		const bubbleClick = jest.fn();
		const props = {
			bubbleClick,
			bubbleData: [ { label: 'foo', value: 42 } ],
			clickable: [ 'foo' ],
			activeBubble: 'foo',
		};
		const wrapper = shallow( <StepBubbleMenu { ...props } /> );
		const expectedProps = [
			[ 'label', 'foo' ],
			[ 'slug', 'foo' ],
			[ 'stepValue', 42 ],
			[ 'isActive', true ],
			[ 'canClick', false ],
			[ 'bubbleClick', bubbleClick ],
		];
		const child = wrapper.find( StepBubble ).first();
		const childProps = child.props();
		expectedProps.forEach( ( [
			prop,
			expectedValue,
		] ) => {
			expect( childProps[ prop ] ).toEqual( expectedValue );
		} );
		expect( child.key() ).toEqual( 'foo' );
	} );
} );