/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { EntityDetailsPanel } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import EventDateRegistrationsLink from '../event-date-registrations-link';

const EventDateDetailsPanel = ( { dateEntity } ) => useMemo(
	() => {
		const details = [
			{
				id: 'ee-event-date-sold',
				label: __( 'sold', 'event_espresso' ),
				value: dateEntity.sold || 0,
			},
			{
				id: 'ee-event-date-reserved',
				label: __( 'reserved', 'event_espresso' ),
				value: dateEntity.reserved || 0,
			},
			{
				id: 'ee-event-date-capacity',
				label: __( 'capacity', 'event_espresso' ),
				value: dateEntity.regLimit || Infinity,
				editable: {
					type: 'text',
					valueType: 'number',
					onChange: ( capacity ) => {
						dateEntity.regLimit = parseInt( capacity || 0, 10 );
					},
				},
			},
			{
				id: 'ee-event-date-registrants',
				htmlClass: 'ee-has-tooltip',
				label: __( 'registrants', 'event_espresso' ),
				value: (
					<EventDateRegistrationsLink dateEntity={ dateEntity } />
				),
			},
		];
		return <EntityDetailsPanel
			details={ details }
			htmlClass="ee-editor-date-details-sold-rsrvd-cap-div"
		/>;
	},
	[
		dateEntity.evtId,
		dateEntity.id,
		dateEntity.sold,
		dateEntity.reserved,
		dateEntity.regLimit,
	]
);

export default EventDateDetailsPanel;
