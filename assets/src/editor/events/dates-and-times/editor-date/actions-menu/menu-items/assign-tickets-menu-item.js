/**
 * External imports
 */
import { IconMenuItem } from '@eventespresso/components';
import { ifValidDateEntity, useOpenEditor } from '@eventespresso/editor-hocs';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import { useEventEditorTickets, useEventDateTickets } from '../../../../hooks';
import TicketAssignmentsManagerModal
	from '../../../../ticket-assignments-manager/ticket-assignments-manager-modal';
import useTicketAssignmentsEditorId
	from '../../../../ticket-assignments-manager/use-ticket-assignments-editor-id';

/**
 * @function
 * @param {Object} props
 * @return {Function} menu item for opening the Ticket Assignments Manager
 */
const AssignTicketsMenuItem = ( { dateEntity } ) => {
	// get tickets that are assigned to this event date
	const {
		tickets,
		ticketsLoaded,
	} = useEventDateTickets( dateEntity );
	const { tickets: allTickets } = useEventEditorTickets();
	const editorId = useTicketAssignmentsEditorId(
		dateEntity,
		null,
		[],
		allTickets,
	);
	const tooltip = tickets.length < 1 ?
		__(
			'warning! no assigned tickets - click to fix',
			'event_espresso'
		) :
		__( 'assign tickets', 'event_espresso' );
	return (
		<>
			<IconMenuItem
				index={ 2 }
				tooltip={ tooltip }
				id={ `view-tickets-date-${ dateEntity.id }` }
				htmlClass="view-tickets-date"
				dashicon="tickets-alt"
				onClick={ useOpenEditor( editorId ) }
				itemCount={ ticketsLoaded ? tickets.length : null }
				disabled={ ! ticketsLoaded }
			/>
			<TicketAssignmentsManagerModal
				editorId={ editorId }
				dateEntity={ dateEntity }
				allTicketEntities={ allTickets }
				editorTitle={ sprintf(
					_x(
						'Ticket Assignments for: %1$s',
						'Ticket Assignments for: date name & start date',
						'event_espresso'
					),
					`${ dateEntity.name } (${
						dateEntity.start.toFormat( 'ddd MMM DD, YYYY' )
					})`
				) }
				editorCloseButtonLabel={ __(
					'close ticket assignments manager',
					'event_espresso'
				) }
			/>
		</>
	);
};

export default ifValidDateEntity( AssignTicketsMenuItem );
