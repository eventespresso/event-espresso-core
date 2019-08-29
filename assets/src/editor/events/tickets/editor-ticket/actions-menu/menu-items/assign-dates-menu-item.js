/**
 * External imports
 */
import { EspressoIcon, IconMenuItem } from '@eventespresso/components';
import { ifValidTicketEntity, useOpenEditor } from '@eventespresso/editor-hocs';
import { __, _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { useEventEditorEventDates, useTicketEventDates } from '../../../../hooks';
import TicketAssignmentsManagerModal
	from '../../../../ticket-assignments-manager/ticket-assignments-manager-modal';
import useTicketAssignmentsEditorId
	from '../../../../ticket-assignments-manager/use-ticket-assignments-editor-id';

const AssignDatesMenuItem = ( { ticketEntity } ) => {
	const {
		eventDates,
		eventDatesLoaded,
	} = useTicketEventDates( ticketEntity );
	const { eventDates: allEventDates } = useEventEditorEventDates();
	const editorId = useTicketAssignmentsEditorId(
		null,
		ticketEntity,
		allEventDates,
		[],
	);
	return (
		<>
			<IconMenuItem
				index={ 3 }
				tooltip={
					eventDatesLoaded && ! eventDates.length ?
						__(
							'warning! no assigned ticket dates - click to fix',
							'event_espresso'
						) :
						__( 'assign ticket to event dates', 'event_espresso' )
				}
				id={ `assign-ticket-dates-ticket-${ ticketEntity.id }` }
				htmlClass={ 'assign-ticket-dates' }
				dashicon={ <EspressoIcon icon="calendar" /> }
				tooltipPosition="top right"
				onClick={ useOpenEditor( editorId ) }
				itemCount={ eventDatesLoaded ? eventDates.length : null }
			/>
			<TicketAssignmentsManagerModal
				editorId={ editorId }
				ticketEntity={ ticketEntity }
				allDateEntities={ allEventDates }
				editorTitle={ sprintf(
					_x(
						'Date Assignments for Ticket:  %1$s',
						'Date Assignments for Ticket:  Ticket name',
						'event_espresso'
					),
					ticketEntity.name
				) }
				editorCloseButtonLabel={ __(
					'close ticket assignments manager',
					'event_espresso'
				) }
			/>
		</>
	);
};

export default ifValidTicketEntity( AssignDatesMenuItem );
