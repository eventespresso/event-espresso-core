/**
 * External imports
 */
import { DropDownMenu } from '@eventespresso/components';
import { ifValidTicketEntity, useOpenEditor } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import useTicketEditorId from '../../edit-form/use-ticket-editor-id';
import useCopyTicket from '../../../../hooks/use-copy-ticket';
import useTicketEventDates from '../../../../hooks/use-ticket-event-dates';
import useTrashTicket from '../../../../hooks/use-trash-ticket';

const TicketEntityMainMenuItem = ( { ticketEntity } ) => {
	const { eventDates } = useTicketEventDates( ticketEntity );
	return (
		<DropDownMenu
			tooltip={ __( 'ticket main menu', 'event_espresso' ) }
			tooltipPosition="top right"
			htmlClass={ `ee-editor-ticket-${ ticketEntity.id }` }
			menuItems={ [
				{
					title: __( 'edit ticket', 'event_espresso' ),
					icon: 'edit',
					onClick: useOpenEditor( useTicketEditorId( ticketEntity ) ),
					ticketEntity,
				},
				{
					title: __( 'copy ticket', 'event_espresso' ),
					icon: 'admin-page',
					onClick: useCopyTicket( ticketEntity, eventDates ),
				},
				{
					title: __( 'trash ticket', 'event_espresso' ),
					icon: 'trash',
					onClick: useTrashTicket( ticketEntity ),
				},
			] }
		/>
	);
};

export default ifValidTicketEntity( TicketEntityMainMenuItem );
