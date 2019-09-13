/**
 * External imports
 */
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import { assignTicketEntity, removeTicketEntity }
	from '../utils/assign-remove-tickets';

/**
 * determines what callback to use when modifying a ticket assignment
 *
 * @function
 * @param {Function} setAssignedState
 * @param {boolean} currentlyAssigned
 * @return {Function} ticket cell button action
 */
const useAssignmentAction = ( setAssignedState, currentlyAssigned ) => {
	/**
	 * @function
	 * @return {Function} add ticket action
	 */
	const assignTicket = useCallback(
		( dateId, ticketId ) => {
			setAssignedState( ( prevState ) => {
				return assignTicketEntity(
					cloneDeep( prevState ),
					dateId,
					ticketId
				);
			} );
		},
		[]
	);

	/**
	 * @function
	 * @return {Function} remove ticket action
	 */
	const removeTicket = useCallback(
		( dateId, ticketId ) => {
			setAssignedState( ( prevState ) => {
				return removeTicketEntity(
					cloneDeep( prevState ),
					dateId,
					ticketId
				);
			} );
		},
		[]
	);

	return currentlyAssigned ? removeTicket : assignTicket;
};

useAssignmentAction.propTypes = {
	setAssignedState: PropTypes.func.isRequired,
	currentlyAssigned: PropTypes.bool.isRequired,
};

export default useAssignmentAction;
