/**
 * External imports
 */
import { IconMenuItem } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import { useTicketsForEventDates } from '../../../../hooks';

/**
 * @function
 * @param {Object} props
 * @return {Function} menu item for opening the Ticket Assignments Manager
 */
const AssignTicketsMenuItem = ( {
	dateEntity,
	toggleTicketAssignments,
} ) => {
	// get tickets that are assigned to this event date
	const {
		ticketEntities,
		ticketEntitiesLoaded,
	} = useTicketsForEventDates( [ dateEntity ] );
	const tickets = Array.isArray( ticketEntities ) ? ticketEntities : [];
	const tooltip = tickets.length < 1 ?
		__(
			'warning! no assigned tickets - click to fix',
			'event_espresso'
		) :
		__( 'assign tickets', 'event_espresso' );
	return (
		<IconMenuItem
			index={ 2 }
			tooltip={ tooltip }
			id={ `view-tickets-date-${ dateEntity.id }` }
			htmlClass="view-tickets-date"
			dashicon="tickets-alt"
			onClick={ toggleTicketAssignments }
			itemCount={ ticketEntitiesLoaded ? tickets.length : null }
		/>
	);
};

export default ifValidDateEntity( AssignTicketsMenuItem );

/*
(
		( { dateEntity } ) => ( {
			title: sprintf(
				_x(
					'Ticket Assignments for: %1$s',
					'Ticket Assignments for: Date & date name',
					'event_espresso'
				),
				`${ dateEntity.name } (${
					dateEntity.start.toFormat( 'ddd MMM DD, YYYY' )
				})`
			),
			closeButtonLabel: null,
		} )
	)
*/

