/**
 * External imports
 */
import { DropDownMenu } from '@eventespresso/components';
import { ifValidTicketEntity, useOpenEditor } from '@eventespresso/editor-hocs';
import {
	useCopyTicket,
	useTicketEventDates,
	useTrashTicket,
} from '@eventespresso/hooks';

import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import useTicketEditorId from '../../edit-form/use-ticket-editor-id';

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

TicketEntityMainMenuItem.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
};

export default ifValidTicketEntity( TicketEntityMainMenuItem );
