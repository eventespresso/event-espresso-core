/**
 * External imports
 */
import PropTypes from 'prop-types';
import { IconButton } from '@wordpress/components';
import { ENTER } from '@wordpress/keycodes';

import { useAssignmentAction } from './hooks';
import {
	determineCurrentAssignment,
	getIconAndBgColor,
	isCurrentlyAssigned,
} from './utils';
import cancelClickEvent from '../../helpers/cancel-click-event';

/**
 * @function
 * @param {number|string} dateId
 * @param {number|string} ticketId
 * @param {BaseEntity[]} dateTicketEntities
 * @param {Object} assignedState - { assigned, removed }
 * @param {Function} setAssignedState
 * @return {Function} callback for rendering table cell
 */
const ToggleTicketAssignmentButton = ( {
	dateId,
	ticketId,
	dateTicketEntities,
	assignedState,
	setAssignedState,
} ) => {
	const {
		hasTicket,
		isAssigned,
		isRemoved,
	} = determineCurrentAssignment( {
		dateId,
		ticketId,
		dateTicketEntities,
		assignedState,
	} );
	const { icon, bgColor } = getIconAndBgColor( {
		hasTicket,
		isAssigned,
		isRemoved,
	} );
	const currentlyAssigned = isCurrentlyAssigned(
		hasTicket,
		isAssigned,
		isRemoved
	);
	const action = useAssignmentAction( setAssignedState, currentlyAssigned );
	return (
		<IconButton
			icon={ icon }
			className={ bgColor }
			size={ 45 }
			onClick={ ( click ) => {
				cancelClickEvent( click, 'ToggleTicketAssignmentButton' );
				action( dateId, ticketId );
			} }
			onKeyDown={ ( keyPress ) => {
				if ( keyPress.keyCode === ENTER ) {
					cancelClickEvent( keyPress, 'ToggleTicketAssignmentButton' );
					action( dateId, ticketId );
				}
			} }
		/>
	);
};

ToggleTicketAssignmentButton.propTypes = {
	dateId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	ticketId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	dateTicketEntities: PropTypes.array.isRequired,
	assignedState: PropTypes.shape( {
		assigned: PropTypes.object,
		removed: PropTypes.object,
	} ).isRequired,
	setAssignedState: PropTypes.func.isRequired,
};

export default ToggleTicketAssignmentButton;
