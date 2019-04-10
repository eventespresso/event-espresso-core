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
					let slug = bubble.slug || bubble.label;
					let canClick = clickable.indexOf( bubble.slug ) > -1;
					return (
						<StepBubble
							key={ bubble.label }
							label={ bubble.label }
							slug={ slug }
							stepValue={ bubble.value }
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
