/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * icon and color class representing current ticket date assignment
 *
 * @function
 * @param {boolean} hasTicket
 * @param {boolean} isAssigned
 * @param {boolean} isRemoved
 * @return {Object} JSON object with icon and bgColor values
 */
const getIconAndBgColor = ( {
	hasTicket,
	isAssigned,
	isRemoved,
} ) => {
	let icon = '';
	let bgColor = 'ee-tam-ticket-relation-button';
	if ( hasTicket ) {
		if ( isRemoved ) {
			icon = 'no';
			bgColor += ' ee-tam-remove-ticket-relation';
		} else {
			icon = 'tickets-alt';
			bgColor += ' ee-tam-has-ticket-relation';
		}
	} else if ( isAssigned ) {
		icon = 'tickets-alt';
		bgColor += ' ee-tam-add-ticket-relation';
	} else {
		icon = 'minus';
		bgColor += ' ee-tam-no-ticket-relation';
	}
	return { icon, bgColor };
};

getIconAndBgColor.propTypes = {
	hasTicket: PropTypes.bool.isRequired,
	isAssigned: PropTypes.bool.isRequired,
	isRemoved: PropTypes.bool.isRequired,
};

export default getIconAndBgColor;
