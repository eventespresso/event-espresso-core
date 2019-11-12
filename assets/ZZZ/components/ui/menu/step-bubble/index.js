/**
 * Internal imports
 */
import './style.css';
import StepBubble from './step-bubble';

/**
 * External imports
 */
import PropTypes from 'prop-types';
import { sprintf } from '@eventespresso/i18n';

/**
 * A helper function for asserting a StepConfiguration object is valid.
 *
 * @param {string} label
 * @param {*} value
 */
const assertStepConfiguration = ( { label, value } ) => {
	if ( typeof label !== 'string' ) {
		throw new TypeError(
			sprintf(
				'Step bubble configuration object requires a string for the ' +
				'$1$s. %2$s was provided',
				'label',
				label
			)
		)
	}
	if ( value === undefined ) {
		throw new TypeError(
			sprintf(
				'Step bubble configuration object requires a %1$s property, ' +
				'%2$s was provided.',
				'value',
				value
			)
		);
	}
};

const getStepBubbles = ( bubbleData ) => {
	const stepBubbles = [];
	for ( const slug in bubbleData ) {
		assertStepConfiguration( bubbleData[ slug ] );
		const {
			label,
			value,
			action,
			clickable,
			active,
		} = bubbleData[ slug ];
		stepBubbles.push(
			<StepBubble
				key={ slug }
				label={ label }
				slug={ slug }
				action={ action }
				stepValue={ value }
				clickable={ clickable }
				isActive={ active }
			/>
		);
	}
	return stepBubbles;
};

const StepBubbleMenu = ( { bubbleData } ) => {
	return (
		<div className="ee-step-bubble-menu-container">
			<div className="step-bubbles-container" role="menu" tabIndex={ 1 }>
			{ getStepBubbles( bubbleData ) }
			</div>
		</div>
	);
};

StepBubbleMenu.propTypes = { bubbleData: PropTypes.object };
StepBubbleMenu.defaultProps = { bubbleData: {} };

export default StepBubbleMenu;
