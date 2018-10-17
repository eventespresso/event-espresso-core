import PropTypes from 'prop-types';

/**
 * @function InputHelpText
 * @param {string} helpTextID
 * @param {string} helpText
 * @return {Object} rendered help text
 */
export const InputHelpText = ( { helpTextID, helpText } ) => {
	return helpText ? (
		<p id={ helpTextID } className="espresso-input-help-text" >
			{ helpText }
		</p>
	) : null;
};

InputHelpText.propTypes = {
	helpTextID: PropTypes.string.isRequired,
	helpText: PropTypes.string,
};
