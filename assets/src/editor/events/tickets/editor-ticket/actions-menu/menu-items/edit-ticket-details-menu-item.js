/**
 * External dependencies
 */
import { IconMenuItem } from '@eventespresso/components';
import { ifValidTicketEntity, useOpenEditor } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import useTicketEditorId from '../../edit-form/use-ticket-editor-id';

const EditTicketDetailsMenuItem = ( { ticketEntity } ) => {
	return (
		<IconMenuItem
			index={ 1 }
			tooltip={ __( 'edit ticket details', 'event_espresso' ) }
			id={ `edit-ticket-${ ticketEntity.id }` }
			htmlClass="edit-ticket"
			dashicon="edit"
			tooltipPosition="top right"
			onClick={ useOpenEditor( useTicketEditorId( ticketEntity ) ) }
		/>
	);
};

EditTicketDetailsMenuItem.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
};

export default ifValidTicketEntity( EditTicketDetailsMenuItem );
