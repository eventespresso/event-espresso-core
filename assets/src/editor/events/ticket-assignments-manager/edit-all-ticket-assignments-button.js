/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useMemo } from '@wordpress/element';
import { EspressoButton } from '@eventespresso/components';
import { useOpenEditor } from '@eventespresso/editor-hocs';
import { useEventEditorTickets } from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import TicketAssignmentsManagerModal
	from './ticket-assignments-manager-modal';
import useTicketAssignmentsEditorId
	from './use-ticket-assignments-editor-id';

/**
 * DatesListFilterBar
 * filters for controlling the display of a list of Event Dates
 *
 * @param {BaseEntity[]} eventDates
 * @return {Object} EditorDatesListView with added DateListFilters
 */
const EditAllTicketAssignmentsButton = ( { eventDates } ) => {
	const { tickets } = useEventEditorTickets();
	const editorId = useTicketAssignmentsEditorId(
		null,
		null,
		eventDates,
		tickets,
	);
	const openEditor = useOpenEditor( editorId );
	return useMemo( () => (
		<>
			<EspressoButton
				icon={ 'tickets-alt' }
				buttonText={ __(
					'Ticket Assignments',
					'event_espresso'
				) }
				onClick={ openEditor }
				disabled={ ! ( Array.isArray( tickets ) && tickets.length ) }
			/>
			<TicketAssignmentsManagerModal
				editorId={ editorId }
				allDateEntities={ eventDates }
				allTicketEntities={ tickets }
				editorTitle={ __(
					'Ticket Assignments for All Event Dates',
					' event_espresso'
				) }
			/>
		</>
	), [ editorId, eventDates, tickets ] );
};

EditAllTicketAssignmentsButton.propTypes = {
	eventDates: PropTypes.arrayOf( PropTypes.object ).isRequired,
};

export default EditAllTicketAssignmentsButton;
