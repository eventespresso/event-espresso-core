/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { compose } from '@wordpress/compose';
import { IconMenuItem } from '@eventespresso/components';
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

const AssignTicketsMenuItem = ( {
	dateEntity,
	toggleTicketAssignments,
	ticketEntities = [],
} ) => {
	const tooltip = isEmpty( ticketEntities ) ?
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
			itemCount={ ticketEntities.length }
		/>
	);
};

export default compose( [
	ifValidDateEntity,
] )( AssignTicketsMenuItem );
