/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { EntityDetailsPanel } from '@eventespresso/components';
import { parseInfinity } from '@eventespresso/utils';
import { __ } from '@eventespresso/i18n';
import { InfinitySymbol } from '@eventespresso/value-objects';
import PropTypes from 'prop-types';
import { useEventDateUpdateRelatedTickets } from '@eventespresso/hooks';

/**
 * Internal dependencies
 */
import EventDateRegistrationsLink from '../event-date-registrations-link';
import { updateTicketQtyAfterCapacityChange } from '../../../mutations/ticket-mutations';

const EventDateDetailsPanel = ( { eventDate } ) => {
	const updateRelatedTickets = useEventDateUpdateRelatedTickets( eventDate );
	return useMemo(
		() => {
			const details = [
				{
					id: 'ee-event-date-sold',
					label: __( 'sold', 'event_espresso' ),
					value: eventDate.sold || 0,
				},
				{
					id: 'ee-event-date-reserved',
					label: __( 'reserved', 'event_espresso' ),
					value: eventDate.reserved || 0,
				},
				{
					id: 'ee-event-date-capacity',
					label: __( 'capacity', 'event_espresso' ),
					value: <InfinitySymbol value={ eventDate.regLimit } asInt />,
					editable: {
						type: 'text',
						valueType: 'infinite',
						onChange: ( cap ) => {
							const capacity = parseInfinity( cap, true, true );
							eventDate.regLimit = capacity;
							const updateTicketQty = updateTicketQtyAfterCapacityChange( capacity );
							updateRelatedTickets( [ updateTicketQty ] );
							return <InfinitySymbol value={ capacity } asInt />;
						},
					},
				},
				{
					id: 'ee-event-date-registrants',
					htmlClass: 'ee-has-tooltip',
					label: __( 'registrants', 'event_espresso' ),
					value: (
						<EventDateRegistrationsLink dateEntity={ eventDate } />
					),
				},
			];
			return <EntityDetailsPanel
				details={ details }
				htmlClass="ee-editor-date-details-sold-rsrvd-cap-div"
			/>;
		},
		[
			eventDate.evtId,
			eventDate.id,
			eventDate.sold,
			eventDate.reserved,
			eventDate.regLimit,
		]
	);
};

EventDateDetailsPanel.propTypes = {
	eventDate: PropTypes.object.isRequired,
};

export default EventDateDetailsPanel;
