/**
 * External imports
 */
import { EspressoIcon, IconMenuItem } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import useTicketEventDates from '../../../../hooks/use-ticket-event-dates';

const AssignDatesMenuItem = ( {
	ticketEntity,
	toggleTicketAssignments = () => null,
} ) => {
	const {
		eventDates: dateEntities,
		eventDatesLoaded,
	} = useTicketEventDates( ticketEntity );
	return (
		<IconMenuItem
			index={ 3 }
			tooltip={
				eventDatesLoaded && ! dateEntities.length ?
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
			onClick={ toggleTicketAssignments }
			itemCount={ eventDatesLoaded ? dateEntities.length : null }
		/>
	);
};

export default ifValidTicketEntity( AssignDatesMenuItem );

/*
( ( { ticketEntity } ) => (
		{
			title: sprintf(
				_x(
					'Date Assignments for Ticket:  %1$s',
					'Date Assignments for Ticket:  Ticket name',
					'event_espresso'
				),
				ticketEntity.name
			),
			closeButtonLabel: null,
		}
	) )
*/
