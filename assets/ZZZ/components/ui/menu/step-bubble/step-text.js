/**
 * External imports
 */
import PropTypes from 'prop-types';
import { pure } from '@wordpress/compose';


export const StepText = ( { content } ) => {
	return <span className="ee-step-bubble-step-text">
		{ content }
	</span>;
};

StepText.propTypes = { content: PropTypes.string.isRequired };

export default pure( StepText );
