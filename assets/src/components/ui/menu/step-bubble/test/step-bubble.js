/**
 * External imports
 */
import { shallow } from 'enzyme';

/**
 * Internal imports
 */
import { StepBubble } from '../step-bubble';
import StepText from '../step-text';

describe( 'StepBubble', () => {
	const props = {
		label: 'foo',
		slug: 'bar',
	};
	it( 'generates expected shape for default props', () => {
		const wrapper = shallow( <StepBubble { ...props } /> );
		expect( wrapper ).toMatchSnapshot();
	} );
	it( 'is clickable when canClick prop is true', () => {
		const testProps = {
			...props,
			bubbleClick: jest.fn(),
		};
		const wrapper = shallow( <StepBubble { ...testProps } /> );
		const clickEl = wrapper.find( '.ee-step-bubble-item' );
		expect( clickEl.length ).toBe( 1 );
		clickEl.first().simulate( 'click' );
		expect( testProps.bubbleClick ).toHaveBeenCalledTimes( 1 );
	} );
	it( 'is not clickable when canClick prop is false', () => {
		const testProps = {
			...props,
			canClick: false,
			bubbleClick: jest.fn(),
		};
		const wrapper = shallow( <StepBubble { ...testProps } /> );
		const clickEl = wrapper.find( '.ee-step-bubble-item' );
		expect( clickEl.length ).toBe( 1 );
		clickEl.first().simulate( 'click' );
		expect( testProps.bubbleClick ).not.toHaveBeenCalled();
	} );
	it( 'has expected label for StepText child', () => {
		const wrapper = shallow( <StepBubble { ...props } /> );
		expect( wrapper.find( StepText ).first().props().content )
			.toBe( props.label );
	} );
} );