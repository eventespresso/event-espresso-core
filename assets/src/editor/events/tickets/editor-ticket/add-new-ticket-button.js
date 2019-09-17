/**
 * External imports
 */
import { useState } from '@wordpress/element';
import { EspressoButton } from '@eventespresso/components';
import { useOpenEditor } from '@eventespresso/editor-hocs';
import {
	useBasePriceType,
	useCreateTicketEntity,
} from '@eventespresso/hooks';
import { cancelClickEvent } from '@eventespresso/utils';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import EditTicketFormModal from './edit-form/edit-ticket-form-modal';
import useTicketEditorId from './edit-form/use-ticket-editor-id';

const AddNewTicketButton = () => {
	const [ newTicket, cacheNewTicket ] = useState( null );
	const basePriceType = useBasePriceType();
	const createTicketEntity = useCreateTicketEntity(
		cacheNewTicket,
		basePriceType
	);
	const editorId = useTicketEditorId( newTicket );
	const openEditor = useOpenEditor( editorId );
	if ( newTicket !== null ) {
		openEditor();
	}
	return (
		<>
			<EspressoButton
				icon="tickets-alt"
				buttonText={ __( 'Add New Ticket', 'event_espresso' ) }
				onClick={ ( click ) => {
					cancelClickEvent( click, 'AddNewTicketButton' );
					createTicketEntity();
				} }
				disabled={ ! basePriceType }
			/>
			<EditTicketFormModal ticketEntity={ newTicket } />
		</>
	);
};

export default AddNewTicketButton;
