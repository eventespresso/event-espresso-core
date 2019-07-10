/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { EspressoIcon, IconMenuItem } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

const AssignDatesMenuItem = ( {
	ticketEntity,
	toggleTicketAssignments,
	dateEntities = [],
} ) => {
	return (
		<IconMenuItem
			index={ 3 }
			tooltip={
				isEmpty( dateEntities ) ?
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
			itemCount={ dateEntities.length }
		/>
	);
};

export default ifValidTicketEntity( AssignDatesMenuItem );
