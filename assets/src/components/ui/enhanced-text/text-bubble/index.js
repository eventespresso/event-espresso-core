/**
 * Internal imports
 */
import './style.css';

/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * A component that wraps provided content (text) in a styled span for a
 * bubble emphasis effect.
 * @param string content
 * @return {*}
 * @constructor
 */
const TextBubble = ( { content } ) => {
	return (
		content === '' ?
			null :
		<span className={ 'ee-text-bubble' }>
			{ content }
		</span>
	);
};

TextBubble.propTypes = { content: PropTypes.string };
TextBubble.defaultProps = { content: '' };

export default TextBubble;
