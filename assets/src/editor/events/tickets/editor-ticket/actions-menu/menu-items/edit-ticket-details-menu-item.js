/**
 * External imports
 */
import { IconMenuItem } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';

const EditTicketDetailsMenuItem = ( {
	ticketEntity,
	toggleTicketEditor,
} ) => {
	return (
		<IconMenuItem
			index={ 1 }
			tooltip={ __( 'edit ticket details', 'event_espresso' ) }
			id={ `edit-ticket-${ ticketEntity.id }` }
			htmlClass="edit-ticket"
			dashicon="edit"
			tooltipPosition="top right"
			onClick={ toggleTicketEditor }
		/>
	);
};

export default ifValidTicketEntity( EditTicketDetailsMenuItem );
