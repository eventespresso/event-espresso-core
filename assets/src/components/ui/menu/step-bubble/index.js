/**
 * Internal imports
 */
import './style.css';
import StepBubble from './step-bubble';

/**
 * External imports
 */
import { isArray } from 'lodash';
import PropTypes from 'prop-types';
import { sprintf } from '@eventespresso/i18n';

/**
 * A helper function for asserting a StepConfiguration object is valid.
 *
 * @param {string} slug
 * @param {string} label
 * @param {*} value
 */
const assertStepConfiguration = ( { slug, label, value } ) => {
	if ( typeof slug !== 'string' ) {
		throw new TypeError(
			sprintf(
				'Step bubble configuration object requires a string for the ' +
				'%1$s argument. %2$s was provided',
				'slug',
				slug
			)
		);
	}
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

const StepBubbleMenu = ( {
	bubbleClick,
	bubbleData,
	clickable,
	activeBubble
} ) => {
	return (
		<div className="ee-step-bubble-menu-container">
			<div className="step-bubbles-container" role="menu" tabIndex={ 1 }>
			{
				bubbleData.map( ( bubble ) => {
					assertStepConfiguration( bubble );
					const { slug, label, value } = bubble;
					const canClick = clickable.indexOf( bubble.slug ) > -1;
					return (
						<StepBubble
							key={ slug }
							label={ label }
							slug={ slug }
							stepValue={ value }
							isActive={ activeBubble === slug }
							canClick={ canClick }
							bubbleClick={ bubbleClick }
						/>
					);
				} )
			}
			</div>
		</div>
	);
};

StepBubbleMenu.propTypes = {
	bubbleClick: PropTypes.func,
	bubbleData: PropTypes.array,
	clickable: PropTypes.array,
	activeBubble: PropTypes.string,
};

StepBubbleMenu.defaultProps = {
	bubbleClick: () => null,
	bubbleData: [],
	clickable: [],
	activeBubble: '',
};

export default StepBubbleMenu;
