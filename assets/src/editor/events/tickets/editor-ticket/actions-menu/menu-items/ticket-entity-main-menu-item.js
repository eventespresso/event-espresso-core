/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';
import { DropDownMenu } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import {
	withCopyTicketEntity,
	withTrashTicketEntity,
} from '../../action-handlers';

const TicketEntityMainMenuItem = ( {
	ticketEntity,
	toggleTicketEditor,
	copyTicketEntity,
	trashTicketEntity,
	dateEntities = [],
} ) => {
	const copyTicket = useCallback(
		() => copyTicketEntity( ticketEntity, dateEntities ),
		[ copyTicketEntity, ticketEntity, dateEntities ]
	);
	const trashTicket = useCallback(
		() => trashTicketEntity( ticketEntity ),
		[ trashTicketEntity, ticketEntity ]
	);
	return (
		<DropDownMenu
			tooltip={ __( 'ticket main menu', 'event_espresso' ) }
			tooltipPosition="top right"
			htmlClass={ `ee-editor-ticket-${ ticketEntity.id }` }
			menuItems={ [
				{
					title: __( 'edit ticket', 'event_espresso' ),
					icon: 'edit',
					onClick: toggleTicketEditor,
					ticketEntity,
				},
				{
					title: __( 'copy ticket', 'event_espresso' ),
					icon: 'admin-page',
					onClick: copyTicket,
				},
				{
					title: __( 'trash ticket', 'event_espresso' ),
					icon: 'trash',
					onClick: trashTicket,
				},
			] }
		/>
	);
};

export default compose( [
	withCopyTicketEntity,
	withTrashTicketEntity,
	ifValidTicketEntity,
] )( TicketEntityMainMenuItem );
